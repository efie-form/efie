import type { FormFieldDivider } from '@lib/types/formSchema.type.ts';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Select from '@form-builder/components/form/Select';
import ColorPicker from '@form-builder/components/form/ColorPicker';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import Slider from '@form-builder/components/form/Slider';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import Number from '../../../components/form/Number.tsx';

interface DividerSettingsProps {
  field: FormFieldDivider;
}

function DividerSettings({ field }: DividerSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <SettingsFieldVertical label="Width" divider>
          <div className="flex gap-4">
            <Slider
              value={field.props.width}
              onChange={(value) =>
                updateFieldProps(field.id, 'props.width', value)
              }
              min={0}
              max={100}
              step={1}
            />
            <p className="typography-body3 text-neutral-700">
              {field.props.width}%
            </p>
          </div>
        </SettingsFieldVertical>

        <SettingsFieldVertical label="Height" divider>
          <Number
            value={field.props.height}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.height', value)
            }
            className="w-28"
            suffix="px"
            suffixType="text"
            inputProps={{
              min: 0,
            }}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Style" divider>
          <Select
            options={[
              { label: 'Solid', value: 'solid' },
              { label: 'Dashed', value: 'dashed' },
              { label: 'Dotted', value: 'dotted' },
            ]}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.style', value)
            }
            value={field.props.style}
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

export default DividerSettings;
