import type { FormFieldHeader } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Select from '../../../components/form/Select';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import ColorPicker from '../../../components/form/ColorPicker';
import { useSchemaStore } from '../../../lib/state/schema.state';
import Number from '../../../components/form/Number';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsColor from '../property-settings/PropSettingsColor';

interface HeaderSettingsProps {
  field: FormFieldHeader;
}

function HeaderSettings({ field }: HeaderSettingsProps) {
  const { getFieldKeyById, updateFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <SettingsFieldVertical label="Font Size" divider>
          <Number
            value={field.props.font.size}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.font.size', value)
            }
            className="w-28"
            suffix="px"
            suffixType="text"
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Tag" divider>
          <Select
            value={field.props.tag}
            onChange={(value) => updateFieldProps(field.id, 'props.tag', value)}
            className="w-28"
            options={[
              { label: 'H1', value: 'h1' },
              { label: 'H2', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'H4', value: 'h4' },
              { label: 'H5', value: 'h5' },
              { label: 'H6', value: 'h6' },
            ]}
          />
        </SettingsFieldVertical>
        <PropSettingsTextAlign field={field} />
        <PropSettingsColor field={field} />
      </div>
    </div>
  );
}

export default HeaderSettings;
