import { RuleAction } from '@efie-form/core';
import { Input, StyledSelect } from '../../../../../components/form';
import { cn } from '../../../../../lib/utils';

const ActionsPanel = () => {
  return (
    <div className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm')}>
      <p className="typography-body1 mb-3">Do</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <p className="typography-body3 mb-1 text-neutral-600">Action</p>
          <StyledSelect
            options={[
              { value: RuleAction.SHOW_FIELDS, label: 'Show fields' },
              { value: RuleAction.HIDE_FIELDS, label: 'Hide fields' },
              { value: RuleAction.SET_REQUIRED, label: 'Set required' },
              { value: RuleAction.SET_OPTIONAL, label: 'Set optional' },
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
  );
};

export default ActionsPanel;
