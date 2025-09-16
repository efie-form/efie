import type { CustomInputDef, FieldsConfigsMap } from '@efie-form/core';
import { create } from 'zustand';
import { RIGHT_BAR_TABS, type RightBarTab } from '../../constant';
import settingsConfig from './settings-config';

// Helper functions for localStorage
const getStoredWidth = (key: string, defaultValue: number): number => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStoredWidth = (key: string, value: number): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value.toString());
  } catch {
    // Silently fail if localStorage is not available
  }
};

interface SettingsState {
  formInputs: CustomInputDef[];
  setFormInputs: (inputs: SettingsState['formInputs']) => void;
  clearFormInputs: () => void;
  selectedFieldId?: string;
  setSelectedFieldId: (id: string) => void;
  clearSelectedFieldId: () => void;
  mode: 'edit' | 'json' | 'conditions';
  setMode: (mode: SettingsState['mode']) => void;
  previewDevice: 'desktop' | 'mobile';
  setPreviewDevice: (previewDevice: SettingsState['previewDevice']) => void;
  page?: string;
  setPage: (page: SettingsState['page']) => void;
  clearPage: () => void;
  activeTab: RightBarTab | null;
  setActiveTab: (tab: RightBarTab | null) => void;
  height?: number;
  setHeight: (height: SettingsState['height']) => void;
  leftBarWidth: number;
  setLeftBarWidth: (width: SettingsState['leftBarWidth']) => void;
  rightBarWidth: number;
  setRightBarWidth: (width: SettingsState['rightBarWidth']) => void;
  fieldNameEditable: boolean;
  setFieldNameEditable: (fieldNameEditable: SettingsState['fieldNameEditable']) => void;
  isInputReusable: boolean;
  setIsInputReusable: (inputReusable: SettingsState['isInputReusable']) => void;
  config: FieldsConfigsMap;
  setConfig: (config: FieldsConfigsMap) => void;
  selectedConditionId?: string;
  setSelectedConditionId: (id: string) => void;
  clearSelectedConditionId: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  formInputs: [],
  setFormInputs: (inputs) => {
    set({ formInputs: inputs });
  },
  clearFormInputs: () => {
    set({ formInputs: [] });
  },
  selectedFieldId: undefined,
  setSelectedFieldId: (id) => {
    set({ selectedFieldId: id, activeTab: 'field-settings' });
  },
  clearSelectedFieldId: () => {
    set({ selectedFieldId: undefined, activeTab: 'field-settings' });
  },
  mode: 'edit',
  setMode: (mode) => {
    set({
      mode,
      selectedFieldId: undefined,
    });
  },
  previewDevice: 'desktop',
  setPreviewDevice: (previewDevice) => {
    set({ previewDevice });
  },
  page: undefined,
  setPage: (page) => {
    set({ page });
  },
  clearPage: () => {
    set({ page: undefined });
  },
  activeTab: RIGHT_BAR_TABS.PAGE,
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  height: undefined,
  setHeight: (height) => {
    set({ height });
  },
  leftBarWidth: getStoredWidth('efie-left-bar-width', 320), // Default width in pixels (20rem = 320px)
  setLeftBarWidth: (leftBarWidth) => {
    setStoredWidth('efie-left-bar-width', leftBarWidth);
    set({ leftBarWidth });
  },
  rightBarWidth: getStoredWidth('efie-right-bar-width', 320), // Default width in pixels (20rem = 320px)
  setRightBarWidth: (rightBarWidth) => {
    setStoredWidth('efie-right-bar-width', rightBarWidth);
    set({ rightBarWidth });
  },
  fieldNameEditable: true,
  setFieldNameEditable: (fieldNameEditable) => {
    set({ fieldNameEditable });
  },
  isInputReusable: true,
  setIsInputReusable: (isInputReusable) => {
    set({ isInputReusable });
  },
  config: settingsConfig,
  setConfig: (config) => {
    set({ config });
  },
  selectedConditionId: undefined,
  setSelectedConditionId: (id) => {
    set({ selectedConditionId: id });
  },
  clearSelectedConditionId: () => {
    set({ selectedConditionId: undefined });
  },
}));
