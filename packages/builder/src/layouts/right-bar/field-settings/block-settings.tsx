import { PropertyType, type BlockFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface BlockSettingsProps {
  field: BlockFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: 'color', label: 'Background Color', type: PropertyType.BACKGROUND_COLOR },
          { template: 'color', label: 'Text Color', type: PropertyType.COLOR },
          { template: 'borderRadius', label: 'Border Radius', type: PropertyType.BORDER_RADIUS },
          { template: 'margin', label: 'Margin', type: PropertyType.MARGIN },
          { template: 'padding', label: 'Padding', type: PropertyType.PADDING },
          { template: 'boxShadow', label: 'Box Shadow', type: PropertyType.BOX_SHADOW },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default BlockSettings;
