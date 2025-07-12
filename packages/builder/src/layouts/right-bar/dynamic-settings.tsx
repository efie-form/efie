import type { PropSettings } from '../../types/prop-settings.type';
import PropsSettingsAccept from './property-settings/props-settings-accept';
import PropsSettingsFormKey from './property-settings/props-settings-form-key';
import PropsSettingsOptions from './property-settings/props-settings-options';
import PropsTemplateBoolean from './property-templates/props-template-boolean';
import PropsTemplateColor from './property-templates/props-template-color';
import PropsTemplateImageUrl from './property-templates/props-template-image-url';
import PropsTemplateNumber from './property-templates/props-template-number';
import PropsTemplateText from './property-templates/props-template-text';
import { PropsTemplateSize } from './property-templates/props-template-size';
import PropsSettingsBorderRadius from './property-settings/props-settings-border-radius';
import PropsSettingsMargin from './property-settings/props-settings-margin';
import PropsSettingsPadding from './property-settings/props-settings-padding';
import PropsSettingsBoxShadow from './property-settings/props-settings-box-shadow';
import PropsSettingsSelect from './property-settings/props-settings-select';
import PropsSettingsButtonAction from './property-settings/props-settings-button-action';
import { PropSettingsTemplate } from '@efie-form/core';

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
      {settings?.length === 0 && (
        <div className="flex justify-center mt-4">
          <p className="typography-body2 text-neutral-600">
            No settings available for this field.
          </p>
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
    case PropSettingsTemplate.TEXT: {
      return <PropsTemplateText fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.NUMBER: {
      return <PropsTemplateNumber fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.BOOLEAN: {
      return <PropsTemplateBoolean fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.COLOR: {
      return <PropsTemplateColor fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.IMAGE_URL: {
      return <PropsTemplateImageUrl fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.ACCEPT: {
      return <PropsSettingsAccept fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.FORM_KEY: {
      return <PropsSettingsFormKey fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.OPTION: {
      return <PropsSettingsOptions fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.SIZE: {
      return <PropsTemplateSize fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.BORDER_RADIUS: {
      return <PropsSettingsBorderRadius fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.MARGIN: {
      return <PropsSettingsMargin fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.PADDING: {
      return <PropsSettingsPadding fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.BOX_SHADOW: {
      return <PropsSettingsBoxShadow fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.SELECT: {
      return <PropsSettingsSelect fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.BUTTON_ACTION: {
      return <PropsSettingsButtonAction fieldId={fieldId} {...settings} />;
    }
    default: {
      throw new Error(`Unknown template type: ${template}`);
    }
  }
}
