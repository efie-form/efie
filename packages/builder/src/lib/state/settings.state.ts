import { create } from 'zustand';
import defaultSchema from '../default-schema';
import type { CustomInputDef } from '@efie-form/core';

export const RIGHT_BAR_TABS = {
  PAGE: 'page',
  FORM: 'form',
  FIELD_SETTINGS: 'field-settings',
} as const;

export type RightBarTab = (typeof RIGHT_BAR_TABS)[keyof typeof RIGHT_BAR_TABS];

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
  formKeyEditable: boolean;
  setFormKeyEditable: (
    formKeyEditable: SettingsState['formKeyEditable']
  ) => void;
  isInputReusable: boolean;
  setIsInputReusable: (inputReusable: SettingsState['isInputReusable']) => void;
}

export const useSettingsStore = create<SettingsState>(set => ({
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
      // switching mode while a field is selected will throw error when switching back to edit mode
      // TODO: find a solution to prevent this
      selectedFieldId: undefined,
    });
  },
  previewDevice: 'desktop',
  setPreviewDevice: (previewDevice) => {
    set({ previewDevice });
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
  height: undefined,
  setHeight: (height) => {
    set({ height });
  },
  formKeyEditable: true,
  setFormKeyEditable: (formKeyEditable) => {
    set({ formKeyEditable });
  },
  isInputReusable: true,
  setIsInputReusable: (isInputReusable) => {
    set({ isInputReusable });
  },
}));
