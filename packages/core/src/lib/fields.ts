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
import type { FormFieldType } from '../types/formSchema.ts';

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
        label: 'Short Text',
        Icon: LuFormInput,
      },
      {
        type: 'longText',
        label: 'Long Text',
        Icon: BsTextareaResize,
      },
      {
        type: 'number',
        label: 'Number',
        Icon: LuHash,
      },
      {
        type: 'singleChoice',
        label: 'Single Choice',
        Icon: MdRadioButtonChecked,
      },
      {
        type: 'multipleChoice',
        label: 'Multiple Choice',
        Icon: MdCheckBox,
      },
      {
        type: 'date',
        label: 'Date',
        Icon: LuCalendar,
      },
      {
        type: 'time',
        label: 'Time',
        Icon: LuClock,
      },
      {
        type: 'dateTime',
        label: 'Date & Time',
        Icon: LuCalendarClock,
      },
      {
        type: 'file',
        label: 'File Upload',
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
        label: 'Divider',
        Icon: RxDividerHorizontal,
      },
      {
        type: 'header',
        label: 'Header',
        Icon: RiText,
      },
      {
        type: 'paragraph',
        label: 'Paragraph',
        Icon: RxTextAlignCenter,
      },
      {
        type: 'image',
        label: 'Image',
        Icon: FaImage,
      },
      {
        type: 'video',
        label: 'Video',
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
        label: 'Row',
        Icon: HiOutlineViewColumns,
      },
      {
        type: 'block',
        label: 'Block',
        Icon: RiPageSeparator,
      },
    ],
  },
];
