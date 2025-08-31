import { Operator } from '../constants/operator.constant';
import { RuleAction } from '../constants/rule-action.constant';
import type { FormSchema } from '../types/form-schema.type';
import type {
  Action,
  ConditionNode,
  ConditionTree,
  JsonValue,
  Operand,
  Rule,
} from '../types/root-rule.type';

// Field state tracking for rules
export interface FieldState {
  value: JsonValue;
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  visible: boolean;
  enabled: boolean;
  required: boolean;
}

// Environment variables for rule evaluation
export interface RuleEvaluationContext {
  fields: Record<string, FieldState>;
  env: Record<string, JsonValue>;
  now: Date;
  today: Date;
}

// Rule evaluation result
export interface RuleEvaluationResult {
  triggered: boolean;
  actions: Action[];
}

// Field updates resulting from rule evaluation
export interface FieldUpdate {
  fieldId: string;
  required?: boolean;
  visible?: boolean;
}

// Complete rule engine result
export interface RuleEngineResult {
  fieldUpdates: FieldUpdate[];
  customActions: Array<{ actionId: string; name: string; input?: JsonValue }>;
}

/**
 * Efficient rule engine for evaluating form rules and updating field states.
 * Uses memoization and dependency tracking for performance optimization.
 */
export class RuleEngine {
  private schema: FormSchema | null = null;
  private fieldDependencies: Map<string, Set<string>> = new Map(); // fieldId -> dependent rules
  private ruleCache: Map<string, RuleEvaluationResult> = new Map(); // ruleId -> result
  private contextHash: string = '';

  /**
   * Updates the schema and rebuilds dependency graph
   */
  updateSchema(schema: FormSchema): void {
    this.schema = schema;
    this.buildDependencyGraph();
    this.clearCache();
  }

  /**
   * Evaluates all rules and returns field updates
   */
  evaluateRules(context: RuleEvaluationContext): RuleEngineResult {
    if (!this.schema?.form.rules) {
      return { fieldUpdates: [], customActions: [] };
    }

    const newContextHash = this.hashContext(context);
    const changedFields = this.getChangedFields(context);

    // Only re-evaluate rules that depend on changed fields or if context changed significantly
    const rulesToEvaluate = new Set<string>();
    if (newContextHash !== this.contextHash) {
      // Context changed significantly, evaluate all rules
      for (const rule of this.schema.form.rules) {
        rulesToEvaluate.add(rule.id);
      }
      this.contextHash = newContextHash;
    } else if (changedFields.size > 0) {
      // Only specific fields changed, evaluate dependent rules
      for (const fieldId of changedFields) {
        const dependentRules = this.fieldDependencies.get(fieldId);
        if (dependentRules) {
          dependentRules.forEach((ruleId) => {
            rulesToEvaluate.add(ruleId);
          });
        }
      }
    }

    // If no rules to evaluate and we have cached results, return them
    if (rulesToEvaluate.size === 0 && this.ruleCache.size > 0) {
      return this.buildResultFromCache();
    }

    const fieldUpdates: FieldUpdate[] = [];
    const customActions: Array<{ actionId: string; name: string; input?: JsonValue }> = [];

    // Evaluate rules in order (precedence matters)
    for (const rule of this.schema.form.rules) {
      if (!rule.enabled) continue;

      let result: RuleEvaluationResult;

      if (rulesToEvaluate.has(rule.id)) {
        // Re-evaluate this rule
        result = this.evaluateRule(rule, context);
        this.ruleCache.set(rule.id, result);
      } else {
        // Use cached result
        result = this.ruleCache.get(rule.id) || { triggered: false, actions: [] };
      }

      if (result.triggered) {
        // Process actions
        for (const action of result.actions) {
          switch (action.type) {
            case RuleAction.SHOW_FIELDS:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, visible: true });
              }
              break;
            case RuleAction.HIDE_FIELDS:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, visible: false });
              }
              break;
            case RuleAction.SET_REQUIRED:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, required: action.value });
              }
              break;
            case RuleAction.SET_OPTIONAL:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, required: !action.value });
              }
              break;
            case 'custom':
              customActions.push({
                actionId: action.id,
                name: action.name,
                input: action.input,
              });
              break;
          }
        }
      }
    }

    return { fieldUpdates, customActions };
  }

  /**
   * Clears the evaluation cache (call when field values change significantly)
   */
  clearCache(): void {
    this.ruleCache.clear();
    this.contextHash = '';
  }

  private buildDependencyGraph(): void {
    this.fieldDependencies.clear();

    if (!this.schema?.form.rules) return;

    for (const rule of this.schema.form.rules) {
      const referencedFields = this.extractReferencedFields(rule.when);

      for (const fieldId of referencedFields) {
        if (!this.fieldDependencies.has(fieldId)) {
          this.fieldDependencies.set(fieldId, new Set());
        }
        const dependentRules = this.fieldDependencies.get(fieldId);
        if (dependentRules) {
          dependentRules.add(rule.id);
        }
      }
    }
  }

  private extractReferencedFields(tree: ConditionTree): Set<string> {
    const fields = new Set<string>();

    const traverse = (node: ConditionTree | ConditionNode): void => {
      if ('children' in node) {
        // ConditionTree
        for (const child of node.children) {
          traverse(child);
        }
      } else {
        // ConditionNode
        if (node.left) {
          this.extractFieldsFromOperand(node.left, fields);
        }
        if (node.right) {
          if (Array.isArray(node.right)) {
            for (const operand of node.right) {
              this.extractFieldsFromOperand(operand, fields);
            }
          } else {
            this.extractFieldsFromOperand(node.right, fields);
          }
        }
      }
    };

    traverse(tree);
    return fields;
  }

  private extractFieldsFromOperand(operand: Operand, fields: Set<string>): void {
    switch (operand.kind) {
      case 'fieldValue':
      case 'fieldState':
      case 'fieldLength':
        fields.add(operand.field);
        break;
    }
  }

  private evaluateRule(rule: Rule, context: RuleEvaluationContext): RuleEvaluationResult {
    const triggered = this.evaluateConditionTree(rule.when, context);
    return {
      triggered,
      actions: triggered ? rule.actions : [],
    };
  }

  private evaluateConditionTree(tree: ConditionTree, context: RuleEvaluationContext): boolean {
    if (tree.children.length === 0) return true;

    const results = tree.children.map((child) => {
      if ('children' in child) {
        return this.evaluateConditionTree(child, context);
      } else {
        return this.evaluateConditionNode(child, context);
      }
    });

    return tree.logic === 'all' ? results.every(Boolean) : results.some(Boolean);
  }

  private evaluateConditionNode(node: ConditionNode, context: RuleEvaluationContext): boolean {
    if (!node.left || !node.operator) return true;

    const leftValue = this.evaluateOperand(node.left, context);

    // Handle operators that don't need right operand
    switch (node.operator) {
      case Operator.IS_FILLED:
        return this.isFilledValue(leftValue);
      case Operator.IS_EMPTY:
        return !this.isFilledValue(leftValue);
      case Operator.IS_VALID:
        return node.left.kind === 'fieldState' && node.left.state === 'valid'
          ? Boolean(leftValue)
          : true;
      case Operator.IS_INVALID:
        return node.left.kind === 'fieldState' && node.left.state === 'valid' ? !leftValue : false;
      case Operator.IS_TRUE:
        return Boolean(leftValue);
      case Operator.IS_FALSE:
        return !leftValue;
    }

    if (!node.right) return false;

    const rightValues = Array.isArray(node.right)
      ? node.right.map((r) => this.evaluateOperand(r, context))
      : [this.evaluateOperand(node.right, context)];

    return this.evaluateOperation(leftValue, node.operator, rightValues, node.options);
  }

  private evaluateOperand(operand: Operand, context: RuleEvaluationContext): JsonValue {
    switch (operand.kind) {
      case 'fieldValue':
        return context.fields[operand.field]?.value ?? null;
      case 'fieldState': {
        const fieldState = context.fields[operand.field];
        if (!fieldState) return false;
        return fieldState[operand.state];
      }
      case 'fieldLength': {
        const value = context.fields[operand.field]?.value;
        if (typeof value === 'string') return value.length;
        if (Array.isArray(value)) return value.length;
        return 0;
      }
      case 'constant':
        return operand.value;
      case 'now':
        return context.now.toISOString();
      case 'today':
        return context.today.toISOString().split('T')[0];
      case 'env':
        return context.env[operand.name] ?? null;
      default:
        return null;
    }
  }

  private evaluateOperation(
    left: JsonValue,
    operator: string,
    rights: JsonValue[],
    options?: {
      inclusive?: boolean;
      caseSensitive?: boolean;
      locale?: string;
      timeZone?: string;
      flags?: string;
    },
  ): boolean {
    const right = rights[0];

    switch (operator) {
      case Operator.EQUAL:
        return left === right;
      case Operator.NOT_EQUAL:
        return left !== right;
      case Operator.CONTAINS:
        return typeof left === 'string' && typeof right === 'string' ? left.includes(right) : false;
      case Operator.NOT_CONTAINS:
        return typeof left === 'string' && typeof right === 'string' ? !left.includes(right) : true;
      case Operator.STARTS_WITH:
        return typeof left === 'string' && typeof right === 'string'
          ? left.startsWith(right)
          : false;
      case Operator.NOT_STARTS_WITH:
        return typeof left === 'string' && typeof right === 'string'
          ? !left.startsWith(right)
          : true;
      case Operator.ENDS_WITH:
        return typeof left === 'string' && typeof right === 'string' ? left.endsWith(right) : false;
      case Operator.NOT_ENDS_WITH:
        return typeof left === 'string' && typeof right === 'string' ? !left.endsWith(right) : true;
      case Operator.GREATER_THAN:
        return typeof left === 'number' && typeof right === 'number' ? left > right : false;
      case Operator.LESS_THAN:
        return typeof left === 'number' && typeof right === 'number' ? left < right : false;
      case Operator.GREATER_THAN_OR_EQUAL:
        return typeof left === 'number' && typeof right === 'number' ? left >= right : false;
      case Operator.LESS_THAN_OR_EQUAL:
        return typeof left === 'number' && typeof right === 'number' ? left <= right : false;
      case Operator.IN:
        return rights.includes(left);
      case Operator.NOT_IN:
        return !rights.includes(left);
      case Operator.BEFORE:
        return this.compareDates(left, right) < 0;
      case Operator.AFTER:
        return this.compareDates(left, right) > 0;
      case Operator.ON_OR_BEFORE:
        return this.compareDates(left, right) <= 0;
      case Operator.ON_OR_AFTER:
        return this.compareDates(left, right) >= 0;
      case Operator.BETWEEN:
        if (rights.length < 2) return false;
        {
          const [min, max] = rights;
          if (typeof left === 'number' && typeof min === 'number' && typeof max === 'number') {
            return options?.inclusive ? left >= min && left <= max : left > min && left < max;
          }
          // Date comparison
          const leftDate = this.parseDate(left);
          const minDate = this.parseDate(min);
          const maxDate = this.parseDate(max);
          if (leftDate && minDate && maxDate) {
            return options?.inclusive
              ? leftDate >= minDate && leftDate <= maxDate
              : leftDate > minDate && leftDate < maxDate;
          }
          return false;
        }
      default:
        return false;
    }
  }

  private isFilledValue(value: JsonValue): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  }

  private compareDates(left: JsonValue, right: JsonValue): number {
    const leftDate = this.parseDate(left);
    const rightDate = this.parseDate(right);

    if (!leftDate || !rightDate) return 0;

    return leftDate.getTime() - rightDate.getTime();
  }

  private parseDate(value: JsonValue): Date | null {
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    }
    return null;
  }

  private hashContext(context: RuleEvaluationContext): string {
    return JSON.stringify({
      fields: Object.fromEntries(
        Object.entries(context.fields).map(([id, state]) => [
          id,
          {
            value: state.value,
            valid: state.valid,
            visible: state.visible,
            touched: state.touched,
          },
        ]),
      ),
      env: context.env,
      now: context.now.toISOString(),
      today: context.today.toISOString(),
    });
  }

  private getChangedFields(context: RuleEvaluationContext): Set<string> {
    // This would need to track previous context state
    // For now, return all fields as a simple implementation
    return new Set(Object.keys(context.fields));
  }

  private buildResultFromCache(): RuleEngineResult {
    const fieldUpdates: FieldUpdate[] = [];
    const customActions: Array<{ actionId: string; name: string; input?: JsonValue }> = [];

    for (const result of this.ruleCache.values()) {
      if (result.triggered) {
        for (const action of result.actions) {
          switch (action.type) {
            case RuleAction.SHOW_FIELDS:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, visible: true });
              }
              break;
            case RuleAction.HIDE_FIELDS:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, visible: false });
              }
              break;
            case RuleAction.SET_REQUIRED:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, required: action.value });
              }
              break;
            case RuleAction.SET_OPTIONAL:
              for (const fieldId of action.fields) {
                fieldUpdates.push({ fieldId, required: !action.value });
              }
              break;
            case 'custom':
              customActions.push({
                actionId: action.id,
                name: action.name,
                input: action.input,
              });
              break;
          }
        }
      }
    }

    return { fieldUpdates, customActions };
  }
}
