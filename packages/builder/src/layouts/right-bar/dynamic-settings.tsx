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
import { getColorObject, isAcceptValue, isBooleanValue, isBorderRadiusValue, isBoxShadowValue, isButtonActionValue, isColorValue, isMarginValue, isOptionsValue, isSizeValue, isStringValue, PropSettingsTemplate, SizeType, type PropertyDefinition, type PropValue } from '@efie-form/core';
import { useSchemaStore } from '../../lib/state/schema.state';

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
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, settings.type));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  const handleUpdate = (newValue: PropValue) => {
    updateFieldProperty(fieldId, {
      type: settings.type,
      value: newValue,
    } as PropertyDefinition);
  };

  switch (template) {
    case PropSettingsTemplate.TEXT: {
      return (
        <PropsTemplateText
          label={settings.label}
          placeholder={settings.placeholder}
          value={isStringValue(fieldProperty?.value) ? fieldProperty.value : ''}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.NUMBER: {
      return (
        <PropsTemplateNumber
          label={settings.label}
          placeholder={settings.placeholder}
          value={isStringValue(fieldProperty?.value) ? Number.parseFloat(fieldProperty.value) : undefined}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.BOOLEAN: {
      return (
        <PropsTemplateBoolean
          label={settings.label}
          value={isBooleanValue(fieldProperty?.value) ? fieldProperty.value : false}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.COLOR: {
      const colorValue = isColorValue(fieldProperty?.value)
        ? fieldProperty.value
        : getColorObject('#000000'); // Default black color
      return (
        <PropsTemplateColor
          label={settings.label}
          value={colorValue}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.IMAGE_URL: {
      return (
        <PropsTemplateImageUrl
          label={settings.label}
          placeholder={settings.placeholder}
          value={isStringValue(fieldProperty?.value) ? fieldProperty.value : ''}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.ACCEPT: {
      return (
        <PropsSettingsAccept
          value={isAcceptValue(fieldProperty?.value) ? fieldProperty.value : { formats: [], allowAll: false }}
          onChange={handleUpdate}
          label={settings.label}
        />
      );
    }
    case PropSettingsTemplate.FORM_KEY: {
      return <PropsSettingsFormKey fieldId={fieldId} {...settings} />;
    }
    case PropSettingsTemplate.OPTIONS: {
      return (
        <PropsSettingsOptions
          label={settings.label}
          value={isOptionsValue(fieldProperty?.value) ? fieldProperty.value : []}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.SIZE: {
      const sizeValue = isSizeValue(fieldProperty?.value)
        ? fieldProperty.value
        : { type: 'auto' as const };
      return (
        <PropsTemplateSize
          label={settings.label}
          value={sizeValue}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.BORDER_RADIUS: {
      return (
        <PropsSettingsBorderRadius
          value={isBorderRadiusValue(fieldProperty?.value)
            ? fieldProperty.value
            : {
                topLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                topRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                bottomLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                bottomRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
              }}
          onChange={handleUpdate}
          label={settings.label}
        />
      );
    }
    case PropSettingsTemplate.MARGIN: {
      return (
        <PropsSettingsMargin
          label={settings.label}
          value={isMarginValue(fieldProperty?.value)
            ? fieldProperty.value
            : {
                top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                bottom: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
              }}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.PADDING: {
      return (
        <PropsSettingsPadding
          label={settings.label}
          onChange={handleUpdate}
          value={isMarginValue(fieldProperty?.value)
            ? fieldProperty.value
            : {
                top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                bottom: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
              }}
        />
      );
    }
    case PropSettingsTemplate.BOX_SHADOW: {
      return (
        <PropsSettingsBoxShadow
          label={settings.label}
          value={isBoxShadowValue(fieldProperty?.value) ? fieldProperty.value : []}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.SELECT: {
      return (
        <PropsSettingsSelect
          label={settings.label}
          value={isStringValue(fieldProperty?.value) ? fieldProperty.value : ''}
          options={settings.options || []}
          onChange={handleUpdate}
        />
      );
    }
    case PropSettingsTemplate.BUTTON_ACTION: {
      return (
        <PropsSettingsButtonAction
          label={settings.label}
          value={isButtonActionValue(fieldProperty?.value) ? fieldProperty.value : { action: 'submit' }}
          onChange={handleUpdate}
        />
      );
    }
    default: {
      throw new Error(`Unknown template type: ${template}`);
    }
  }
}
