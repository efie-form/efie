import { type ImageFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface ImageSettingsProps {
  field: ImageFormField;
}

function ImageSettings({ field }: ImageSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          {
            template: 'imageUrl',
            type: PropertyType.SRC,
            label: 'Image URL',
            placeholder: 'https://example.com/image.jpg',
          },
          {
            template: 'text',
            type: PropertyType.ALT,
            label: 'Alt Text',
            placeholder: 'Enter alt text for the image',
          },
        ]}
      />
    </div>
  );
}

export default ImageSettings;
