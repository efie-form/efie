import {
  type Action,
  FieldInputType,
  FieldLayoutType,
  type FormField,
  type HideFieldsAction,
  RuleAction,
  type SetRequiredAction,
  type ShowFieldsAction,
} from '@efie-form/core';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SimpleMenu } from '../../../../../components/elements/dropdown-menu';
import { StyledSelect } from '../../../../../components/form';
import { fieldIcons } from '../../../../../lib/fields-tab/fields';

interface SetOptionalActionLocal {
  id: string;
  type: typeof RuleAction.SET_OPTIONAL;
  fields: string[];
  value: boolean;
}
export type FieldAction =
  | ShowFieldsAction
  | HideFieldsAction
  | SetRequiredAction
  | SetOptionalActionLocal;
export type FieldActionType = Exclude<Action['type'], 'custom'>;

export const ACTION_OPTIONS: { value: FieldActionType; label: string }[] = [
  { value: RuleAction.SHOW_FIELDS, label: 'Show fields' },
  { value: RuleAction.HIDE_FIELDS, label: 'Hide fields' },
  { value: RuleAction.SET_REQUIRED, label: 'Set required' },
  { value: RuleAction.SET_OPTIONAL, label: 'Set optional' },
];

export interface ActionItemProps {
  action: FieldAction;
  index: number;
  ruleId: string;
  onUpdate: (ruleId: string, actionId: string, patch: Omit<FieldAction, 'id'>) => void;
  onRemove: (ruleId: string, actionId: string) => void;
  allFields: FormField[]; // flattened
}

export function ActionItem({
  action,
  index,
  ruleId,
  onUpdate,
  onRemove,
  allFields,
}: ActionItemProps) {
  const optionsAll = allFields.map((field) => {
    const Icon = fieldIcons[field.type];
    return {
      value: field.id,
      label: field.sys.name,
      Icon,
      __type: field.type,
    } as const;
  });

  const inputTypeValues = new Set(Object.values(FieldInputType));
  const excludedShowHide = new Set<string>([FieldLayoutType.COLUMN, FieldLayoutType.PAGE]);

  const fieldOptions = optionsAll.filter((opt) => {
    const t = opt.__type as string;
    if (action.type === RuleAction.SET_REQUIRED || action.type === RuleAction.SET_OPTIONAL) {
      return inputTypeValues.has(t as FieldInputType);
    }
    if (action.type === RuleAction.SHOW_FIELDS || action.type === RuleAction.HIDE_FIELDS) {
      return !excludedShowHide.has(t);
    }
    return true;
  });

  return (
    <div className="rounded-md border border-neutral-200 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="typography-body2 text-neutral-700">Action #{index + 1}</p>
        <SimpleMenu
          align="end"
          trigger={
            <button type="button" className="typography-button2 text-neutral-600">
              <HiDotsHorizontal />
            </button>
          }
          items={[
            {
              key: 'remove',
              label: 'Remove',
              danger: true,
              onSelect: () => onRemove(ruleId, action.id),
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <p className="typography-body3 mb-1 text-neutral-600">Type</p>
          <StyledSelect
            options={ACTION_OPTIONS.slice()}
            value={action.type as FieldActionType}
            onChange={(nextType: FieldActionType) => {
              if (nextType === action.type) return;
              if (nextType === RuleAction.SHOW_FIELDS || nextType === RuleAction.HIDE_FIELDS) {
                const reset: Omit<ShowFieldsAction | HideFieldsAction, 'id'> = {
                  type: nextType,
                  fields: [],
                } as Omit<ShowFieldsAction | HideFieldsAction, 'id'>;
                onUpdate(ruleId, action.id, reset as Omit<FieldAction, 'id'>);
              } else {
                const reset: Omit<SetRequiredAction | SetOptionalActionLocal, 'id'> = {
                  type: nextType as typeof RuleAction.SET_REQUIRED | typeof RuleAction.SET_OPTIONAL,
                  fields: [],
                  value: true,
                };
                onUpdate(ruleId, action.id, reset as Omit<FieldAction, 'id'>);
              }
            }}
          />
        </div>
        <div className="sm:col-span-1">
          <p className="typography-body3 mb-1 text-neutral-600">Fields</p>
          <StyledSelect
            multiple
            options={fieldOptions}
            value={action.fields}
            onChange={(ids: string[]) => {
              if (
                action.type === RuleAction.SET_REQUIRED ||
                action.type === RuleAction.SET_OPTIONAL
              ) {
                const next: Omit<SetRequiredAction | SetOptionalActionLocal, 'id'> = {
                  type: action.type,
                  fields: ids,
                  value: (action as SetRequiredAction | SetOptionalActionLocal).value,
                };
                onUpdate(ruleId, action.id, next as Omit<FieldAction, 'id'>);
              } else {
                const next: Omit<ShowFieldsAction | HideFieldsAction, 'id'> = {
                  type: action.type,
                  fields: ids,
                } as Omit<ShowFieldsAction | HideFieldsAction, 'id'>;
                onUpdate(ruleId, action.id, next as Omit<FieldAction, 'id'>);
              }
            }}
            searchable
          />
        </div>
        <div className="hidden sm:block sm:col-span-1" aria-hidden="true" />
      </div>
    </div>
  );
}
