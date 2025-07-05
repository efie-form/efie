import { PropertyType, type ImageFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';
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
          { template: 'imageUrl', type: PropertyType.SRC, label: 'Image URL', placeholder: 'https://example.com/image.jpg' },
          { template: 'text', type: PropertyType.ALT, label: 'Alt Text', placeholder: 'Enter alt text for the image' },
        ]}
      />
    </div>
  );
}

export default ImageSettings;
