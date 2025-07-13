import { create } from 'zustand';
import defaultSchema from '../../default-schema';
import type { CustomInputDef } from '@efie-form/core';
import type { FieldConfig } from '../../../types/field-settings.type';
import type { RightBarTab } from '../../constant';

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
  config: FieldConfig;
  setConfig: (config: FieldConfig) => void;
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
  config: {
    block: {
      settings: [
        {
          id: 'padding',
          label: 'Padding',
          type: 'padding',
          defaultValue: {
            bottom: { type: 'length', value: 0, unit: 'px' },
            left: { type: 'length', value: 0, unit: 'px' },
            right: { type: 'length', value: 0, unit: 'px' },
            top: { type: 'length', value: 0, unit: 'px',
            },
          },
        },
      ],
    },
    heading: {
      formats: {
        blockquote: true,
        bulletList: true,
        code: true,
        codeBlock: true,
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        link: true,
        superscript: true,
        align: true,
        subscript: true,
        list: {
          ordered: true,
          bullet: true,
        },
        heading: {
          options: [
            { level: 0, label: 'Paragraph' },
            { level: 1, label: 'Heading 1' },
            { level: 2, label: 'Heading 2' },
            { level: 3, label: 'Heading 3' },
            { level: 4, label: 'Heading 4' },
            { level: 5, label: 'Heading 5' },
            { level: 6, label: 'Heading 6' },
          ],
          default: 0,
        },
        fontSize: {
          options: [
            { label: 'Small', size: '0.875rem' },
            { label: 'Medium', size: '1rem' },
            { label: 'Large', size: '2rem' },
            { label: 'Extra Large', size: '3rem' },
          ],
          default: { label: 'Medium', size: '1rem' },
        },
      },
    } },
  setConfig: (config) => {
    set({ config });
  },
}));
