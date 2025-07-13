import { PropSettingsTemplate } from '@efie-form/core';
import type { SettingsConfig } from '../../types/settings-config.type';
import PropsSettingsAccept from './property-settings/props-settings-accept';
import PropsSettingsFormKey from './property-settings/props-settings-form-key';
import PropsSettingsOptions from './property-settings/props-settings-options';
import PropsTemplateBoolean from './property-templates/props-template-boolean';
import PropsTemplateColor from './property-templates/props-template-color';
import PropsTemplateImageUrl from './property-templates/props-template-image-url';
import PropsTemplateNumber from './property-templates/props-template-number';
import PropsTemplateText from './property-templates/props-template-text';

interface CustomSettingsProps {
  fieldId: string;
  settings?: SettingsConfig[];
}

export default function CustomSettings({ fieldId, settings }: CustomSettingsProps) {
  return (
    <>
      {settings?.map(settings => (
        <></>
      ))}
    </>
  );
}

interface SettingsProps {
  settings: SettingsConfig;
  fieldId: string;
}

function SettingsType({ settings, fieldId }: SettingsProps) {
  const template = settings.type;
  switch (template) {
    case PropSettingsTemplate.TEXT: {
      return (
        <PropsTemplateText
          fieldId={fieldId}
          label={settings.label}
          template={settings.type}
          placeholder={settings.options?.placeholder}
          type={PropSettingsTemplate.TEXT}
        />
      );
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
    case 'image_url': {
      return <PropsTemplateImageUrl fieldId={fieldId} {...settings} />;
    }
    case 'accept': {
      return <PropsSettingsAccept fieldId={fieldId} {...settings} />;
    }
    case 'form_key': {
      return <PropsSettingsFormKey fieldId={fieldId} {...settings} />;
    }
    case 'options': {
      return <PropsSettingsOptions fieldId={fieldId} {...settings} />;
    }
    default: {
      return null;
    }
  }
}
