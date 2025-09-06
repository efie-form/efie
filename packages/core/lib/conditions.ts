import {
  type ActionResult,
  type FieldState,
  type FormData,
  RuleEngine,
} from './engine/rule-engine';
import type { FormSchema } from './types/form-schema.type';
import type { JsonValue } from './types/root-rule.type';

interface ConditionProps {
  schema: FormSchema;
}

export default class Condition {
  private ruleEngine: RuleEngine;

  constructor(private props: ConditionProps) {
    this.ruleEngine = new RuleEngine(this.props.schema);
  }

  /**
   * Update the schema and refresh internal caches
   */
  updateSchema(schema: FormSchema): void {
    this.props = { schema };
    this.ruleEngine.updateSchema(schema);
  }

  /**
   * Process form field changes and return actions to execute
   */
  onChange(
    fieldId: string,
    value: JsonValue,
    formData: FormData,
    fieldStates: FieldState,
    env?: Record<string, JsonValue>,
  ): ActionResult {
    return this.ruleEngine.onChange(fieldId, value, {
      formData,
      fieldStates,
      fields: new Map(), // Will be set by the engine
      changedField: fieldId,
      env,
    });
  }

  /**
   * Evaluate all rules without a specific field change (e.g., on form init)
   */
  evaluateAll(
    formData: FormData,
    fieldStates: FieldState,
    env?: Record<string, JsonValue>,
  ): ActionResult {
    return this.ruleEngine.evaluateAll({
      formData,
      fieldStates,
      fields: new Map(), // Will be set by the engine
      env,
    });
  }

  /**
   * Legacy evaluate method for backward compatibility
   * @deprecated Use onChange or evaluateAll instead
   */
  evaluate(): boolean {
    // Implement your condition evaluation logic here
    return true;
  }
}
