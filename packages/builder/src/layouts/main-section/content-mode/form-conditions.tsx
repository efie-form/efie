import Divider from '../../../components/elements/divider';
import { Input, Select, Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';

export default function FormConditions() {
  const selectedConditionId = useSettingsStore((state) => state.selectedConditionId);
  const rule = useSchemaStore((state) => state.findRuleById(selectedConditionId));
  const updateRule = useSchemaStore((state) => state.updateRule);

  if (!rule) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="rounded-md border border-neutral-200 bg-white px-6 py-10 text-center">
          <p className="typography-body2 text-neutral-600">Select a rule from the left to edit.</p>
        </div>
      </div>
    );
  }

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
            <Input placeholder="Select field or enter expression" />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Operator</p>
            <Select
              options={[
                { value: 'equal', label: 'Equals' },
                { value: 'not_equal', label: 'Does Not Equal' },
                { value: 'contains', label: 'Contains' },
                { value: 'not_contains', label: 'Does Not Contain' },
                { value: 'gt', label: 'Greater Than' },
                { value: 'lt', label: 'Less Than' },
                { value: 'gte', label: '≥ Greater or Equal' },
                { value: 'lte', label: '≤ Less or Equal' },
              ]}
            />
          </div>
          <div className="sm:col-span-1">
            <p className="typography-body3 mb-1 text-neutral-600">Value</p>
            <Input placeholder="Compare value" />
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
