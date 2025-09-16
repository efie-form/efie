import { FieldType } from '@efie-form/core';
import { HiX } from 'react-icons/hi';
import { LuCornerLeftUp } from 'react-icons/lu';
import EditableText from '../../../components/elements/editable-text';
import Tooltip from '../../../components/elements/tooltip';
import { RIGHT_BAR_TABS } from '../../../lib/constant';
import getSettingsParentField from '../../../lib/get-selectable-parent-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import RenderSettings from '../render-settings';

function FieldPropertiesTab() {
  const { selectedFieldId, clearSelectedFieldId, setActiveTab, setSelectedFieldId } =
    useSettingsStore();
  const { getFieldById, renameField } = useSchemaStore();

  const field = getFieldById(selectedFieldId);

  const handleGoToParent = () => {
    if (!selectedFieldId) return;
    const parentField = getSettingsParentField(selectedFieldId);
    if (!parentField) return;

    if (parentField.sys.type === FieldType.PAGE) {
      clearSelectedFieldId();
      setActiveTab(RIGHT_BAR_TABS.PAGE);
    } else {
      setSelectedFieldId(parentField.sys.id);
      setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
    }
  };

  if (!field) return null;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between border-neutral-100 border-b">
        <div className="flex items-center gap-1 px-2">
          <Tooltip content="Go to parent">
            <button type="button" className="p-1 text-neutral-700" onClick={handleGoToParent}>
              <LuCornerLeftUp className="size-3.5" />
            </button>
          </Tooltip>
          <EditableText
            className="typography-body1 font-medium text-neutral-700"
            defaultValue={field.sys.name}
            onSave={(newName) => {
              renameField(field.sys.id, newName);
            }}
            inputClassName="typography-body1 font-medium text-neutral-700"
            fallback="Untitled field"
          />
        </div>
        <button
          type="button"
          className="border-neutral-100 border-s px-2 py-2 transition-all hover:bg-neutral-100"
          onClick={() => {
            clearSelectedFieldId();
            setActiveTab(RIGHT_BAR_TABS.PAGE);
          }}
        >
          <HiX />
        </button>
      </div>
      <div className="min-h-0 flex-1">
        <div className="h-full overflow-y-auto">
          <RenderSettings field={field} />
        </div>
      </div>
    </div>
  );
}

export default FieldPropertiesTab;
