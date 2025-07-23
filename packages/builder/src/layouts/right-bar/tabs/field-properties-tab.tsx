import { FieldType } from '@efie-form/core';
import { HiX } from 'react-icons/hi';
import { LuCornerLeftUp } from 'react-icons/lu';
import Tooltip from '../../../components/elements/tooltip';
import { FIELDS_NAME } from '../../../lib/constant';
import getSettingsParentField from '../../../lib/get-selectable-parent-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { RIGHT_BAR_TABS, useSettingsStore } from '../../../lib/state/settings.state';
import RenderSettings from '../render-settings';

function FieldPropertiesTab() {
  const { selectedFieldId, clearSelectedFieldId, setActiveTab, setSelectedFieldId } =
    useSettingsStore();
  const { getFieldById } = useSchemaStore();

  const field = getFieldById(selectedFieldId);

  const handleGoToParent = () => {
    if (!selectedFieldId) return;
    const parentField = getSettingsParentField(selectedFieldId);
    if (!parentField) return;

    if (parentField.type === FieldType.PAGE) {
      clearSelectedFieldId();
      setActiveTab(RIGHT_BAR_TABS.PAGE);
    } else {
      setSelectedFieldId(parentField.id);
      setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
    }
  };

  if (!field) return <></>;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between border-neutral-100 border-b">
        <div className="flex items-center gap-1 px-2">
          <Tooltip content="Go to parent">
            <button type="button" className="p-1 text-neutral-700" onClick={handleGoToParent}>
              <LuCornerLeftUp className="size-3.5" />
            </button>
          </Tooltip>
          <p className="typography-body1 font-medium text-neutral-700">{FIELDS_NAME[field.type]}</p>
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
