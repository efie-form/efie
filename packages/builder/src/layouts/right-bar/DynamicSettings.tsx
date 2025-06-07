import type { PropSettings } from '../../types/prop-settings.type';
import PropsSettingsFormKey from './property-settings-2/props-settings-form-key';
import PropsSettingsOptions from './property-settings-2/props-settings-options';
import PropsTemplateBoolean from './property-templates/props-template-boolean';
import PropsTemplateText from './property-templates/props-template-text';

interface DynamicSettingsProps {
  settings?: PropSettings[];
  fieldId: string;
}

export default function DynamicSettings({ settings, fieldId }: DynamicSettingsProps) {
  return (
    <>
      {settings?.map((setting, index) => {
        return (
          <DynamicSettingsType
            key={index}
            settings={setting}
            fieldId={fieldId}
          />
        );
      })}
    </>
  );
}

interface DynamicSettingsTypeProps {
  settings: PropSettings;
  fieldId: string;
}

function DynamicSettingsType({ settings, fieldId }: DynamicSettingsTypeProps) {
  switch (settings.template) {
    case 'text': {
      return (
        <PropsTemplateText
          fieldId={fieldId}
          {...settings}
        />
      );
    }
    case 'number': {
      return (
        <div>
          {settings.label}
          {' '}
          (Number Input)
        </div>
      );
    }
    case 'boolean': {
      return (
        <PropsTemplateBoolean
          fieldId={fieldId}
          {...settings}
        />
      );
    }
    case 'formKey': {
      return (
        <PropsSettingsFormKey
          fieldId={fieldId}
          {...settings}
        />
      );
    }
    case 'option': {
      return (
        <PropsSettingsOptions
          fieldId={fieldId}
          {...settings}
        />
      );
    }
  }
}
