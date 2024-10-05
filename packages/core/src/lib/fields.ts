// type FieldType =
//   | 'short-text'
//   | 'long-text'
//   | 'number'
//   | 'single-choice'
//   | 'multiple-choice'
//   | 'date'
//   | 'time'
//   | 'datetime'
//   | 'uploader'
//   | 'button'
//   | 'divider'
//   | 'header'
//   | 'paragraph'
//   | 'image'
//   | 'video'
//   | 'columns'
//   | 'block'
//   | 'page';

import {ElementType} from 'react';
import {
  LuCalendar,
  LuCalendarClock,
  LuClock,
  LuFormInput,
  LuHash,
} from 'react-icons/lu';
import {BsTextareaResize} from 'react-icons/bs';
import {RiPageSeparator, RiText} from 'react-icons/ri';
import {MdCheckBox, MdRadioButtonChecked, MdUpload} from 'react-icons/md';
import {RxDividerHorizontal, RxTextAlignCenter} from 'react-icons/rx';
import {FaImage, FaVideo} from 'react-icons/fa6';
import {HiOutlineViewColumns} from 'react-icons/hi2';

interface Field {
  type: string;
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
    id: 'fields',
    label: 'Fields',
    children: [
      {
        type: 'short-text',
        label: 'Short Text',
        Icon: LuFormInput,
      },
      {
        type: 'long-text',
        label: 'Long Text',
        Icon: BsTextareaResize,
      },
      {
        type: 'number',
        label: 'Number',
        Icon: LuHash,
      },
      {
        type: 'single-choice',
        label: 'Single Choice',
        Icon: MdRadioButtonChecked,
      },
      {
        type: 'multiple-choice',
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
        type: 'datetime',
        label: 'Date & Time',
        Icon: LuCalendarClock,
      },
      {
        type: 'uploader',
        label: 'Uploader',
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
        type: 'columns',
        label: 'Columns',
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
