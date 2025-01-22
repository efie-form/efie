import { HiMiniInformationCircle } from 'react-icons/hi2';
import FieldPropertiesTab from './tabs/FieldPropertiesTab.tsx';
import { cn } from '../../lib/utils.ts';
import PagePropertiesTab from './tabs/PagePropertiesTab.tsx';
import { AiFillLayout } from 'react-icons/ai';
import type { ElementType } from 'react';
import type { RightBarTab } from '../../lib/state/settings.state.ts';
import { RIGHT_BAR_TABS } from '../../lib/state/settings.state.ts';
import { useSettingsStore } from '../../lib/state/settings.state.ts';
import FormPropertiesTab from './tabs/FormPropertiesTab.tsx';
import { RiFileInfoFill } from 'react-icons/ri';
import Tooltip from '../../components/elements/Tooltip.tsx';

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
      id: RIGHT_BAR_TABS.FORM,
      label: 'Form settings',
      Icon: RiFileInfoFill,
      tab: FormPropertiesTab,
    },
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
    <div className="h-full flex w-full">
      <div className="flex-1 overflow-hidden">
        {TabContent && <TabContent />}
      </div>
      <div className="bg-neutral-100/40 h-full">
        {tabs
          .filter((tab) => !tab.hidden)
          .map((tab) => (
            <Tooltip
              key={tab.id}
              content={tab.label}
              side="right"
              align="center"
              sideOffset={4}
            >
              <div
                className={cn(
                  'p-3 hover:bg-neutral-200/30 cursor-pointer transition-all duration-100',
                  {
                    '!bg-neutral-200/80': tab.id === activeTab,
                  }
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.Icon size={16} className="text-neutral-800" />
              </div>
            </Tooltip>
          ))}
      </div>
    </div>
  );
}

export default RightBar;
