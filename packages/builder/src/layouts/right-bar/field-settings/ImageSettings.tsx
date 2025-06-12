import { PropertyType, type ImageFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsObjectFit from '../property-settings/PropSettingsObjectFit';
import DynamicSettings from '../DynamicSettings';
interface ImageSettingsProps {
  field: ImageFormField;
}

function ImageSettings({ field }: ImageSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
          Common
        </div>
        <DynamicSettings
          fieldId={field.id}
          settings={[
            { template: 'imageUrl', type: PropertyType.SRC, label: 'Image URL', placeholder: 'https://example.com/image.jpg' },
            { template: 'text', type: PropertyType.ALT, label: 'Alt Text', placeholder: 'Enter alt text for the image' },
            { template: 'size', type: PropertyType.WIDTH, label: 'Width' },
          ]}
        />
        <PropSettingsTextAlign field={field} />
        <PropSettingsObjectFit field={field} />
      </div>
    </div>
  );
}

export default ImageSettings;
