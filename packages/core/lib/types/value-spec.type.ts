// Compact, JSON-only ValueSpec for custom action inputs

export type ValueSpec =
  | StringSpec
  | NumberSpec
  | BooleanSpec
  | EnumSpec
  | ArraySpec
  | ObjectSpec
  | UnionSpec;

export interface StringSpec {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: string; // regex pattern as string
  format?: 'text' | 'email' | 'uri' | 'color-hex' | 'date' | 'date-time' | (string & {}); // allow future custom formats
  enum?: string[]; // optional inline enum
}

export interface NumberSpec {
  type: 'number';
  min?: number;
  max?: number;
  integer?: boolean;
}

export interface BooleanSpec {
  type: 'boolean';
}

export interface EnumSpec {
  type: 'enum';
  values: Array<string | number>;
}

export interface ArraySpec {
  type: 'array';
  items: ValueSpec;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

export interface ObjectSpec {
  type: 'object';
  properties: Record<string, ValueSpec>;
  required?: string[];
  additionalProperties?: boolean;
}

export interface UnionSpec {
  type: 'union';
  anyOf: ValueSpec[];
}
