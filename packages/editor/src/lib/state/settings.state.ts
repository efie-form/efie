import { create } from 'zustand';

interface SettingsState {
  selectedFieldId: string | null;
  setSelectedFieldId: (id: SettingsState['selectedFieldId']) => void;
  mode: 'desktop' | 'mobile';
  setMode: (mode: SettingsState['mode']) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  selectedFieldId: null,
  setSelectedFieldId: (id) => {
    set({ selectedFieldId: id });
  },
  mode: 'desktop',
  setMode: (mode) => {
    set({ mode });
  },
}));
