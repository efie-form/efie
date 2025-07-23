import { FaRegEdit } from 'react-icons/fa';
import { FaCode, FaEye } from 'react-icons/fa6';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';

export default function ModeSwitcher() {
  const { setMode, mode } = useSettingsStore();
  const isEdit = mode === 'edit';
  const isPreview = mode === 'preview';
  const isCode = mode === 'json';

  return (
    <div className="flex overflow-hidden rounded-lg bg-neutral-50">
      <button
        type="button"
        className="rounded-lg bg-neutral-50 p-2.5 hover:bg-neutral-100/50"
        onClick={() => setMode('edit')}
        aria-label="Switch to edit mode"
      >
        <FaRegEdit
          className={cn('transition-all', {
            'text-neutral-800': isEdit,
            'text-neutral-300': !isEdit,
          })}
        />
      </button>
      <button
        type="button"
        className="rounded-lg bg-neutral-50 p-2.5 hover:bg-neutral-100/50"
        onClick={() => setMode('preview')}
        aria-label="Switch to preview mode"
      >
        <FaEye
          className={cn('transition-all', {
            'text-neutral-800': isPreview,
            'text-neutral-300': !isPreview,
          })}
        />
      </button>
      <button
        type="button"
        className="rounded-lg bg-neutral-50 p-2.5 hover:bg-neutral-100/50"
        onClick={() => setMode('json')}
        aria-label="Switch to JSON mode"
      >
        <FaCode
          className={cn('transition-all', {
            'text-neutral-800': isCode,
            'text-neutral-300': !isCode,
          })}
        />
      </button>
    </div>
  );
}
