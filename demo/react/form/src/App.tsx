import { ReactForm } from '@efie-form/react';
import { sampleSchema } from './sample-schema.ts';
import ShortTextField from './components/fields/shortTextField.tsx';
import LongTextField from './components/fields/LongTextField.tsx';
import DividerField from './components/fields/DividerField.tsx';
import BlockField from './components/fields/BlockField.tsx';
import ColumnField from './components/fields/ColumnField.tsx';
import RowField from './components/fields/RowField.tsx';
import DateField from './components/fields/DateField.tsx';
import TimeField from './components/fields/TimeField.tsx';
import DateTimeField from './components/fields/DateTimeField.tsx';
import FileField from './components/fields/FileField.tsx';
import HeaderField from './components/fields/HeaderField.tsx';
import ImageField from './components/fields/ImageField.tsx';
import MultipleChoicesField from './components/fields/MultipleChoicesField.tsx';
import SingleChoiceField from './components/fields/SingleChoiceField.tsx';
import NumberField from './components/fields/NumberField.tsx';
import ParagraphField from './components/fields/ParagraphField.tsx';
import PageField from './components/fields/PageField.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ButtonField from './components/fields/ButtonField.tsx';

function App() {
  return (
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
  );
}

export default App;
