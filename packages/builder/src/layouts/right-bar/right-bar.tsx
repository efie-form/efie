import type { ElementType } from 'react';
import { AiFillLayout } from 'react-icons/ai';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import Tooltip from '../../components/elements/tooltip';
import { RIGHT_BAR_TABS, type RightBarTab } from '../../lib/constant';
import { useSettingsStore } from '../../lib/state/settings.state';
import { cn } from '../../lib/utils';
import FieldPropertiesTab from './tabs/field-properties-tab';
import PagePropertiesTab from './tabs/page-properties-tab';

interface Tab {
  id: RightBarTab;
  label: string;
  Icon: ElementType;
  tab: ElementType;
  hidden?: boolean;
}

function RightBar() {
  const { selectedFieldId, activeTab, setActiveTab } = useSettingsStore();

  const tabs: Tab[] = [
    {
      id: RIGHT_BAR_TABS.PAGE,
      label: 'Page settings',
      Icon: AiFillLayout,
      tab: PagePropertiesTab,
    },
    {
      id: RIGHT_BAR_TABS.FIELD_SETTINGS,
      label: 'Field properties',
      Icon: HiMiniInformationCircle,
      tab: FieldPropertiesTab,
      hidden: !selectedFieldId,
    },
  ];

  const TabContent = tabs.find((tab) => tab.id === activeTab)?.tab;

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 overflow-hidden">
        {TabContent && activeTab && (
          <div className="w-[16rem]">
            <TabContent />
          </div>
        )}
      </div>
      <div className="h-full bg-neutral-100/40">
        {tabs
          .filter((tab) => !tab.hidden)
          .map((tab) => (
            <Tooltip key={tab.id} content={tab.label} side="right" align="center" sideOffset={4}>
              <button
                type="button"
                className={cn(
                  'block cursor-pointer p-3 transition-all duration-100 hover:bg-neutral-200/30',
                  {
                    '!bg-neutral-200/80': tab.id === activeTab,
                  },
                )}
                onClick={() => setActiveTab(tab.id === activeTab ? null : tab.id)}
              >
                <tab.Icon size={16} className="text-neutral-800" />
              </button>
            </Tooltip>
          ))}
      </div>
    </div>
  );
}

export default RightBar;
