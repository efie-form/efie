import {
  FieldInputType,
  type FormField,
  type Operator,
  PropertyType,
  SharedOperator,
} from '@efie-form/core';
import { useEffect, useState } from 'react';
import Divider from '../../../../components/elements/divider';
import {
  Input,
  Number as NumberInput,
  Select,
  StyledSelect,
  Switch,
} from '../../../../components/form';
import { FieldTypeOperators, OPERATORS_NAME } from '../../../../lib/constant';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn, getFieldProp, isInputField } from '../../../../lib/utils';
import FieldsSelect from './fields-select';

export default function FormConditions() {
  const selectedConditionId = useSettingsStore((state) => state.selectedConditionId);
  const rule = useSchemaStore((state) => state.findRuleById(selectedConditionId));
  const updateRule = useSchemaStore((state) => state.updateRule);
  const [selectedField, setSelectedField] = useState<FormField>();
  const [operators, setOperators] = useState<{ value: Operator; label: string }[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<Operator>();
  const [value, setValue] = useState<unknown>();

  useEffect(() => {
    const newOperators = [];
    if (selectedField?.type) {
      if (isInputField(selectedField)) {
        newOperators.push(
          ...Object.values(FieldTypeOperators[selectedField.type]).map((op) => ({
            value: op,
            label: OPERATORS_NAME[op],
          })),
        );
      }
    }

    if (selectedField) {
      newOperators.push(
        ...Object.values(SharedOperator).map((op) => ({
          value: op,
          label: OPERATORS_NAME[op],
        })),
      );
    }
    setOperators(newOperators);
    // reset operator/value when field changes
    setSelectedOperator(newOperators[0]?.value);
    setValue(undefined);
  }, [selectedField]);

  if (!rule) return;

  const operatorNeedsNoValue = (op?: Operator) => {
    if (!op) return false;
    return (
      op === SharedOperator.IS_EMPTY ||
      op === SharedOperator.IS_FILLED ||
      op === SharedOperator.IS_VALID ||
      op === SharedOperator.IS_INVALID ||
      op === ('is_true' as Operator) ||
      op === ('is_false' as Operator)
    );
  };

  const isDateLike = (t?: FieldInputType) =>
    t === FieldInputType.DATE || t === FieldInputType.TIME || t === FieldInputType.DATE_TIME;

  const renderValueEditor = () => {
    if (!selectedField || !isInputField(selectedField)) return null;
    if (operatorNeedsNoValue(selectedOperator)) return null;

    const type = selectedField.type as FieldInputType;

    // String-like fields
    if (
      type === FieldInputType.SHORT_TEXT ||
      type === FieldInputType.LONG_TEXT ||
      type === FieldInputType.EMAIL ||
      type === FieldInputType.PASSWORD ||
      type === FieldInputType.PHONE
    ) {
      // Special cases for email/phone domain/country list operators: accept comma-separated list
      const isListOp =
        selectedOperator === ('email_domain_in' as Operator) ||
        selectedOperator === ('email_domain_not_in' as Operator) ||
        selectedOperator === ('phone_country_in' as Operator) ||
        selectedOperator === ('phone_country_not_in' as Operator);
      return (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => setValue(v)}
          placeholder={
            isListOp ? 'Comma-separated list (e.g. example.com, test.org)' : 'Compare value'
          }
        />
      );
    }

    // Number
    if (type === FieldInputType.NUMBER) {
      return (
        <NumberInput
          value={typeof value === 'number' ? value : undefined}
          onChange={(v) => setValue(v)}
          placeholder="e.g. 10"
        />
      );
    }

    // Date/Time/DateTime
    if (isDateLike(type)) {
      // BETWEEN needs two inputs
      if (selectedOperator === ('between' as Operator)) {
        const v = Array.isArray(value) ? (value as string[]) : ['', ''];
        return (
          <div className="flex items-center gap-2">
            <Input
              value={v[0]}
              onChange={(nv) => setValue([nv, v[1]])}
              inputProps={{
                type:
                  type === FieldInputType.TIME
                    ? 'time'
                    : type === FieldInputType.DATE_TIME
                      ? 'datetime-local'
                      : 'date',
              }}
              placeholder="Start"
            />
            <span className="typography-body3 text-neutral-500">to</span>
            <Input
              value={v[1]}
              onChange={(nv) => setValue([v[0], nv])}
              inputProps={{
                type:
                  type === FieldInputType.TIME
                    ? 'time'
                    : type === FieldInputType.DATE_TIME
                      ? 'datetime-local'
                      : 'date',
              }}
              placeholder="End"
            />
          </div>
        );
      }

      // Other date operators: single input
      return (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={(nv) => setValue(nv)}
          inputProps={{
            type:
              type === FieldInputType.TIME
                ? 'time'
                : type === FieldInputType.DATE_TIME
                  ? 'datetime-local'
                  : 'date',
          }}
          placeholder={
            type === FieldInputType.TIME
              ? 'Select time'
              : type === FieldInputType.DATE_TIME
                ? 'Select date and time'
                : 'Select date'
          }
        />
      );
    }

    // Checkbox (boolean)
    if (type === FieldInputType.CHECKBOX) {
      return (
        <Select
          value={(typeof value === 'string' ? value : '') as 'true' | 'false'}
          onChange={(v) => setValue(v)}
          options={[
            { value: 'true', label: 'True' },
            { value: 'false', label: 'False' },
          ]}
        />
      );
    }

    // Choice fields
    if (type === FieldInputType.SINGLE_CHOICE || type === FieldInputType.MULTIPLE_CHOICES) {
      const optsProp = getFieldProp(selectedField, PropertyType.OPTIONS);
      const opts = optsProp?.value ?? [];

      if (type === FieldInputType.SINGLE_CHOICE) {
        return (
          <StyledSelect
            options={opts.map((o) => ({ value: o.value, label: o.label }))}
            value={(typeof value === 'string' ? value : undefined) as string | undefined}
            onChange={(v) => setValue(v)}
            searchable
          />
        );
      }
      // Multiple choices: accept comma-separated list of values
      return (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => setValue(v)}
          placeholder="Option values (comma-separated)"
        />
      );
    }

    // Address-specific operators: accept comma-separated
    if (type === FieldInputType.ADDRESS) {
      return (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => setValue(v)}
          placeholder="Comma-separated list (e.g. US, CA)"
        />
      );
    }

    // Fallback
    return (
      <Input
        value={typeof value === 'string' ? value : ''}
        onChange={(v) => setValue(v)}
        placeholder="Compare value"
      />
    );
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="typography-body1 text-neutral-800">Editing rule</p>
          <p className="typography-body3 text-neutral-500">ID: {rule.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="typography-body3 text-neutral-600">Enabled</span>
          <Switch
            checked={Boolean(rule.enabled ?? true)}
            onChange={(v) => updateRule(rule.id, { enabled: v })}
          />
        </div>
      </div>

      {/* When (Conditions) */}
      <div className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm')}>
        <p className="typography-body1 mb-3">When</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">If</p>
            <FieldsSelect value={selectedField} onChange={setSelectedField} />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Operator</p>
            <StyledSelect
              options={operators}
              value={selectedOperator as Operator | undefined}
              onChange={(op) => {
                setSelectedOperator(op);
                setValue(undefined);
              }}
              searchable
            />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Value</p>
            {renderValueEditor()}
          </div>
        </div>
        <div className="mt-3">
          <p className="typography-body4 text-neutral-500">
            Use AND/OR to add more conditions (coming soon).
          </p>
        </div>
      </div>

      <Divider className="my-4">
        <p className="typography-body2 text-neutral-700">Then</p>
      </Divider>

      {/* Then (Actions) */}
      <div className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm')}>
        <p className="typography-body1 mb-3">Do</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Action</p>
            <Select
              options={[
                { value: 'show_fields', label: 'Show fields' },
                { value: 'hide_fields', label: 'Hide fields' },
                { value: 'set_required', label: 'Set required' },
                { value: 'set_enabled', label: 'Set enabled' },
                { value: 'set_visible', label: 'Set visible' },
                { value: 'set_value', label: 'Set value' },
                { value: 'clear_value', label: 'Clear value' },
                { value: 'display_message', label: 'Display message' },
              ]}
            />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Target</p>
            <Input placeholder="Field id or page id" />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Value (optional)</p>
            <Input placeholder="e.g. true, 10, text…" />
          </div>
        </div>
        <div className="mt-3">
          <p className="typography-body4 text-neutral-500">
            Multiple actions will be supported soon.
          </p>
        </div>
      </div>
    </div>
  );
}
