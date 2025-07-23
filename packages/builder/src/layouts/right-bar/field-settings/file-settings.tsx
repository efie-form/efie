import { type FileFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface FileSettingsProps {
  field: FileFormField;
}

function FileSettings({ field }: FileSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'number', label: 'Max Files', type: PropertyType.MAX_FILES, min: 1 },
          { template: 'accept', label: 'Accepted File Types', type: PropertyType.ACCEPT },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default FileSettings;
