import type { FormSchema } from '@efie-form/core';
import { ReactForm } from '@efie-form/react';
import ShortTextField from './fields/shortTextField.tsx';
import LongTextField from './fields/LongTextField.tsx';
import DividerField from './fields/DividerField.tsx';
import BlockField from './fields/BlockField.tsx';
import ColumnField from './fields/ColumnField.tsx';
import RowField from './fields/RowField.tsx';
import DateField from './fields/DateField.tsx';
import TimeField from './fields/TimeField.tsx';
import DateTimeField from './fields/DateTimeField.tsx';
import FileField from './fields/FileField.tsx';
import HeaderField from './fields/HeaderField.tsx';
import ImageField from './fields/ImageField.tsx';
import MultipleChoicesField from './fields/MultipleChoicesField.tsx';
import SingleChoiceField from './fields/SingleChoiceField.tsx';
import NumberField from './fields/NumberField.tsx';
import ParagraphField from './fields/ParagraphField.tsx';

interface FormProps {
  schema: FormSchema;
}

function Form({ schema }: FormProps) {
  console.log(schema);

  return (
    <div>
      <ReactForm
        schema={schema}
        shortText={ShortTextField}
        longText={LongTextField}
        block={BlockField}
        column={ColumnField}
        row={RowField}
        date={DateField}
        time={TimeField}
        dateTime={DateTimeField}
        divider={DividerField}
        file={FileField}
        header={HeaderField}
        image={ImageField}
        multipleChoices={MultipleChoicesField}
        singleChoice={SingleChoiceField}
        number={NumberField}
        paragraph={ParagraphField}
      />
    </div>
  );
}

export default Form;
