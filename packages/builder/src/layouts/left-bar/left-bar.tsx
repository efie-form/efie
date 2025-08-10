import { useState } from 'react';
import { CgListTree } from 'react-icons/cg';
import { FaRegCopy } from 'react-icons/fa';
import { HiMiniSquaresPlus } from 'react-icons/hi2';
import Tooltip from '../../components/elements/tooltip';
import { cn } from '../../lib/utils';
import FieldsTab from './tabs/fields-tab';
import { PagesTab } from './tabs/pages-tab';
import RulesTab from './tabs/rules-tab';

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
  {
    id: 'rules-conditions',
    Icon: CgListTree,
    label: 'Rules & Conditions',
    tab: RulesTab,
  },
  // {
  //   id: 'page-flow',
  //   Icon: TiFlowMerge,
  //   label: 'Page Flow',
  // },
];

function LeftBar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex h-full">
      <div className="h-full bg-neutral-100/40">
        {tabs.map((tab) => (
          <Tooltip key={tab.id} content={tab.label} side="right" align="center" sideOffset={4}>
            <button
              type="button"
              className={cn(
                'block cursor-pointer p-3 transition-all duration-100 hover:bg-neutral-200/30',
                {
                  '!bg-neutral-200/80': tab.id === activeTab,
                },
              )}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
            >
              <tab.Icon size={16} className="text-neutral-800" />
            </button>
          </Tooltip>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="border-neutral-100 border-b px-4 py-2">
          <p className="typography-body1 font-semibold text-neutral-600">{currentTab?.label}</p>
        </div>
        <div className="flex-1 overflow-y-auto">{currentTab?.tab && <currentTab.tab />}</div>
      </div>
    </div>
  );
}

export default LeftBar;
