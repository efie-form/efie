import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import {
  PropertyType,
  type AcceptProperty,
  type FormField,
} from '@efie-form/core';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import Switch from '../../../components/form/Switch';

interface PropSettingsAcceptProps {
  field: FormField;
}

const defaultAccept: AcceptProperty = {
  type: PropertyType.ACCEPT,
  value: [],
};

const FILE_EXTENSIONS = [
  { label: 'PDF', value: ['.pdf'] },
  { label: 'Word', value: ['.doc', '.docx'] },
  { label: 'Excel', value: ['.xls', '.xlsx'] },
  { label: 'PowerPoint', value: ['.ppt', '.pptx'] },
  { label: 'Images', value: ['.jpg', '.jpeg', '.png', '.gif'] },
  { label: 'Text', value: ['.txt'] },
  { label: 'CSV', value: ['.csv'] },
  { label: 'ZIP', value: ['.zip'] },
  { label: 'Audio', value: ['.mp3', '.wav', '.ogg'] },
  { label: 'Video', value: ['.mp4', '.mov', '.avi'] },
];

export default function PropSettingsAccept({ field }: PropSettingsAcceptProps) {
  const { updateFieldProps, getFieldProps } = useSchemaStore();
  const acceptProp = getFieldProps(field.id, PropertyType.ACCEPT);
  const [accept, setAccept] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.ACCEPT, value);
    },
    defaultValue: acceptProp || defaultAccept,
  });

  const handleExtensionChange = (extensions: string[], checked: boolean) => {
    const currentExtensions = accept.value.filter(Boolean);
    const newExtensions = checked
      ? [...currentExtensions, ...extensions]
      : currentExtensions.filter((ext) => !extensions.includes(ext));

    setAccept((prev) => ({
      ...prev,
      value: newExtensions,
    }));
  };

  return (
    <SettingsFieldVertical label="Accept" divider>
      <div className="grid grid-cols-2">
        {FILE_EXTENSIONS.map((extension) => (
          <div
            key={extension.label}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <div>
              <Switch
                checked={extension.value.some((ext) =>
                  accept.value.includes(ext)
                )}
                onChange={(checked: boolean) =>
                  handleExtensionChange(extension.value, checked)
                }
              />
            </div>
            <span className="typography-body3 text-neutral-600">
              {extension.label}
            </span>
          </div>
        ))}
      </div>
    </SettingsFieldVertical>
  );
}
