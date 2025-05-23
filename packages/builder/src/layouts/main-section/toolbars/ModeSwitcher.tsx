import { FaCode, FaEye } from 'react-icons/fa6';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { FaRegEdit } from 'react-icons/fa';
import { cn } from '../../../lib/utils';

export default function ModeSwitcher() {
  const { setMode, mode } = useSettingsStore();
  const isEdit = mode === 'edit';
  const isPreview = mode === 'preview';
  const isCode = mode === 'json';

  return (
    <div className="flex bg-neutral-50 rounded-lg overflow-hidden">
      <button
        className="p-2.5 bg-neutral-50 rounded-lg hover:bg-neutral-100/50"
        onClick={() => setMode('edit')}
      >
        <FaRegEdit
          className={cn('transition-all', {
            'text-neutral-800': isEdit,
            'text-neutral-300': !isEdit,
          })}
        />
      </button>
      <button
        className="p-2.5 bg-neutral-50 rounded-lg hover:bg-neutral-100/50"
        onClick={() => setMode('preview')}
      >
        <FaEye
          className={cn('transition-all', {
            'text-neutral-800': isPreview,
            'text-neutral-300': !isPreview,
          })}
        />
      </button>
      <button
        className="p-2.5 bg-neutral-50 rounded-lg hover:bg-neutral-100/50"
        onClick={() => setMode('json')}
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
