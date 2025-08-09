import { FieldType, type FormField } from '@efie-form/core';
import { useSettingsStore } from '../../lib/state/settings.state';
import FieldSettings from './field-settings';
import RowSettings from './field-settings/row-settings';
import FieldNameSettings from './settings/form-name-settings';

interface RenderSettingsProps {
  field: FormField;
}

function RenderSettings({ field }: RenderSettingsProps) {
  if (!field) return null;

  switch (field?.type) {
    case FieldType.NUMBER:
    case FieldType.SHORT_TEXT:
    case FieldType.SINGLE_CHOICE:
    case FieldType.TIME:
    case FieldType.MULTIPLE_CHOICES:
    case FieldType.DATE_TIME:
    case FieldType.LONG_TEXT:
    case FieldType.FILE:
    case FieldType.CHECKBOX:
    case FieldType.DATE: {
      return <InputSettings field={field} />;
    }
    case FieldType.ROW: {
      return <RowSettings field={field} />;
    }
    default: {
      return <SharedSettings field={field} fieldType={field.type} />;
    }
  }
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
      <FieldSettings fieldId={field.id} config={config.properties} />
    </div>
  );
}

function InputSettings({ field }: { field: FormField }) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <FieldNameSettings fieldId={field.id} />
      <FieldSettings fieldId={field.id} config={config.properties} />
    </div>
  );
}
