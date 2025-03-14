import type { FormFieldParagraph } from '../../../../types/formSchema.type.ts';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Select from '../../../components/form/Select';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import ColorPicker from '../../../components/form/ColorPicker';
import { useSchemaStore } from '../../../lib/state/schema.state';
import Number from '../../../components/form/Number';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup';

interface ParagraphSettingsProps {
  field: FormFieldParagraph;
}

function ParagraphSettings({ field }: ParagraphSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

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
        <ContainerSettingsGroup field={field} />
      </div>
    </div>
  );
}

export default ParagraphSettings;
