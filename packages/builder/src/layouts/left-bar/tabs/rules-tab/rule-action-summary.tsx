import type { Action } from '@efie-form/core';
import { RuleAction } from '@efie-form/core';
import { useSchemaStore } from '../../../../lib/state/schema.state';

const ACTION_LABEL: Record<string, string> = {
  [RuleAction.SHOW_FIELDS]: 'show',
  [RuleAction.HIDE_FIELDS]: 'hide',
  [RuleAction.SET_REQUIRED]: 'set required',
  [RuleAction.SET_OPTIONAL]: 'set optional',
} as const;

interface RuleActionSummaryProps {
  actions: Action[];
}

export default function RuleActionSummary({ actions }: RuleActionSummaryProps) {
  if (!actions.length) {
    return (
      <div className="typography-body3 leading-snug text-neutral-600">
        <span className="me-1 rounded-xs bg-neutral-200 px-1 py-0.5 text-neutral-700">DO</span>
        <span className="text-neutral-700">No actions</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {actions.map((action, index) => (
        <ActionItem key={action.id || index} action={action} />
      ))}
    </div>
  );
}

interface ActionItemProps {
  action: Action;
}

function ActionItem({ action }: ActionItemProps) {
  return (
    <div className="typography-body3 leading-snug text-neutral-600">
      <span className="me-1 rounded-xs bg-neutral-200 px-1 py-0.5 text-neutral-700">DO</span>
      <ActionContent action={action} />
    </div>
  );
}

interface ActionContentProps {
  action: Action;
}

function ActionContent({ action }: ActionContentProps) {
  switch (action.type) {
    case RuleAction.SHOW_FIELDS:
    case RuleAction.HIDE_FIELDS:
    case RuleAction.SET_REQUIRED:
    case RuleAction.SET_OPTIONAL:
      return <FieldListAction action={action} />;
    case 'custom':
      return <CustomActionContent action={action} />;
    default:
      return <span className="text-neutral-700">unknown action</span>;
  }
}

interface FieldListActionProps {
  action: Extract<Action, { fields: string[] }>;
}

function FieldListAction({ action }: FieldListActionProps) {
  const actionLabel = ACTION_LABEL[action.type] || action.type;

  if (!action.fields.length) {
    return (
      <>
        <span className="text-neutral-700">{actionLabel}</span>
        <span className="text-neutral-500"> (no fields)</span>
      </>
    );
  }

  const shouldTruncate = action.fields.length > 3;
  const displayFields = shouldTruncate ? action.fields.slice(0, 3) : action.fields;

  return (
    <>
      <span className="text-neutral-700">{actionLabel} </span>
      {displayFields.map((fieldId, index) => (
        <span key={fieldId}>
          <FieldLabel fieldId={fieldId} />
          {index < displayFields.length - 1 && <span className="text-neutral-700">, </span>}
        </span>
      ))}
      {shouldTruncate && <span className="text-neutral-700">, …</span>}
    </>
  );
}

interface FieldLabelProps {
  fieldId: string;
}

function FieldLabel({ fieldId }: FieldLabelProps) {
  const field = useSchemaStore((s) => s.getFieldById(fieldId));
  if (!field) return <span className="text-neutral-800">{fieldId}</span>;

  return (
    <span className="font-medium text-primary-700 bg-primary-200 p-0.5 rounded-xs">
      {field.sys.name}
    </span>
  );
}

interface CustomActionContentProps {
  action: Extract<Action, { type: 'custom' }>;
}

function CustomActionContent({ action }: CustomActionContentProps) {
  const actionName = action.name || 'unnamed';
  return (
    <>
      <span className="text-neutral-700">custom action </span>
      <span className="font-medium text-neutral-800">{actionName}</span>
    </>
  );
}
