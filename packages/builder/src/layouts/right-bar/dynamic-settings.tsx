import type { PropSettings } from '../../types/prop-settings.type';
import PropsSettingsAccept from './property-settings/props-settings-accept';
import PropsSettingsBorderRadius from './property-settings/props-settings-border-radius';
import PropsSettingsBoxShadow from './property-settings/props-settings-box-shadow';
import PropsSettingsButtonAction from './property-settings/props-settings-button-action';
import PropsSettingsFormKey from './property-settings/props-settings-form-key';
import PropsSettingsMargin from './property-settings/props-settings-margin';
import PropsSettingsOptions from './property-settings/props-settings-options';
import PropsSettingsPadding from './property-settings/props-settings-padding';
import PropsSettingsSelect from './property-settings/props-settings-select';
import PropsTemplateBoolean from './property-templates/props-template-boolean';
import PropsTemplateColor from './property-templates/props-template-color';
import PropsTemplateImageUrl from './property-templates/props-template-image-url';
import PropsTemplateNumber from './property-templates/props-template-number';
import { PropsTemplateSize } from './property-templates/props-template-size';
import PropsTemplateText from './property-templates/props-template-text';

interface DynamicSettingsProps {
  settings?: PropSettings[];
  fieldId: string;
}

export default function DynamicSettings({ settings, fieldId }: DynamicSettingsProps) {
  return (
    <>
      {settings?.map((setting, index) => {
        return <DynamicSettingsType key={index} settings={setting} fieldId={fieldId} />;
      })}
      {settings?.length === 0 && (
        <div className="mt-4 flex justify-center">
          <p className="typography-body2 text-neutral-600">No settings available for this field.</p>
        </div>
      )}
    </>
  );
}

interface DynamicSettingsTypeProps {
  settings: PropSettings;
  fieldId: string;
}

function DynamicSettingsType({ settings, fieldId }: DynamicSettingsTypeProps) {
  const template = settings.template;
  switch (template) {
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
    case 'padding': {
      return <PropsSettingsPadding fieldId={fieldId} {...settings} />;
    }
    case 'boxShadow': {
      return <PropsSettingsBoxShadow fieldId={fieldId} {...settings} />;
    }
    case 'select': {
      return <PropsSettingsSelect fieldId={fieldId} {...settings} />;
    }
    case 'buttonAction': {
      return <PropsSettingsButtonAction fieldId={fieldId} {...settings} />;
    }
    default: {
      throw new Error(`Unknown template type: ${template}`);
    }
  }
}
