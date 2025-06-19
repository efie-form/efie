import { ReactForm } from '@efie-form/react';
import { sampleSchema } from './sample-schema';
import ShortTextField from './components/fields/short-text-field';
import LongTextField from './components/fields/long-text-field';
import DividerField from './components/fields/divider-field';
import BlockField from './components/fields/block-field';
import ColumnField from './components/fields/column-field';
import RowField from './components/fields/row-field';
import DateField from './components/fields/date-field';
import TimeField from './components/fields/time-field';
import DateTimeField from './components/fields/date-time-field';
import FileField from './components/fields/file-field';
import HeaderField from './components/fields/header-field';
import ImageField from './components/fields/image-field';
import MultipleChoicesField from './components/fields/multiple-choices-field';
import SingleChoiceField from './components/fields/single-choice-field';
import NumberField from './components/fields/number-field';
import ParagraphField from './components/fields/paragraph-field';
import PageField from './components/fields/page-field';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ButtonField from './components/fields/button-field';
import { FormProvider, useForm } from 'react-hook-form';

function App() {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormProvider {...methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReactForm
            schema={sampleSchema}
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
            page={PageField}
            button={ButtonField}
          />
        </LocalizationProvider>
      </FormProvider>
    </form>
  );
}

const onSave = (data: Record<string, unknown>) => {
  console.log(data);
};

export default App;
