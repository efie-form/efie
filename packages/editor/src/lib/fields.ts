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
import { RxDividerHorizontal, RxTextAlignCenter } from 'react-icons/rx';
import { FaImage, FaVideo } from 'react-icons/fa6';
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

export const fieldGroup: FieldGroup[] = [
  {
    id: 'input',
    label: 'Inputs',
    children: [
      {
        type: 'shortText',
        label: FIELDS_NAME.shortText,
        Icon: LuFormInput,
      },
      {
        type: 'longText',
        label: FIELDS_NAME.longText,
        Icon: BsTextareaResize,
      },
      {
        type: 'number',
        label: FIELDS_NAME.number,
        Icon: LuHash,
      },
      {
        type: 'singleChoice',
        label: FIELDS_NAME.singleChoice,
        Icon: MdRadioButtonChecked,
      },
      {
        type: 'multipleChoices',
        label: FIELDS_NAME.multipleChoices,
        Icon: MdCheckBox,
      },
      {
        type: 'date',
        label: FIELDS_NAME.date,
        Icon: LuCalendar,
      },
      {
        type: 'time',
        label: FIELDS_NAME.time,
        Icon: LuClock,
      },
      {
        type: 'dateTime',
        label: FIELDS_NAME.dateTime,
        Icon: LuCalendarClock,
      },
      {
        type: 'file',
        label: FIELDS_NAME.file,
        Icon: MdUpload,
      },
    ],
  },
  {
    id: 'static',
    label: 'Static',
    children: [
      {
        type: 'divider',
        label: FIELDS_NAME.divider,
        Icon: RxDividerHorizontal,
      },
      {
        type: 'header',
        label: FIELDS_NAME.header,
        Icon: RiText,
      },
      {
        type: 'paragraph',
        label: FIELDS_NAME.paragraph,
        Icon: RxTextAlignCenter,
      },
      {
        type: 'image',
        label: FIELDS_NAME.image,
        Icon: FaImage,
      },
      {
        type: 'video',
        label: FIELDS_NAME.video,
        Icon: FaVideo,
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
        Icon: HiOutlineViewColumns,
      },
      {
        type: 'block',
        label: FIELDS_NAME.block,
        Icon: RiPageSeparator,
      },
    ],
  },
];
