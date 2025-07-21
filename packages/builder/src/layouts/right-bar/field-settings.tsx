import { CustomPropertyType, PropertyType, type FieldConfig } from '@efie-form/core';
import SystemSettingsLabel from './system-settings/system-settings-label';
import SystemSettingsPlaceholder from './system-settings/system-settings-placeholder';
import SystemSettingsRequired from './system-settings/system-settings.required';
import CustomSettingsText from './custom-settings/custom-settings-text';
import CustomSettingsBoolean from './custom-settings/custom-settings-boolean';
import CustomSettingsColor from './custom-settings/custom-settings-color';
import CustomSettingsNumber from './custom-settings/custom-settings-number';
import CustomSettingsSelect from './custom-settings/custom-settings-select';

interface FieldSettingsProps {
  config: FieldConfig[];
  fieldId: string;
}

export default function FieldSettings({ config, fieldId }: FieldSettingsProps) {
  return config.map((item) => {
    if (item.type === 'custom') {
      switch (item.dataType) {
        case CustomPropertyType.BOOLEAN: {
          return (
            <CustomSettingsBoolean
              key={item.id}
              fieldId={fieldId}
              config={item}
            />
          );
        }

        case CustomPropertyType.TEXT: {
          return (
            <CustomSettingsText
              key={item.id}
              fieldId={fieldId}
              config={item}
            />
          );
        }

        case CustomPropertyType.COLOR: {
          return (
            <CustomSettingsColor
              key={item.id}
              fieldId={fieldId}
              config={item}
            />
          );
        }

        case CustomPropertyType.NUMBER: {
          return (
            <CustomSettingsNumber
              key={item.id}
              fieldId={fieldId}
              config={item}
            />
          );
        }

        case CustomPropertyType.SELECT: {
          return (
            <CustomSettingsSelect
              key={item.id}
              fieldId={fieldId}
              config={item}
            />
          );
        }

        default: {
          break;
        }
      }
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
