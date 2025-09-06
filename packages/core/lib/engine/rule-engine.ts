import type { Operator } from '../constants/operator.constant';
import { RuleAction } from '../constants/rule-action.constant';
import type { FormField } from '../types/form-field.type';
import type { FormSchema } from '../types/form-schema.type';
import type {
  Action,
  ConditionNode,
  ConditionTree,
  CustomAction,
  CustomActionDefinition,
  HideFieldsAction,
  JsonValue,
  Operand,
  Rule,
  SetOptionalAction,
  SetRequiredAction,
  ShowFieldsAction,
} from '../types/root-rule.type';

export interface FormData {
  [fieldId: string]: JsonValue;
}

export interface FieldState {
  [fieldId: string]: {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    visible: boolean;
    enabled: boolean;
    required: boolean;
  };
}

export interface RuleEvaluationContext {
  formData: FormData;
  fieldStates: FieldState;
  fields: Map<string, FormField>;
  changedField?: string;
  env?: Record<string, JsonValue>;
}

export interface ActionResult {
  hidden: string[];
  visible: string[];
  required: string[];
  optional: string[];
  custom: CustomAction[];
}

/**
 * Core rule engine that evaluates conditions and executes actions
 * Framework-agnostic implementation that can be used by React, Vue, etc.
 */
export class RuleEngine {
  private schema: FormSchema;
  private rules: Rule[];
  private fieldsMap: Map<string, FormField>;
  private customActionDefinitions: Map<string, CustomActionDefinition>;

  constructor(schema: FormSchema) {
    this.schema = schema;
    this.rules = schema.form.rules || [];
    this.fieldsMap = new Map();
    this.customActionDefinitions = new Map();

    // Cache field references for performance
    this.cacheFields();
    this.cacheCustomActions();
  }

  /**
   * Update the schema and refresh internal caches
   */
  updateSchema(schema: FormSchema): void {
    this.schema = schema;
    this.rules = schema.form.rules || [];
    this.cacheFields();
    this.cacheCustomActions();
  }

  /**
   * Evaluate all rules and return actions to execute
   */
  onChange(fieldId: string, value: JsonValue, context: RuleEvaluationContext): ActionResult {
    const result: ActionResult = {
      hidden: [],
      visible: [],
      required: [],
      optional: [],
      custom: [],
    };

    // Update context with the changed field
    const updatedContext: RuleEvaluationContext = {
      ...context,
      changedField: fieldId,
      formData: {
        ...context.formData,
        [fieldId]: value,
      },
      fields: this.fieldsMap,
    };

    // Evaluate all enabled rules
    for (const rule of this.rules) {
      if (rule.enabled === false) continue;

      // Check if rule should be triggered by this change
      if (!this.shouldTriggerRule(rule, fieldId)) continue;

      // Evaluate the rule condition
      if (this.evaluateCondition(rule.when, updatedContext)) {
        // Rule condition is true, execute actions
        for (const action of rule.actions) {
          this.mergeAction(result, action);
        }
      }
    }

    return result;
  }

  /**
   * Evaluate all rules without a specific field change (e.g., on form init)
   */
  evaluateAll(context: RuleEvaluationContext): ActionResult {
    const result: ActionResult = {
      hidden: [],
      visible: [],
      required: [],
      optional: [],
      custom: [],
    };

    const updatedContext: RuleEvaluationContext = {
      ...context,
      fields: this.fieldsMap,
    };

    for (const rule of this.rules) {
      if (rule.enabled === false) continue;

      if (this.evaluateCondition(rule.when, updatedContext)) {
        for (const action of rule.actions) {
          this.mergeAction(result, action);
        }
      }
    }

    return result;
  }

  private cacheFields(): void {
    this.fieldsMap.clear();
    for (const field of this.schema.form.fields) {
      this.fieldsMap.set(field.id, field);
    }
  }

  private cacheCustomActions(): void {
    this.customActionDefinitions.clear();
    if (this.schema.form.actionDefinitions) {
      for (const actionDef of this.schema.form.actionDefinitions) {
        this.customActionDefinitions.set(actionDef.name, actionDef);
      }
    }
  }

  private shouldTriggerRule(rule: Rule, changedFieldId: string): boolean {
    // If no triggers specified, assume onChange (default behavior)
    const triggers = rule.triggers || ['onChange'];

    // For now, we only handle onChange triggers
    // TODO: Implement onPageEnter and onSubmit triggers
    if (!triggers.includes('onChange')) {
      return false;
    }

    // Check if the changed field affects this rule
    return this.ruleReferencesField(rule.when, changedFieldId);
  }

  private ruleReferencesField(condition: ConditionTree | ConditionNode, fieldId: string): boolean {
    if ('logic' in condition) {
      // ConditionTree
      return condition.children.some((child) => this.ruleReferencesField(child, fieldId));
    } else {
      // ConditionNode
      return (
        this.operandReferencesField(condition.left, fieldId) ||
        this.operandReferencesField(condition.right, fieldId)
      );
    }
  }

  private operandReferencesField(
    operand: Operand | Operand[] | undefined,
    fieldId: string,
  ): boolean {
    if (!operand) return false;

    if (Array.isArray(operand)) {
      return operand.some((op) => this.operandReferencesField(op, fieldId));
    }

    return (
      (operand.kind === 'fieldValue' ||
        operand.kind === 'fieldState' ||
        operand.kind === 'fieldLength') &&
      operand.field === fieldId
    );
  }

  private evaluateCondition(
    condition: ConditionTree | ConditionNode,
    context: RuleEvaluationContext,
  ): boolean {
    if ('logic' in condition) {
      return this.evaluateConditionTree(condition, context);
    } else {
      return this.evaluateConditionNode(condition, context);
    }
  }

  private evaluateConditionTree(tree: ConditionTree, context: RuleEvaluationContext): boolean {
    if (tree.children.length === 0) return true;

    const results = tree.children.map((child) => this.evaluateCondition(child, context));

    return tree.logic === 'all' ? results.every(Boolean) : results.some(Boolean);
  }

  private evaluateConditionNode(node: ConditionNode, context: RuleEvaluationContext): boolean {
    if (!node.left || !node.operator) return false;

    const leftValue = this.evaluateOperand(node.left, context);
    const rightValue = node.right ? this.evaluateOperand(node.right, context) : undefined;
    const operator = node.operator;
    const options = node.options || {};

    return this.applyOperator(leftValue, operator, rightValue ?? null, options);
  }

  private evaluateOperand(operand: Operand | Operand[], context: RuleEvaluationContext): JsonValue {
    if (Array.isArray(operand)) {
      return operand.map((op) => this.evaluateOperand(op, context));
    }

    switch (operand.kind) {
      case 'fieldValue':
        return context.formData[operand.field] ?? null;

      case 'fieldState': {
        const fieldState = context.fieldStates[operand.field];
        if (!fieldState) return false;
        return fieldState[operand.state];
      }

      case 'fieldLength': {
        const fieldValue = context.formData[operand.field];
        if (typeof fieldValue === 'string') return fieldValue.length;
        if (Array.isArray(fieldValue)) return fieldValue.length;
        return 0;
      }

      case 'constant':
        return operand.value;

      case 'now':
        return new Date().toISOString();

      case 'today': {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString();
      }

      case 'env':
        return context.env?.[operand.name] ?? null;

      default:
        return null;
    }
  }

  private applyOperator(
    left: JsonValue,
    operator: Operator,
    right: JsonValue,
    options: { inclusive?: boolean; caseSensitive?: boolean },
  ): boolean {
    switch (operator) {
      // Shared operators
      case 'is_filled':
        return left !== null && left !== undefined && left !== '';

      case 'is_empty':
        return left === null || left === undefined || left === '';

      case 'is_valid':
        // This would need integration with validation system
        return true; // Placeholder

      case 'is_invalid':
        // This would need integration with validation system
        return false; // Placeholder

      // String operators
      case 'equal':
        if (
          options.caseSensitive === false &&
          typeof left === 'string' &&
          typeof right === 'string'
        ) {
          return left.toLowerCase() === right.toLowerCase();
        }
        return left === right;

      case 'not_equal':
        if (
          options.caseSensitive === false &&
          typeof left === 'string' &&
          typeof right === 'string'
        ) {
          return left.toLowerCase() !== right.toLowerCase();
        }
        return left !== right;

      case 'contains':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return leftStr.includes(rightStr);
        }
        return false;

      case 'not_contains':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return !leftStr.includes(rightStr);
        }
        return true;

      case 'starts_with':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return leftStr.startsWith(rightStr);
        }
        return false;

      case 'not_starts_with':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return !leftStr.startsWith(rightStr);
        }
        return true;

      case 'ends_with':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return leftStr.endsWith(rightStr);
        }
        return false;

      case 'not_ends_with':
        if (typeof left === 'string' && typeof right === 'string') {
          const leftStr = options.caseSensitive === false ? left.toLowerCase() : left;
          const rightStr = options.caseSensitive === false ? right.toLowerCase() : right;
          return !leftStr.endsWith(rightStr);
        }
        return true;

      // Number operators
      case 'greater_than':
        return typeof left === 'number' && typeof right === 'number' && left > right;

      case 'greater_than_or_equal':
        return typeof left === 'number' && typeof right === 'number' && left >= right;

      case 'less_than':
        return typeof left === 'number' && typeof right === 'number' && left < right;

      case 'less_than_or_equal':
        return typeof left === 'number' && typeof right === 'number' && left <= right;

      case 'between':
        if (typeof left === 'number' && Array.isArray(right) && right.length === 2) {
          const [min, max] = right as [number, number];
          return options.inclusive ? left >= min && left <= max : left > min && left < max;
        }
        return false;

      // Date operators (simplified - would need proper date parsing)
      case 'before':
        return new Date(left as string) < new Date(right as string);

      case 'after':
        return new Date(left as string) > new Date(right as string);

      case 'on_or_before':
        return new Date(left as string) <= new Date(right as string);

      case 'on_or_after':
        return new Date(left as string) >= new Date(right as string);

      // Boolean operators
      case 'is_true':
        return left === true;

      case 'is_false':
        return left === false;

      // Array/Options operators
      case 'in':
        return Array.isArray(right) && right.includes(left);

      case 'not_in':
        return !Array.isArray(right) || !right.includes(left);

      default:
        console.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }

  private mergeAction(result: ActionResult, action: Action): void {
    switch (action.type) {
      case RuleAction.SHOW_FIELDS: {
        const showAction = action as ShowFieldsAction;
        result.visible.push(...showAction.fields);
        // Remove from hidden if it was there
        result.hidden = result.hidden.filter((id) => !showAction.fields.includes(id));
        break;
      }

      case RuleAction.HIDE_FIELDS: {
        const hideAction = action as HideFieldsAction;
        result.hidden.push(...hideAction.fields);
        // Remove from visible if it was there
        result.visible = result.visible.filter((id) => !hideAction.fields.includes(id));
        break;
      }

      case RuleAction.SET_REQUIRED: {
        const requiredAction = action as SetRequiredAction;
        if (requiredAction.value) {
          result.required.push(...requiredAction.fields);
          // Remove from optional if it was there
          result.optional = result.optional.filter((id) => !requiredAction.fields.includes(id));
        } else {
          result.optional.push(...requiredAction.fields);
          // Remove from required if it was there
          result.required = result.required.filter((id) => !requiredAction.fields.includes(id));
        }
        break;
      }

      case RuleAction.SET_OPTIONAL: {
        const optionalAction = action as SetOptionalAction;
        if (optionalAction.value) {
          result.optional.push(...optionalAction.fields);
          // Remove from required if it was there
          result.required = result.required.filter((id) => !optionalAction.fields.includes(id));
        } else {
          result.required.push(...optionalAction.fields);
          // Remove from optional if it was there
          result.optional = result.optional.filter((id) => !optionalAction.fields.includes(id));
        }
        break;
      }

      case 'custom':
        result.custom.push(action as CustomAction);
        break;

      default:
        console.warn(`Unknown action type: ${(action as { type: string }).type}`);
    }
  }
}
