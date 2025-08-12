import { Switch } from '../../../../../components/form';

interface RuleHeaderProps {
  id: string;
  enabled?: boolean;
  onToggleEnabled: (v: boolean) => void;
}

const RuleHeader = ({ id, enabled = true, onToggleEnabled }: RuleHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="typography-body1 text-neutral-800">Editing rule</p>
        <p className="typography-body3 text-neutral-500">ID: {id}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="typography-body3 text-neutral-600">Enabled</span>
        <Switch checked={Boolean(enabled)} onChange={onToggleEnabled} />
      </div>
    </div>
  );
};

export default RuleHeader;
