import type { CustomInputDef, FieldsConfigsMap } from '@efie-form/core';
import { create } from 'zustand';
import type { RightBarTab } from '../../constant';
import settingsConfig from './settings-config';

interface SettingsState {
  formInputs: CustomInputDef[];
  setFormInputs: (inputs: SettingsState['formInputs']) => void;
  clearFormInputs: () => void;
  selectedFieldId?: string;
  setSelectedFieldId: (id: string) => void;
  clearSelectedFieldId: () => void;
  mode: 'edit' | 'preview' | 'json';
  setMode: (mode: SettingsState['mode']) => void;
  previewDevice: 'desktop' | 'mobile';
  setPreviewDevice: (previewDevice: SettingsState['previewDevice']) => void;
  page?: string;
  setPage: (page: SettingsState['page']) => void;
  clearPage: () => void;
  activeTab: RightBarTab;
  setActiveTab: (tab: RightBarTab) => void;
  height?: number;
  setHeight: (height: SettingsState['height']) => void;
  fieldNameEditable: boolean;
  setFieldNameEditable: (fieldNameEditable: SettingsState['fieldNameEditable']) => void;
  isInputReusable: boolean;
  setIsInputReusable: (inputReusable: SettingsState['isInputReusable']) => void;
  config: FieldsConfigsMap;
  setConfig: (config: FieldsConfigsMap) => void;
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
  activeTab: 'form',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  height: undefined,
  setHeight: (height) => {
    set({ height });
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
}));
