import type { ElementType } from 'react';
import {
  LuCalendar,
  LuCalendarClock,
  LuClock,
  LuFormInput,
  LuHash,
} from 'react-icons/lu';
import { BsTextareaResize } from 'react-icons/bs';
import { RiPageSeparator, RiText } from 'react-icons/ri';
import { MdCheckBox, MdRadioButtonChecked, MdUpload } from 'react-icons/md';
import {
  RxButton,
  RxDividerHorizontal,
  RxTextAlignCenter,
} from 'react-icons/rx';
import { FaImage } from 'react-icons/fa6';
import { HiOutlineViewColumns } from 'react-icons/hi2';
import { FormFieldType } from '@efie-form/core';
import { FIELDS_NAME } from '../constant';

interface Field {
  type: FormFieldType;
  Icon: ElementType;
  label: string;
  disabled?: boolean;
  formKey?: string;
}

export interface FieldsTabGroup {
  id: string;
  label: string;
  children: Field[];
}

export const fieldIcons: Record<FormFieldType, ElementType> = {
  [FormFieldType.SHORT_TEXT]: LuFormInput,
  [FormFieldType.LONG_TEXT]: BsTextareaResize,
  [FormFieldType.NUMBER]: LuHash,
  [FormFieldType.SINGLE_CHOICE]: MdRadioButtonChecked,
  [FormFieldType.MULTIPLE_CHOICES]: MdCheckBox,
  [FormFieldType.DATE]: LuCalendar,
  [FormFieldType.TIME]: LuClock,
  [FormFieldType.DATE_TIME]: LuCalendarClock,
  [FormFieldType.FILE]: MdUpload,
  [FormFieldType.BUTTON]: RxButton,
  [FormFieldType.DIVIDER]: RxDividerHorizontal,
  [FormFieldType.HEADER]: RiText,
  [FormFieldType.PARAGRAPH]: RxTextAlignCenter,
  [FormFieldType.IMAGE]: FaImage,
  [FormFieldType.ROW]: HiOutlineViewColumns,
  [FormFieldType.BLOCK]: RiPageSeparator,
  [FormFieldType.COLUMN]: HiOutlineViewColumns,
  [FormFieldType.PAGE]: RiPageSeparator,
};

const inputsGroup: FieldsTabGroup = {
  id: 'input',
  label: 'Inputs',
  children: [
    {
      type: FormFieldType.SHORT_TEXT,
      label: FIELDS_NAME[FormFieldType.SHORT_TEXT],
      Icon: fieldIcons[FormFieldType.SHORT_TEXT],
    },
    {
      type: FormFieldType.LONG_TEXT,
      label: FIELDS_NAME[FormFieldType.LONG_TEXT],
      Icon: fieldIcons[FormFieldType.LONG_TEXT],
    },
    {
      type: FormFieldType.NUMBER,
      label: FIELDS_NAME[FormFieldType.NUMBER],
      Icon: fieldIcons[FormFieldType.NUMBER],
    },
    {
      type: FormFieldType.SINGLE_CHOICE,
      label: FIELDS_NAME[FormFieldType.SINGLE_CHOICE],
      Icon: fieldIcons[FormFieldType.SINGLE_CHOICE],
    },
    {
      type: FormFieldType.MULTIPLE_CHOICES,
      label: FIELDS_NAME[FormFieldType.MULTIPLE_CHOICES],
      Icon: fieldIcons[FormFieldType.MULTIPLE_CHOICES],
    },
    {
      type: FormFieldType.DATE,
      label: FIELDS_NAME[FormFieldType.DATE],
      Icon: fieldIcons[FormFieldType.DATE],
    },
    {
      type: FormFieldType.TIME,
      label: FIELDS_NAME[FormFieldType.TIME],
      Icon: fieldIcons[FormFieldType.TIME],
    },
    {
      type: FormFieldType.DATE_TIME,
      label: FIELDS_NAME[FormFieldType.DATE_TIME],
      Icon: fieldIcons[FormFieldType.DATE_TIME],
    },
    {
      type: FormFieldType.FILE,
      label: FIELDS_NAME[FormFieldType.FILE],
      Icon: fieldIcons[FormFieldType.FILE],
    },
  ],
};

const staticGroup: FieldsTabGroup = {
  id: 'static',
  label: 'Static',
  children: [
    {
      type: FormFieldType.BUTTON,
      label: FIELDS_NAME[FormFieldType.BUTTON],
      Icon: fieldIcons[FormFieldType.BUTTON],
    },
    {
      type: FormFieldType.DIVIDER,
      label: FIELDS_NAME[FormFieldType.DIVIDER],
      Icon: fieldIcons[FormFieldType.DIVIDER],
    },
    {
      type: FormFieldType.HEADER,
      label: FIELDS_NAME[FormFieldType.HEADER],
      Icon: fieldIcons[FormFieldType.HEADER],
    },
    {
      type: FormFieldType.PARAGRAPH,
      label: FIELDS_NAME[FormFieldType.PARAGRAPH],
      Icon: fieldIcons[FormFieldType.PARAGRAPH],
    },
    {
      type: FormFieldType.IMAGE,
      label: FIELDS_NAME[FormFieldType.IMAGE],
      Icon: fieldIcons[FormFieldType.IMAGE],
    },
  ],
};

const layoutGroup: FieldsTabGroup = {
  id: 'layout',
  label: 'Layout',
  children: [
    {
      type: FormFieldType.ROW,
      label: FIELDS_NAME[FormFieldType.ROW],
      Icon: fieldIcons[FormFieldType.ROW],
    },
    {
      type: FormFieldType.BLOCK,
      label: FIELDS_NAME[FormFieldType.BLOCK],
      Icon: fieldIcons[FormFieldType.BLOCK],
    },
  ],
};

export const fieldGroup = {
  inputs: inputsGroup,
  static: staticGroup,
  layout: layoutGroup,
};
