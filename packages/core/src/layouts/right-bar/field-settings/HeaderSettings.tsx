import type { FormFieldHeader } from '../../../../../core-old';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Select from '../../../components/form/Select.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import ColorPicker from '../../../components/form/ColorPicker.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import Number from '../../../components/form/Number.tsx';

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
        <SettingsFieldVertical label="Text align" divider>
          <Select
            value={field.props.textAlign}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.textAlign', value)
            }
            className="w-28"
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ]}
          />
        </SettingsFieldVertical>
        <SettingsFieldHorizontal label="Color" divider>
          <ColorPicker
            value={field.props.color}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.color', value)
            }
          />
        </SettingsFieldHorizontal>
      </div>
    </div>
  );
}

export default HeaderSettings;
