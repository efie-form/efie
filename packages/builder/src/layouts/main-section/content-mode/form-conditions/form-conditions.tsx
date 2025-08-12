import { type FormField, type Operator, SharedOperator } from '@efie-form/core';
import { useEffect, useState } from 'react';
import Divider from '../../../../components/elements/divider';
import { FieldTypeOperators, OPERATORS_NAME } from '../../../../lib/constant';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn, isInputField } from '../../../../lib/utils';
import ActionsPanel from './components/actions-panel';
import OperatorSelect from './components/operator-select';
import RuleHeader from './components/rule-header';
import ValueEditor from './components/value-editor';
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

  // no-op: date-like logic moved inside ValueEditor

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <RuleHeader
        id={rule.id}
        enabled={rule.enabled}
        onToggleEnabled={(v) => updateRule(rule.id, { enabled: v })}
      />

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
            <OperatorSelect
              options={operators}
              value={selectedOperator as Operator | undefined}
              onChange={(op) => {
                setSelectedOperator(op);
                setValue(undefined);
              }}
            />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Value</p>
            <ValueEditor
              field={selectedField}
              operator={selectedOperator}
              value={value}
              onChange={setValue}
            />
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
      <ActionsPanel />
    </div>
  );
}
