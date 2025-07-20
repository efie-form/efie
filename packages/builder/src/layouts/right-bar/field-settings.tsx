import { PropertyType, type FieldConfig } from '@efie-form/core';
import SystemSettingsLabel from './system-settings/system-settings-label';
import SystemSettingsPlaceholder from './system-settings/system-settings-placeholder';
import SystemSettingsRequired from './system-settings/system-settings.required';

interface FieldSettingsProps {
  config: FieldConfig[];
  fieldId: string;
}

export default function FieldSettings({ config, fieldId }: FieldSettingsProps) {
  return config.map((item) => {
    if (item.type === 'custom') {
      return <>{item.dataType}</>;
    }
    switch (item.type) {
      case PropertyType.LABEL: {
        return (
          <SystemSettingsLabel
            key={item.type}
            fieldId={fieldId}
            config={item}
          />
        );
      }
      case PropertyType.PLACEHOLDER: {
        return (
          <SystemSettingsPlaceholder
            key={item.type}
            fieldId={fieldId}
            config={item}
          />
        );
      }
      case PropertyType.REQUIRED: {
        return (
          <SystemSettingsRequired
            key={item.type}
            fieldId={fieldId}
            config={item}
          />
        );
      }
    }
  });
}
