import { CustomPropertyType, type FieldConfig, PropertyType } from '@efie-form/core';
import CustomSettingsBoolean from './custom-settings/custom-settings-boolean';
import CustomSettingsColor from './custom-settings/custom-settings-color';
import CustomSettingsNumber from './custom-settings/custom-settings-number';
import CustomSettingsSelect from './custom-settings/custom-settings-select';
import CustomSettingsSize from './custom-settings/custom-settings-size';
import CustomSettingsText from './custom-settings/custom-settings-text';
import SystemSettingsRequired from './system-settings/system-settings.required';
import SystemSettingsAccept from './system-settings/system-settings-accept';
import SystemSettingsButtonAction from './system-settings/system-settings-button-action';
import { SystemSettingsColumnWidth } from './system-settings/system-settings-column-width';
import SystemSettingsFieldName from './system-settings/system-settings-field-name';
import SystemSettingsImageSrc from './system-settings/system-settings-image-src';
import SystemSettingsLabel from './system-settings/system-settings-label';
import SystemSettingsOptions from './system-settings/system-settings-options';
import SystemSettingsPlaceholder from './system-settings/system-settings-placeholder';

interface FieldSettingsProps {
  config: FieldConfig[];
  fieldId: string;
}

export default function FieldSettings({
  config,
  fieldId,
}: FieldSettingsProps): (JSX.Element | never)[] {
  return config.map((item) => {
    if (item.type === 'custom') {
      switch (item.dataType) {
        case CustomPropertyType.BOOLEAN: {
          return <CustomSettingsBoolean key={item.id} fieldId={fieldId} config={item} />;
        }

        case CustomPropertyType.TEXT: {
          return <CustomSettingsText key={item.id} fieldId={fieldId} config={item} />;
        }

        case CustomPropertyType.COLOR: {
          return <CustomSettingsColor key={item.id} fieldId={fieldId} config={item} />;
        }

        case CustomPropertyType.NUMBER: {
          return <CustomSettingsNumber key={item.id} fieldId={fieldId} config={item} />;
        }

        case CustomPropertyType.SELECT: {
          return <CustomSettingsSelect key={item.id} fieldId={fieldId} config={item} />;
        }

        case CustomPropertyType.SIZE: {
          return <CustomSettingsSize key={item.id} fieldId={fieldId} config={item} />;
        }
        default: {
          return item;
        }
      }
    }
    switch (item.type) {
      case PropertyType.LABEL: {
        return <SystemSettingsLabel key={item.type} fieldId={fieldId} config={item} />;
      }
      case PropertyType.PLACEHOLDER: {
        return <SystemSettingsPlaceholder key={item.type} fieldId={fieldId} config={item} />;
      }
      case PropertyType.REQUIRED: {
        return <SystemSettingsRequired key={item.type} fieldId={fieldId} config={item} />;
      }

      case PropertyType.OPTIONS: {
        return <SystemSettingsOptions key={item.type} fieldId={fieldId} config={item} />;
      }

      case PropertyType.IMAGE_SRC: {
        return <SystemSettingsImageSrc key={item.type} fieldId={fieldId} config={item} />;
      }

      case PropertyType.COLUMN_WIDTH: {
        return <SystemSettingsColumnWidth key={item.type} fieldId={fieldId} config={item} />;
      }

      case PropertyType.ACCEPT: {
        return <SystemSettingsAccept key={item.type} fieldId={fieldId} config={item} />;
      }

      case PropertyType.BUTTON_ACTION: {
        return <SystemSettingsButtonAction key={item.type} fieldId={fieldId} config={item} />;
      }
      case PropertyType.FIELD_NAME: {
        return <SystemSettingsFieldName key={item.type} fieldId={fieldId} config={item} />;
      }
      default: {
        return item;
      }
    }
  });
}
