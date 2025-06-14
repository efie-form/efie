import { PropertyType, type ImageFormField } from '@efie-form/core';
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
            { template: 'select', type: PropertyType.TEXT_ALIGN, label: 'Text Alignment', options: [
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' },
            ] },
            { template: 'select', type: PropertyType.OBJECT_FIT, label: 'Object Fit', options: [
              { value: 'fill', label: 'Fill' },
              { value: 'contain', label: 'Contain' },
              { value: 'cover', label: 'Cover' },
              { value: 'none', label: 'None' },
              { value: 'scale-down', label: 'Scale Down' },
            ] },
          ]}
        />
      </div>
    </div>
  );
}

export default ImageSettings;
