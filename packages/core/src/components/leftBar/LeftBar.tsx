import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { TiFlowMerge } from 'react-icons/ti';
import { LuListTree } from 'react-icons/lu';
import { useState } from 'react';
import FieldsTab from './tabs/FieldsTab.tsx';
import { cn } from '../../lib/utils.ts';

const tabs = [
  {
    id: 'fields',
    Icon: HiMiniSquaresPlus,
    label: 'Fields',
    tab: FieldsTab,
  },
  {
    id: 'conditions',
    Icon: LuListTree,
    label: 'Conditions',
  },
  {
    id: 'page-flow',
    Icon: TiFlowMerge,
    label: 'Page Flow',
  },
];

function LeftBar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const TabContent = tabs.find((tab) => tab.id === activeTab)?.tab;

  return (
    <div className="h-full flex">
      <div className="w-12 bg-neutral-100/40 h-full">
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
      <div className="flex-1 overflow-y-auto">
        {TabContent && <TabContent />}
      </div>
    </div>
  );
}

export default LeftBar;
