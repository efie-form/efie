import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { useState } from 'react';
import FieldsTab from './tabs/FieldsTab';
import { cn } from '../../lib/utils';
import { PagesTab } from './tabs/PagesTab';
import { FaRegCopy } from 'react-icons/fa';
import Tooltip from '../../components/elements/Tooltip';

const tabs = [
  {
    id: 'fields',
    Icon: HiMiniSquaresPlus,
    label: 'Fields',
    tab: FieldsTab,
  },
  {
    id: 'pages',
    Icon: FaRegCopy,
    label: 'Pages',
    tab: PagesTab,
  },
  // {
  //   id: 'rules-conditions',
  //   Icon: LuListTree,
  //   label: 'Rules & Conditions',
  // },
  // {
  //   id: 'page-flow',
  //   Icon: TiFlowMerge,
  //   label: 'Page Flow',
  // },
];

function LeftBar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="h-full flex">
      <div className="bg-neutral-100/40 h-full">
        {tabs.map(tab => (
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
                },
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.Icon size={16} className="text-neutral-800" />
            </div>
          </Tooltip>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b border-neutral-100">
          <p className="typography-body1 font-semibold text-neutral-600">
            {currentTab?.label}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {currentTab?.tab && <currentTab.tab />}
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
