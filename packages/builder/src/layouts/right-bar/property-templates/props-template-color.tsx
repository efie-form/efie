import { useCallback } from 'react';
import { ColorPicker } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsColor } from '../../../types/prop-settings.type';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

interface PropsTemplateColorProps extends PropSettingsColor {
  fieldId: string;
}

export default function PropsTemplateColor({ fieldId, label, type }: PropsTemplateColorProps) {
  const fieldProperty = useSchemaStore(
    useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  const handleChange = (newColor) => {
    updateFieldProperty(fieldId, {
      ...fieldProperty,
      value: newColor,
    });
  };

  return (
    <SettingsFieldHorizontal label="Background Color" divider>
      <ColorPicker
        value={bgColor?.value}
        onChange={(newColor) => {
          setBgColor(prev => ({
            ...prev,
            value: newColor,
          }));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
