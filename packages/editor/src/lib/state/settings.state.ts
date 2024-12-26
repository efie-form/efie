import { create } from 'zustand';

export const RIGHT_BAR_TABS = {
  LAYOUT: 'layout',
  FIELD_SETTINGS: 'field-settings',
} as const;

export type RightBarTab = (typeof RIGHT_BAR_TABS)[keyof typeof RIGHT_BAR_TABS];

interface SettingsState {
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string) => void;
  clearSelectedFieldId: () => void;
  mode: 'desktop' | 'mobile';
  setMode: (mode: SettingsState['mode']) => void;
  page: string | null;
  setPage: (page: SettingsState['page']) => void;
  activeTab: RightBarTab;
  setActiveTab: (tab: RightBarTab) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  selectedFieldId: null,
  setSelectedFieldId: (id) => {
    set({ selectedFieldId: id, activeTab: 'field-settings' });
  },
  clearSelectedFieldId: () => {
    set({ selectedFieldId: null, activeTab: 'field-settings' });
  },
  mode: 'desktop',
  setMode: (mode) => {
    set({ mode });
  },
  page: null,
  setPage: (page) => {
    set({ page });
  },
  activeTab: 'layout',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));
