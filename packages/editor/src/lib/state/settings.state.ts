import { create } from 'zustand';
import defaultSchema from '../defaultSchema';

export const RIGHT_BAR_TABS = {
  PAGE: 'page',
  FORM: 'form',
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
  clearPage: () => void;
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
  page: defaultSchema.form.fields[0].id,
  setPage: (page) => {
    set({ page });
  },
  clearPage: () => {
    set({ page: defaultSchema.form.fields[0].id });
  },
  activeTab: 'form',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));
