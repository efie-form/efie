import { create } from 'zustand';

interface SettingsState {
  selectedFieldId: string | null;
  setSelectedFieldId: (id: SettingsState['selectedFieldId']) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  selectedFieldId: null,
  setSelectedFieldId: (id) => {
    set({ selectedFieldId: id });
  },
}));
