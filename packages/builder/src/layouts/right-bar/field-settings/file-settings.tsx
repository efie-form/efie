import { PropertyType, type FileFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';

interface FileSettingsProps {
  field: FileFormField;
}

function FileSettings({ field }: FileSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
          { template: 'number', label: 'Max Files', type: PropertyType.MAX_FILES, min: 1 },
          { template: 'accept', label: 'Accepted File Types', type: PropertyType.ACCEPT },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default FileSettings;
