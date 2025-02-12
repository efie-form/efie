import type { FormFieldImage } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Input from '../../../components/form/Input.tsx';
import Select from '../../../components/form/Select.tsx';
import SettingsFieldWidth from '../property-layouts/SettingsFieldWidth.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup.tsx';
interface ImageSettingsProps {
  field: FormFieldImage;
}

function ImageSettings({ field }: ImageSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
          Common
        </div>

        <SettingsFieldVertical label="Image Link" divider>
          <Input
            onChange={(value) => updateFieldProps(field.id, 'props.src', value)}
            value={field.props.src}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Alternate Name" divider>
          <Input
            onChange={(value) => updateFieldProps(field.id, 'props.alt', value)}
            value={field.props.alt}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Align" divider>
          <Select
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ]}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.textAlign', value)
            }
            value={field.props.textAlign}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Object Fit" divider>
          <Select
            options={[
              { label: 'Fill', value: 'fill' },
              { label: 'Contain', value: 'contain' },
              { label: 'Cover', value: 'cover' },
              { label: 'None', value: 'none' },
              { label: 'Scale Down', value: 'scale-down' },
            ]}
            onChange={(value) =>
              updateFieldProps(field.id, 'props.objectFit', value)
            }
            value={field.props.objectFit}
          />
        </SettingsFieldVertical>
        <SettingsFieldWidth field={field} label="Width" divider />
        <ContainerSettingsGroup field={field} />
      </div>
    </div>
  );
}

export default ImageSettings;
