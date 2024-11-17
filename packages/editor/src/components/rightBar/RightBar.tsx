import { HiMiniInformationCircle } from 'react-icons/hi2';
import FieldPropertiesTab from './tabs/FieldPropertiesTab.tsx';
import { cn } from '../../lib/utils.ts';
import LayoutPropertiesTab from './tabs/LayoutPropertiesTab.tsx';
import { AiFillLayout } from 'react-icons/ai';
import type { RightBarTab } from '../../lib/state/right-bar.state.ts';
import {
  RIGHT_BAR_TABS,
  useRightBarState,
} from '../../lib/state/right-bar.state.ts';
import type { ElementType } from 'react';

interface Tab {
  id: RightBarTab;
  label: string;
  Icon: ElementType;
  tab: ElementType;
}

const tabs: Tab[] = [
  {
    id: RIGHT_BAR_TABS.LAYOUT,
    label: 'Layout',
    Icon: AiFillLayout,
    tab: LayoutPropertiesTab,
  },
  {
    id: RIGHT_BAR_TABS.FIELD_SETTINGS,
    label: 'Properties',
    Icon: HiMiniInformationCircle,
    tab: FieldPropertiesTab,
  },
];

function RightBar() {
  const { activeTab, setActiveTab } = useRightBarState();
  const TabContent = tabs.find((tab) => tab.id === activeTab)?.tab;

  return (
    <div className="h-full flex">
      <div className="flex-1">{TabContent && <TabContent />}</div>
      <div className="bg-neutral-100/40 h-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'p-3.5 hover:bg-neutral-200/30 cursor-pointer transition-all duration-100',
              {
                '!bg-neutral-200/80': tab.id === activeTab,
              }
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.Icon size={16} className="text-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightBar;
