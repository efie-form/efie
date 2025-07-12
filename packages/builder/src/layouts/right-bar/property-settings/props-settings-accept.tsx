import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsAccept } from '../../../types/prop-settings.type';
import SettingsFieldSwitchWithDropdown from '../property-layouts/settings-field-switch-with-dropdown';
import { Switch } from '../../../components/form';
import { isAcceptValue, type AcceptProperty, type PropValue, type PropValueAccept } from '@efie-form/core';
import { useControllableState } from '../../../lib/hooks/use-controllable-state';

const FILE_EXTENSIONS = [
  { type: 'pdf', label: 'PDF', value: ['.pdf'] },
  { type: 'word', label: 'Word', value: ['.doc', '.docx'] },
  { type: 'excel', label: 'Excel', value: ['.xls', '.xlsx'] },
  { type: 'powerpoint', label: 'PowerPoint', value: ['.ppt', '.pptx'] },
  { type: 'images', label: 'Images', value: ['.jpg', '.jpeg', '.png', '.gif'] },
  { type: 'text', label: 'Text', value: ['.txt'] },
  { type: 'csv', label: 'CSV', value: ['.csv'] },
  { type: 'zip', label: 'ZIP', value: ['.zip'] },
  { type: 'audio', label: 'Audio', value: ['.mp3', '.wav', '.ogg'] },
  { type: 'video', label: 'Video', value: ['.mp4', '.mov', '.avi'] },
] as const;

type ExtensionType = typeof FILE_EXTENSIONS[number]['type'];

interface InternalValue {
  allowSpecific: boolean;
  extensions: Record<ExtensionType, boolean>;
}
interface PropsSettingsAcceptProps extends PropSettingsAccept {
  fieldId: string;
}

export default function PropsSettingsAccept({ fieldId, label = 'Only allow specific file types', type }: PropsSettingsAcceptProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, type));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);

  const [internalValue, setInternalValue] = useControllableState({
    defaultValue: getInternalValue(value),
    onChange: (newValue) => {
      const formats = Object.entries(newValue.extensions)
        .filter(ext => ext[1])
        .flatMap(([k]) => FILE_EXTENSIONS.find(ext => ext.type === k)?.value || []);

      const finalValue: PropValueAccept = {
        allowAll: !newValue.allowSpecific,
        formats: newValue.allowSpecific ? formats : [],
      };

      updateFieldProperty(fieldId, {
        type,
        value: finalValue,
      } as AcceptProperty);
    },
  });

  const handleExtensionChange = (type: ExtensionType, checked: boolean) => {
    setInternalValue(prev => ({
      ...prev,
      extensions: {
        ...prev.extensions,
        [type]: checked,
      },
    }));
  };

  const handleAllowAllChange = (checked: boolean) => {
    setInternalValue(prev => ({
      ...prev,
      allowSpecific: checked,
    }));
  };

  return (
    <SettingsFieldSwitchWithDropdown
      isOpen={internalValue.allowSpecific}
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
                checked={internalValue.extensions[extension.type]}
                onChange={(checked: boolean) => {
                  handleExtensionChange(extension.type, checked);
                }}
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

function getInternalValue(value?: PropValueAccept): InternalValue {
  const extTypes = {} as Record<ExtensionType, boolean>;
  if (!value) {
    for (const ext of FILE_EXTENSIONS) {
      extTypes[ext.type] = false;
    }
    return {
      allowSpecific: false,
      extensions: extTypes,
    };
  }

  for (const ext of FILE_EXTENSIONS) {
    extTypes[ext.type] = ext.value.every(format => value.formats?.includes(format)) || false;
  }
  return {
    allowSpecific: !value.allowAll,
    extensions: extTypes,
  };
}
