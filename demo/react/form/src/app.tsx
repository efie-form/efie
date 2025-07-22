import { ReactForm } from '@efie-form/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProvider, useForm } from 'react-hook-form';
import BlockField from './components/fields/block-field';
import ButtonField from './components/fields/button-field';
import ColumnField from './components/fields/column-field';
import DateField from './components/fields/date-field';
import DateTimeField from './components/fields/date-time-field';
import DividerField from './components/fields/divider-field';
import FileField from './components/fields/file-field';
import HeadingField from './components/fields/heading-field';
import ImageField from './components/fields/image-field';
import LongTextField from './components/fields/long-text-field';
import MultipleChoicesField from './components/fields/multiple-choices-field';
import NumberField from './components/fields/number-field';
import PageField from './components/fields/page-field';
import RowField from './components/fields/row-field';
import ShortTextField from './components/fields/short-text-field';
import SingleChoiceField from './components/fields/single-choice-field';
import TimeField from './components/fields/time-field';
import { sampleSchema } from './sample-schema';

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
            heading={HeadingField}
            image={ImageField}
            multipleChoices={MultipleChoicesField}
            singleChoice={SingleChoiceField}
            number={NumberField}
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
