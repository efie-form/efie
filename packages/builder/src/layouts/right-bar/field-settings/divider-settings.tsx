import { PropertyType, type DividerFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface DividerSettingsProps {
  field: DividerFormField;
}

function DividerSettings({ field }: DividerSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[
          { template: 'size', type: PropertyType.WIDTH, label: 'Width' },
          { template: 'size', type: PropertyType.HEIGHT, label: 'Height' },
          { template: 'color', type: PropertyType.COLOR, label: 'Color' },
          { template: 'select', type: PropertyType.BORDER_STYLE, label: 'Border Style', options: [
            { value: 'solid', label: 'Solid' },
            { value: 'dashed', label: 'Dashed' },
            { value: 'dotted', label: 'Dotted' },
            { value: 'double', label: 'Double' },
            { value: 'groove', label: 'Groove' },
            { value: 'ridge', label: 'Ridge' },
            { value: 'inset', label: 'Inset' },
            { value: 'outset', label: 'Outset' },
          ] },
        ]}
      />
    </div>
  );
}

export default DividerSettings;
