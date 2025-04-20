import { ReactForm } from '@efie-form/react';
import { sampleSchema } from './sample-schema';
import ShortTextField from './components/fields/shortTextField';
import LongTextField from './components/fields/LongTextField';
import DividerField from './components/fields/DividerField';
import BlockField from './components/fields/BlockField';
import ColumnField from './components/fields/ColumnField';
import RowField from './components/fields/RowField';
import DateField from './components/fields/DateField';
import TimeField from './components/fields/TimeField';
import DateTimeField from './components/fields/DateTimeField';
import FileField from './components/fields/FileField';
import HeaderField from './components/fields/HeaderField';
import ImageField from './components/fields/ImageField';
import MultipleChoicesField from './components/fields/MultipleChoicesField';
import SingleChoiceField from './components/fields/SingleChoiceField';
import NumberField from './components/fields/NumberField';
import ParagraphField from './components/fields/ParagraphField';
import PageField from './components/fields/PageField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ButtonField from './components/fields/ButtonField';
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
