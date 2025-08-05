import { FieldType } from '@efie-form/react';
import type { MenuItem } from '../components/sidebar';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'form-builder', label: 'Form Builder', icon: '📝' },
  { id: 'templates', label: 'Templates', icon: '📋' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export const FORM_INPUTS = [
  {
    id: 'long_text',
    label: 'Short Text',
    type: FieldType.SHORT_TEXT,
  },
  {
    id: 'multiple_choices',
    label: 'Long Text',
    type: FieldType.LONG_TEXT,
  },
  {
    id: 'fd123',
    label: 'Number',
    type: FieldType.NUMBER,
  },
];
