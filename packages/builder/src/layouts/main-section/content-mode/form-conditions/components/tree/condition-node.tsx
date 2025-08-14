import type { FormField, Operator } from '@efie-form/core';
import { SharedOperator } from '@efie-form/core';
import { useEffect, useMemo, useState } from 'react';
import { FieldTypeOperators, OPERATORS_NAME } from '../../../../../../lib/constant';
import { useSchemaStore } from '../../../../../../lib/state/schema.state';
import { cn, isInputField } from '../../../../../../lib/utils';
import FieldsSelect from '../../fields-select';
import { operatorNeedsNoValue } from '../../value-editors/common';
import OperatorSelect from '../operator-select';
import ValueEditor from '../value-editor';

export interface ConditionNodeUI {
  left: { kind: 'fieldValue'; field: string };
  operator: Operator;
  right?: unknown;
  // options reserved; not yet surfaced in UI
  options?: Record<string, unknown>;
}

interface ConditionNodeProps {
  node: ConditionNodeUI;
  onChange: (node: ConditionNodeUI) => void;
  onRemove?: () => void;
}

export default function ConditionNodeEditor({ node, onChange }: ConditionNodeProps) {
  const fieldMap = useSchemaStore((s) => s.fieldMap);
  const field = useMemo<FormField | undefined>(
    () => fieldMap.get(node.left.field),
    [fieldMap, node.left.field],
  );
  const [operator, setOperator] = useState<Operator>(node.operator);
  const [value, setValue] = useState<unknown>(node.right);

  // keep local state synced if parent props change
  useEffect(() => {
    setOperator(node.operator);
  }, [node.operator]);
  useEffect(() => {
    setValue(node.right);
  }, [node.right]);

  const operatorOptions = useMemo(() => {
    const opts: { value: Operator; label: string }[] = [];
    if (field && isInputField(field)) {
      const list = FieldTypeOperators[field.type] ?? [];
      for (const op of list) {
        opts.push({ value: op, label: OPERATORS_NAME[op] });
      }
      // shared operators
      for (const op of Object.values(SharedOperator)) {
        const key = op as Operator;
        opts.push({ value: key, label: OPERATORS_NAME[key] });
      }
    }
    return opts;
  }, [field]);

  // Handlers that emit changes upward
  const handleFieldChange = (newField: FormField) => {
    const list = isInputField(newField) ? (FieldTypeOperators[newField.type] ?? []) : [];
    const opts = [
      ...list.map((op) => ({ value: op, label: OPERATORS_NAME[op] })),
      ...Object.values(SharedOperator).map((op) => ({
        value: op as Operator,
        label: OPERATORS_NAME[op as Operator],
      })),
    ];
    const nextOp = opts.find((o) => o.value === operator)?.value ?? opts[0]?.value ?? operator;
    const nextValue = operatorNeedsNoValue(nextOp) ? undefined : value;
    setOperator(nextOp);
    setValue(nextValue);
    onChange({
      ...node,
      left: { kind: 'fieldValue', field: newField.id },
      operator: nextOp,
      right: nextValue,
    });
  };

  const handleOperatorChange = (op: Operator) => {
    const nextValue = operatorNeedsNoValue(op) ? undefined : value;
    setOperator(op);
    setValue(nextValue);
    onChange({ ...node, operator: op, right: nextValue });
  };

  const handleValueChange = (v: unknown) => {
    setValue(v);
    onChange({ ...node, right: v });
  };

  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3')}>
      <div className="sm:col-span-1">
        <FieldsSelect value={field} onChange={handleFieldChange} />
      </div>
      <div className="sm:col-span-1">
        <OperatorSelect
          options={operatorOptions}
          value={operator}
          onChange={handleOperatorChange}
          disabled={!field}
        />
      </div>
      <div className="sm:col-span-1">
        <ValueEditor field={field} operator={operator} value={value} onChange={handleValueChange} />
      </div>
    </div>
  );
}
