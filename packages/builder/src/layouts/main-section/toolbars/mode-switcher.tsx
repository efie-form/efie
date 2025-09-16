import { FaRegEdit } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa6';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';

const MODES = [
  { mode: 'edit', Icon: FaRegEdit },
  { mode: 'json', Icon: FaCode },
] as const;

export default function ModeSwitcher() {
  const { setMode, mode } = useSettingsStore();

  return (
    <div className="flex overflow-hidden rounded-lg bg-neutral-50">
      {MODES.map((m) => (
        <button
          key={m.mode}
          type="button"
          className="rounded-lg bg-neutral-50 p-2.5 hover:bg-neutral-100/50"
          onClick={() => setMode(m.mode)}
          aria-label={`Switch to ${m.mode} mode`}
        >
          <m.Icon
            className={cn(
              'transition-all',
              m.mode === mode ? 'text-neutral-800' : 'text-neutral-300',
            )}
          />
        </button>
      ))}
    </div>
  );
}
