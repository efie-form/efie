import type { PropSettings } from '../../types/prop-settings.type';
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
        <div>
          {settings.label}
          {' '}
          (Boolean Input)
        </div>
      );
    }
  }
}
