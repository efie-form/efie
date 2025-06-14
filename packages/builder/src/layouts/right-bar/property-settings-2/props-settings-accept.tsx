import { useCallback, useRef } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsAccept } from '../../../types/prop-settings.type';
import SettingsFieldSwitchWithDropdown from '../property-layouts/SettingsFieldSwitchWithDropdown';
import { Switch } from '../../../components/form';
import { isAcceptValue, type AcceptProperty, type PropValue, type PropValueAccept } from '@efie-form/core';

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

interface PropsSettingsAcceptProps extends PropSettingsAccept {
  fieldId: string;
}

export default function PropsSettingsAccept({ fieldId, label = 'Only allow specific file types', type }: PropsSettingsAcceptProps) {
  const fieldProperty = useSchemaStore(useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);
  const prevFormats = useRef(value.formats);

  const handleExtensionChange = useCallback(
    (extensions: string[], checked: boolean) => {
      const currentExtensions = value.formats || [];
      const newExtensions = checked
        ? [...currentExtensions, ...extensions]
        : currentExtensions.filter(ext => !extensions.includes(ext));

      updateFieldProperty(fieldId, {
        type,
        value: {
          ...value,
          formats: newExtensions,
          allowAll: newExtensions.length === FILE_EXTENSIONS.flatMap(ext => ext.value).length,
        },
      } as AcceptProperty);
    },
    [fieldId, type, value, updateFieldProperty],
  );

  const handleAllowAllChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        prevFormats.current = value.formats;
      }
      updateFieldProperty(fieldId, {
        type,
        value: {
          ...value,
          allowAll: !checked,
          formats: checked ? prevFormats.current || [] : [],
        },
      } as AcceptProperty);
    },
    [fieldId, type, value, updateFieldProperty],
  );

  return (
    <SettingsFieldSwitchWithDropdown
      isOpen={!value.allowAll}
      onOpenChange={handleAllowAllChange}
      label={label}
      divider
    >
      <div className="grid grid-cols-2">
        {FILE_EXTENSIONS.map(extension => (
          <div
            key={extension.label}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <div>
              <Switch
                checked={extension.value.some(ext =>
                  value.formats?.includes(ext),
                )}
                onChange={(checked: boolean) =>
                  handleExtensionChange(extension.value, checked)}
              />
            </div>
            <span className="typography-body3 text-neutral-600">
              {extension.label}
            </span>
          </div>
        ))}
      </div>
    </SettingsFieldSwitchWithDropdown>
  );
}

function getValue(value?: PropValue): PropValueAccept {
  if (!isAcceptValue(value)) {
    return { formats: [], allowAll: false };
  }

  return value;
}
