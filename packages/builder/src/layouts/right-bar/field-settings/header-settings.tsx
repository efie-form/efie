import { PropertyType, type HeaderFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface HeaderSettingsProps {
  field: HeaderFormField;
}

function HeaderSettings({ field }: HeaderSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: 'color', type: PropertyType.COLOR, label: 'Text Color' },
          { template: 'size', type: PropertyType.FONT_SIZE, label: 'Font Size' },
          { template: 'select', type: PropertyType.TEXT_ALIGN, label: 'Text Alignment', options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ] },
          { template: 'select', type: PropertyType.TAG, label: 'Tag', options: [
            { value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
            { value: 'h4', label: 'H4' },
            { value: 'h5', label: 'H5' },
            { value: 'h6', label: 'H6' },
          ] },
        ]}
      />
    </div>
  );
}

export default HeaderSettings;
