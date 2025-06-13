import type { PropSettings } from '../../types/prop-settings.type';
import PropsSettingsAccept from './property-settings-2/props-settings-accept';
import PropsSettingsFormKey from './property-settings-2/props-settings-form-key';
import PropsSettingsOptions from './property-settings-2/props-settings-options';
import PropsTemplateBoolean from './property-templates/props-template-boolean';
import PropsTemplateColor from './property-templates/props-template-color';
import PropsTemplateImageUrl from './property-templates/props-template-image-url';
import PropsTemplateNumber from './property-templates/props-template-number';
import PropsTemplateText from './property-templates/props-template-text';
import { PropsTemplateSize } from './property-templates/props-template-size';
import PropsSettingsBorderRadius from './property-settings-2/props-settings-border-radius';
import PropsSettingsMargin from './property-settings-2/props-settings-margin';

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
      return <PropsTemplateText fieldId={fieldId} {...settings} />;
    }
    case 'number': {
      return <PropsTemplateNumber fieldId={fieldId} {...settings} />;
    }
    case 'boolean': {
      return <PropsTemplateBoolean fieldId={fieldId} {...settings} />;
    }
    case 'color': {
      return <PropsTemplateColor fieldId={fieldId} {...settings} />;
    }
    case 'imageUrl': {
      return <PropsTemplateImageUrl fieldId={fieldId} {...settings} />;
    }
    case 'accept': {
      return <PropsSettingsAccept fieldId={fieldId} {...settings} />;
    }
    case 'formKey': {
      return <PropsSettingsFormKey fieldId={fieldId} {...settings} />;
    }
    case 'option': {
      return <PropsSettingsOptions fieldId={fieldId} {...settings} />;
    }
    case 'size': {
      return <PropsTemplateSize fieldId={fieldId} {...settings} />;
    }
    case 'borderRadius': {
      return <PropsSettingsBorderRadius fieldId={fieldId} {...settings} />;
    }
    case 'margin': {
      return <PropsSettingsMargin fieldId={fieldId} {...settings} />;
    }
  }
}
