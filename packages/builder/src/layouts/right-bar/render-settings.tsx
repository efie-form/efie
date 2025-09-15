import { FieldType, type FormField, isFieldOfTypes } from '@efie-form/core';
import { useSettingsStore } from '../../lib/state/settings.state';
import FieldSettings from './field-settings';
import RowSettings from './field-settings/row-settings';
import FieldNameSettings from './settings/form-name-settings';

interface RenderSettingsProps {
  field: FormField;
}

function RenderSettings({ field }: RenderSettingsProps) {
  if (!field) return null;

  if (isFieldOfTypes(field, FieldType.ROW)) {
    return <RowSettings field={field} />;
  }

  if (
    isFieldOfTypes(
      field,
      FieldType.NUMBER,
      FieldType.SHORT_TEXT,
      FieldType.SINGLE_CHOICE,
      FieldType.TIME,
      FieldType.MULTIPLE_CHOICES,
      FieldType.DATE_TIME,
      FieldType.LONG_TEXT,
      FieldType.FILE,
      FieldType.CHECKBOX,
      FieldType.DATE,
    )
  ) {
    return <InputSettings field={field} />;
  }

  return <SharedSettings field={field} fieldType={field.sys.type} />;
}

export default RenderSettings;

interface SharedSettingsProps {
  field: FormField;
  fieldType: (typeof FieldType)[keyof typeof FieldType];
}

function SharedSettings({ field, fieldType }: SharedSettingsProps) {
  const config = useSettingsStore((state) => state.config[fieldType]);

  return (
    <div>
      <FieldSettings fieldId={field.sys.id} config={config.properties} />
    </div>
  );
}

function InputSettings({ field }: { field: FormField }) {
  const config = useSettingsStore((state) => state.config[field.sys.type]);

  return (
    <div>
      <FieldNameSettings fieldId={field.sys.id} />
      <FieldSettings fieldId={field.sys.id} config={config.properties} />
    </div>
  );
}
