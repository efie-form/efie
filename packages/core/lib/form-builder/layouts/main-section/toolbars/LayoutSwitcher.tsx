import { FaDesktop, FaMobileScreen } from 'react-icons/fa6';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';

function LayoutSwitcher() {
  const { mode, setMode } = useSettingsStore();
  const isMobile = mode === 'mobile';
  const isDesktop = mode === 'desktop';

  return (
    <div className="flex bg-neutral-50 rounded-lg overflow-hidden">
      <button
        className="p-2.5 hover:bg-neutral-100/50 transition-all"
        onClick={() => setMode('desktop')}
      >
        <FaDesktop
          size={16}
          className={cn('transition-all', {
            'text-neutral-800': isDesktop,
            'text-neutral-300': !isDesktop,
          })}
        />
      </button>
      <button
        className="p-2.5 hover:bg-neutral-100/50"
        onClick={() => setMode('mobile')}
      >
        <FaMobileScreen
          size={16}
          className={cn('transition-all', {
            'text-neutral-800': isMobile,
            'text-neutral-300': !isMobile,
          })}
        />
      </button>
    </div>
  );
}

export default LayoutSwitcher;
