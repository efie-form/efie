import type { FormSchema, FormField, RootRule } from '@efie-form/core';
import { FieldType } from '@efie-form/core';

/**
 * Validates if a schema object conforms to the FormSchema interface
 * @param schema - The schema object to validate
 * @returns true if the schema is valid, false otherwise
 */
export default function checkSchema(
  schema: FormSchema | unknown,
): schema is FormSchema {
  if (!schema || typeof schema !== 'object') {
    return false;
  }

  const candidate = schema as Record<string, unknown>;

  // Check version property
  if (typeof candidate.version !== 'string' || !candidate.version) {
    return false;
  }

  // Check form property exists and is an object
  if (!candidate.form || typeof candidate.form !== 'object') {
    return false;
  }

  const form = candidate.form as Record<string, unknown>;

  // Check fields array
  if (!Array.isArray(form.fields)) {
    return false;
  }

  // Check rules array
  if (!Array.isArray(form.rules)) {
    return false;
  }

  // Validate each field
  for (const field of form.fields) {
    if (!isValidFormField(field)) {
      return false;
    }
  }

  // Validate each rule
  for (const rule of form.rules) {
    if (!isValidRootRule(rule)) {
      return false;
    }
  }

  return true;
}

/**
 * Validates if an object is a valid FormField
 */
function isValidFormField(field: unknown): field is FormField {
  if (!field || typeof field !== 'object') {
    return false;
  }

  const candidate = field as Record<string, unknown>;

  // Check required properties
  if (typeof candidate.id !== 'string' || !candidate.id) {
    return false;
  }

  if (typeof candidate.type !== 'string' || !Object.values(FieldType).includes(candidate.type as FieldType)) {
    return false;
  }

  // Check props array if it exists
  if (candidate.props !== undefined) {
    if (!Array.isArray(candidate.props)) {
      return false;
    }

    // Validate each property
    for (const prop of candidate.props) {
      if (!isValidProperty(prop)) {
        return false;
      }
    }
  }

  // Check form property for input fields
  if (candidate.form !== undefined && !isValidFormProperty(candidate.form)) {
    return false;
  }

  // Check children array for layout fields
  if (candidate.children !== undefined) {
    if (!Array.isArray(candidate.children)) {
      return false;
    }

    // Recursively validate child fields
    for (const child of candidate.children) {
      if (!isValidFormField(child)) {
        return false;
      }
    }
  }

  // Check container property if it exists
  if (candidate.container !== undefined) {
    if (!candidate.container || typeof candidate.container !== 'object') {
      return false;
    }

    const container = candidate.container as Record<string, unknown>;
    if (container.props !== undefined) {
      if (!Array.isArray(container.props)) {
        return false;
      }

      for (const prop of container.props) {
        if (!isValidProperty(prop)) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Validates if an object is a valid property definition
 */
function isValidProperty(prop: unknown): boolean {
  if (!prop || typeof prop !== 'object') {
    return false;
  }

  const candidate = prop as Record<string, unknown>;

  // Check required type property
  if (typeof candidate.type !== 'string' || !candidate.type) {
    return false;
  }

  // Value can be any type (string, number, boolean, object, etc.)
  // We don't validate the specific value structure here as it varies by property type
  // and is handled by the value-validator utilities

  return true;
}

/**
 * Validates if an object is a valid form property
 */
function isValidFormProperty(form: unknown): boolean {
  if (!form || typeof form !== 'object') {
    return false;
  }

  const candidate = form as Record<string, unknown>;

  // Check required key property
  if (typeof candidate.key !== 'string') {
    return false;
  }

  // Check optional validation array
  if (candidate.validation !== undefined) {
    if (!Array.isArray(candidate.validation)) {
      return false;
    }

    // Validate each validation schema
    for (const validation of candidate.validation) {
      if (!isValidValidationSchema(validation)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Validates if an object is a valid validation schema
 */
function isValidValidationSchema(validation: unknown): boolean {
  if (!validation || typeof validation !== 'object') {
    return false;
  }

  const candidate = validation as Record<string, unknown>;

  // Check required type property
  if (typeof candidate.type !== 'string' || !candidate.type) {
    return false;
  }

  // Basic validation based on type
  switch (candidate.type) {
    case 'standard': {
      return (
        typeof candidate.message === 'string'
        && typeof candidate.operator === 'string'
        && candidate.value !== undefined
      );
    }

    case 'group': {
      return (
        (candidate.operator === 'and' || candidate.operator === 'or')
        && Array.isArray(candidate.rules)
        && candidate.rules.every((rule: unknown) => isValidValidationSchema(rule))
      );
    }

    case 'condition': {
      return (
        typeof candidate.fieldId === 'string'
        && typeof candidate.operator === 'string'
        && candidate.value !== undefined
        && isValidValidationSchema(candidate.then)
        && (candidate.else === undefined || isValidValidationSchema(candidate.else))
      );
    }

    case 'case': {
      return (
        typeof candidate.fieldId === 'string'
        && Array.isArray(candidate.cases)
        && candidate.cases.every((caseItem: unknown) => {
          if (!caseItem || typeof caseItem !== 'object') return false;
          const caseCandidate = caseItem as Record<string, unknown>;
          return (
            caseCandidate.value !== undefined
            && isValidValidationSchema(caseCandidate.rules)
          );
        })
        && (candidate.default === undefined || isValidValidationSchema(candidate.default))
      );
    }

    default: {
      // Allow unknown validation types for extensibility
      return typeof candidate.message === 'string';
    }
  }
}

/**
 * Validates if an object is a valid root rule
 */
function isValidRootRule(rule: unknown): rule is RootRule {
  if (!rule || typeof rule !== 'object') {
    return false;
  }

  const candidate = rule as Record<string, unknown>;

  // Check required type property
  if (typeof candidate.type !== 'string' || !candidate.type) {
    return false;
  }

  // Check required conditions property
  if (!candidate.conditions || typeof candidate.conditions !== 'object') {
    return false;
  }

  // Check required action property
  if (!candidate.action || typeof candidate.action !== 'object') {
    return false;
  }

  const action = candidate.action as Record<string, unknown>;

  // Basic validation based on rule type
  switch (candidate.type) {
    case 'page': {
      return (
        typeof action.type === 'string'
        && ['show', 'hide', 'reorder', 'skip'].includes(action.type)
        && Array.isArray(action.pages)
      );
    }

    case 'validation': {
      return (
        action.type === 'crossField'
        && Array.isArray(action.fields)
        && Array.isArray(action.rules)
      );
    }

    case 'error': {
      return (
        typeof action.type === 'string'
        && ['display', 'handle', 'recover'].includes(action.type)
        && Array.isArray(action.fields)
      );
    }

    case 'group': {
      return (
        typeof action.type === 'string'
        && ['show', 'hide', 'reorder'].includes(action.type)
        && Array.isArray(action.fields)
      );
    }

    default: {
      // Allow unknown rule types for extensibility
      return true;
    }
  }
}
