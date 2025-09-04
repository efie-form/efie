import type { FormField, FormSchema, JsonValue } from '@efie-form/core';
import { FieldType } from '@efie-form/core';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type { ComponentRegistry } from '../../types/field-props';
import * as FieldProviders from '../field-provider';
import { FormRuleProvider, useFieldRuleState } from '../providers/form-rule-provider';

export interface FormRendererProps {
  schema: FormSchema;
  components: ComponentRegistry;
  fieldValues: Record<string, JsonValue>;
  onFieldChange: (fieldId: string, value: JsonValue) => void;
  fieldStates?: Record<string, { touched?: boolean; dirty?: boolean; valid?: boolean }>;
  environmentVariables?: Record<string, JsonValue>;
  className?: string;
}

interface FieldRendererProps {
  field: FormField;
  components: ComponentRegistry;
  fieldValues: Record<string, JsonValue>;
  onFieldChange: (fieldId: string, value: JsonValue) => void;
}

function FieldRenderer({ field, components, fieldValues, onFieldChange }: FieldRendererProps) {
  const ruleState = useFieldRuleState(field.id);

  // Don't render hidden fields
  if (ruleState.hidden) {
    return null;
  }

  const value = fieldValues[field.id];
  const onChange = (newValue: JsonValue) => onFieldChange(field.id, newValue);

  switch (field.type) {
    case FieldType.SHORT_TEXT:
      return (
        <FieldProviders.ShortTextProvider
          field={field}
          Component={components.shortText}
          value={String(value || '')}
          onChange={(v: string) => onChange(v)}
        />
      );

    case FieldType.LONG_TEXT:
      return (
        <FieldProviders.LongTextProvider
          field={field}
          Component={components.longText}
          value={String(value || '')}
          onChange={(v: string) => onChange(v)}
        />
      );

    case FieldType.NUMBER:
      return (
        <FieldProviders.NumberProvider
          field={field}
          Component={components.number}
          value={value as number | string}
          onChange={(v: number | string) => onChange(v)}
        />
      );

    case FieldType.SINGLE_CHOICE:
      return (
        <FieldProviders.SingleChoiceProvider
          field={field}
          Component={components.singleChoice}
          value={String(value || '')}
          onChange={(v: string) => onChange(v)}
        />
      );

    case FieldType.MULTIPLE_CHOICES:
      return (
        <FieldProviders.MultipleChoicesProvider
          field={field}
          Component={components.multipleChoices}
          value={Array.isArray(value) ? value.map(String) : []}
          onChange={(v: string[]) => onChange(v)}
        />
      );

    case FieldType.DATE:
      return (
        <FieldProviders.DateProvider
          field={field}
          Component={components.date}
          value={value as Date | string}
          onChange={(v: Date | string) => onChange(v instanceof Date ? v.toISOString() : v)}
        />
      );

    case FieldType.TIME:
      return (
        <FieldProviders.TimeProvider
          field={field}
          Component={components.time}
          value={String(value || '')}
          onChange={(v: string) => onChange(v)}
        />
      );

    case FieldType.DATE_TIME:
      return (
        <FieldProviders.DateTimeProvider
          field={field}
          Component={components.dateTime}
          value={value as Date | string}
          onChange={(v: Date | string) => onChange(v instanceof Date ? v.toISOString() : v)}
        />
      );

    case FieldType.FILE:
      return (
        <FieldProviders.FileProvider
          field={field}
          Component={components.file}
          value={value as unknown as File | File[] | undefined}
          onChange={(v?: File | File[]) => {
            // File objects can't be stored as JsonValue, so we store metadata instead
            if (v instanceof File) {
              onChange({ name: v.name, size: v.size, type: v.type });
            } else if (Array.isArray(v)) {
              onChange(v.map((file) => ({ name: file.name, size: file.size, type: file.type })));
            } else {
              onChange(null);
            }
          }}
        />
      );

    case FieldType.BUTTON:
      return <FieldProviders.ButtonProvider field={field} Component={components.button} />;

    case FieldType.DIVIDER:
      return <FieldProviders.DividerProvider field={field} Component={components.divider} />;

    case FieldType.HEADING:
      return <FieldProviders.HeadingProvider field={field} Component={components.heading} />;

    case FieldType.IMAGE:
      return <FieldProviders.ImageProvider field={field} Component={components.image} />;

    case FieldType.ROW:
    case FieldType.COLUMN:
    case FieldType.BLOCK:
    case FieldType.PAGE:
      // For container fields, render children recursively
      return (
        <div key={field.id} data-field-type={field.type}>
          {field.children?.map((child) => (
            <FieldRenderer
              key={child.id}
              field={child}
              components={components}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
            />
          ))}
        </div>
      );

    default:
      console.warn(`Unknown field type: ${field.type}`);
      return null;
  }
}

/**
 * Complete form renderer with rule engine integration
 */
export function FormRenderer({
  schema,
  components,
  fieldValues,
  onFieldChange,
  fieldStates = {},
  environmentVariables = {},
  className,
}: FormRendererProps): ReactNode {
  const renderedFields = useMemo(() => {
    return schema.form.fields.map((field) => (
      <FieldRenderer
        key={field.id}
        field={field}
        components={components}
        fieldValues={fieldValues}
        onFieldChange={onFieldChange}
      />
    ));
  }, [schema.form.fields, components, fieldValues, onFieldChange]);

  return (
    <FormRuleProvider
      schema={schema}
      fieldValues={fieldValues}
      fieldStates={fieldStates}
      environmentVariables={environmentVariables}
    >
      <div className={className}>{renderedFields}</div>
    </FormRuleProvider>
  );
}

export default FormRenderer;
