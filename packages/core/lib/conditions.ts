import {
  type ActionResult,
  type FieldState,
  type FormData,
  RuleEngine,
} from './engine/rule-engine';
import type { FormField } from './types/form-field.type';
import type { FormSchema } from './types/form-schema.type';
import type { JsonValue } from './types/root-rule.type';
import { isFieldHidden, isFieldRequired } from './utils/field-utils';

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
   * Create default field states based on field properties
   */
  createDefaultFieldStates(): FieldState {
    const fieldStates: FieldState = {};

    // Recursively process all fields including nested children
    const processField = (field: FormField) => {
      // Process the current field if it's a form field with an ID
      if (field.id) {
        fieldStates[field.id] = {
          touched: false,
          dirty: false,
          valid: true,
          visible: !isFieldHidden(field), // Set based on HIDDEN property
          enabled: true,
          required: isFieldRequired(field), // Set based on REQUIRED property
        };
      }

      // Recursively process children if they exist
      if ('children' in field && field.children && Array.isArray(field.children)) {
        for (const child of field.children) {
          processField(child);
        }
      }
    };

    // Process all top-level fields
    for (const field of this.props.schema.form.fields) {
      processField(field);
    }

    return fieldStates;
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
