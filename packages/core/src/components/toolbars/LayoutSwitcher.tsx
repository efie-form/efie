import {FaMobileScreen, FaDesktop} from 'react-icons/fa6';
import {useState} from 'react';
import cn from '../../lib/cn.ts';

function LayoutSwitcher() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="flex bg-neutral-50 rounded-lg overflow-hidden">
      <button
        className="p-2.5 hover:bg-neutral-100/50 transition-all"
        onClick={() => setIsMobile(false)}
      >
        <FaDesktop
          size={16}
          className={cn('transition-all', {
            'text-neutral-800': !isMobile,
            'text-neutral-300': isMobile,
          })}
        />
      </button>
      <button
        className="p-2.5 hover:bg-neutral-100/50"
        onClick={() => setIsMobile(true)}
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
