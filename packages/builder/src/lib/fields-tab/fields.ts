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
} from 'react-icons/rx';
import { FaImage } from 'react-icons/fa6';
import { HiOutlineViewColumns } from 'react-icons/hi2';
import { FieldType } from '@efie-form/core';
import { FIELDS_NAME } from '../constant';

interface Field {
  type: FieldType;
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

export const fieldIcons: Record<FieldType, ElementType> = {
  [FieldType.SHORT_TEXT]: LuFormInput,
  [FieldType.LONG_TEXT]: BsTextareaResize,
  [FieldType.NUMBER]: LuHash,
  [FieldType.SINGLE_CHOICE]: MdRadioButtonChecked,
  [FieldType.MULTIPLE_CHOICES]: MdCheckBox,
  [FieldType.DATE]: LuCalendar,
  [FieldType.TIME]: LuClock,
  [FieldType.DATE_TIME]: LuCalendarClock,
  [FieldType.FILE]: MdUpload,
  [FieldType.BUTTON]: RxButton,
  [FieldType.DIVIDER]: RxDividerHorizontal,
  [FieldType.HEADER]: RiText,
  [FieldType.IMAGE]: FaImage,
  [FieldType.ROW]: HiOutlineViewColumns,
  [FieldType.BLOCK]: RiPageSeparator,
  [FieldType.COLUMN]: HiOutlineViewColumns,
  [FieldType.PAGE]: RiPageSeparator,
};

const inputsGroup: FieldsTabGroup = {
  id: 'input',
  label: 'Inputs',
  children: [
    {
      type: FieldType.SHORT_TEXT,
      label: FIELDS_NAME[FieldType.SHORT_TEXT],
      Icon: fieldIcons[FieldType.SHORT_TEXT],
    },
    {
      type: FieldType.LONG_TEXT,
      label: FIELDS_NAME[FieldType.LONG_TEXT],
      Icon: fieldIcons[FieldType.LONG_TEXT],
    },
    {
      type: FieldType.NUMBER,
      label: FIELDS_NAME[FieldType.NUMBER],
      Icon: fieldIcons[FieldType.NUMBER],
    },
    {
      type: FieldType.SINGLE_CHOICE,
      label: FIELDS_NAME[FieldType.SINGLE_CHOICE],
      Icon: fieldIcons[FieldType.SINGLE_CHOICE],
    },
    {
      type: FieldType.MULTIPLE_CHOICES,
      label: FIELDS_NAME[FieldType.MULTIPLE_CHOICES],
      Icon: fieldIcons[FieldType.MULTIPLE_CHOICES],
    },
    {
      type: FieldType.DATE,
      label: FIELDS_NAME[FieldType.DATE],
      Icon: fieldIcons[FieldType.DATE],
    },
    {
      type: FieldType.TIME,
      label: FIELDS_NAME[FieldType.TIME],
      Icon: fieldIcons[FieldType.TIME],
    },
    {
      type: FieldType.DATE_TIME,
      label: FIELDS_NAME[FieldType.DATE_TIME],
      Icon: fieldIcons[FieldType.DATE_TIME],
    },
    {
      type: FieldType.FILE,
      label: FIELDS_NAME[FieldType.FILE],
      Icon: fieldIcons[FieldType.FILE],
    },
  ],
};

const staticGroup: FieldsTabGroup = {
  id: 'static',
  label: 'Static',
  children: [
    {
      type: FieldType.BUTTON,
      label: FIELDS_NAME[FieldType.BUTTON],
      Icon: fieldIcons[FieldType.BUTTON],
    },
    {
      type: FieldType.DIVIDER,
      label: FIELDS_NAME[FieldType.DIVIDER],
      Icon: fieldIcons[FieldType.DIVIDER],
    },
    {
      type: FieldType.HEADER,
      label: FIELDS_NAME[FieldType.HEADER],
      Icon: fieldIcons[FieldType.HEADER],
    },
    {
      type: FieldType.IMAGE,
      label: FIELDS_NAME[FieldType.IMAGE],
      Icon: fieldIcons[FieldType.IMAGE],
    },
  ],
};

const layoutGroup: FieldsTabGroup = {
  id: 'layout',
  label: 'Layout',
  children: [
    {
      type: FieldType.ROW,
      label: FIELDS_NAME[FieldType.ROW],
      Icon: fieldIcons[FieldType.ROW],
    },
    {
      type: FieldType.BLOCK,
      label: FIELDS_NAME[FieldType.BLOCK],
      Icon: fieldIcons[FieldType.BLOCK],
    },
  ],
};

export const fieldGroup = {
  inputs: inputsGroup,
  static: staticGroup,
  layout: layoutGroup,
};
