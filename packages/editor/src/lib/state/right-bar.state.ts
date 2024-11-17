import { create } from 'zustand';

export const RIGHT_BAR_TABS = {
  LAYOUT: 'layout',
  FIELD_SETTINGS: 'field-settings',
} as const;

export type RightBarTab = (typeof RIGHT_BAR_TABS)[keyof typeof RIGHT_BAR_TABS];

interface RightBarState {
  activeTab: RightBarTab;
  setActiveTab: (tab: RightBarTab) => void;
}

export const useRightBarState = create<RightBarState>((set) => ({
  activeTab: 'layout',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));
