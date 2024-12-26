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
import type { FormFieldType } from '@efie-form/core';
import { FIELDS_NAME } from './constant.ts';

interface Field {
  type: FormFieldType;
  Icon: ElementType;
  label: string;
  disabled?: boolean;
}

interface FieldGroup {
  id: string;
  label: string;
  children: Field[];
}

export const fieldIcons: Record<FormFieldType, ElementType> = {
  shortText: LuFormInput,
  longText: BsTextareaResize,
  number: LuHash,
  singleChoice: MdRadioButtonChecked,
  multipleChoices: MdCheckBox,
  date: LuCalendar,
  time: LuClock,
  dateTime: LuCalendarClock,
  file: MdUpload,
  button: RxButton,
  divider: RxDividerHorizontal,
  header: RiText,
  paragraph: RxTextAlignCenter,
  image: FaImage,
  row: HiOutlineViewColumns,
  block: RiPageSeparator,
  column: HiOutlineViewColumns,
  page: RiPageSeparator,
};

export const fieldGroup: FieldGroup[] = [
  {
    id: 'input',
    label: 'Inputs',
    children: [
      {
        type: 'shortText',
        label: FIELDS_NAME.shortText,
        Icon: fieldIcons.shortText,
      },
      {
        type: 'longText',
        label: FIELDS_NAME.longText,
        Icon: fieldIcons.longText,
      },
      {
        type: 'number',
        label: FIELDS_NAME.number,
        Icon: fieldIcons.number,
      },
      {
        type: 'singleChoice',
        label: FIELDS_NAME.singleChoice,
        Icon: fieldIcons.singleChoice,
      },
      {
        type: 'multipleChoices',
        label: FIELDS_NAME.multipleChoices,
        Icon: fieldIcons.multipleChoices,
      },
      {
        type: 'date',
        label: FIELDS_NAME.date,
        Icon: fieldIcons.date,
      },
      {
        type: 'time',
        label: FIELDS_NAME.time,
        Icon: fieldIcons.time,
      },
      {
        type: 'dateTime',
        label: FIELDS_NAME.dateTime,
        Icon: fieldIcons.dateTime,
      },
      {
        type: 'file',
        label: FIELDS_NAME.file,
        Icon: fieldIcons.file,
      },
    ],
  },
  {
    id: 'static',
    label: 'Static',
    children: [
      {
        type: 'button',
        label: FIELDS_NAME.button,
        Icon: fieldIcons.button,
      },
      {
        type: 'divider',
        label: FIELDS_NAME.divider,
        Icon: fieldIcons.divider,
      },
      {
        type: 'header',
        label: FIELDS_NAME.header,
        Icon: fieldIcons.header,
      },
      {
        type: 'paragraph',
        label: FIELDS_NAME.paragraph,
        Icon: fieldIcons.paragraph,
      },
      {
        type: 'image',
        label: FIELDS_NAME.image,
        Icon: fieldIcons.image,
      },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    children: [
      {
        type: 'row',
        label: FIELDS_NAME.row,
        Icon: fieldIcons.row,
      },
      {
        type: 'block',
        label: FIELDS_NAME.block,
        Icon: fieldIcons.block,
      },
    ],
  },
];
