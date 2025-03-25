import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

export default function PropSettingsAccept() {
  const { updateFieldProps } = useSchemaStore();

  return (
    <SettingsFieldHorizontal label="Accept" divider>
        
    </SettingsFieldHorizontal>
  );
}
