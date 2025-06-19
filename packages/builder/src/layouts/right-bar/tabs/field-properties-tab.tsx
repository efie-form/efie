import RenderSettings from '../render-settings';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../../lib/state/settings.state';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { FIELDS_NAME } from '../../../lib/constant';
import { HiX } from 'react-icons/hi';
import { LuCornerLeftUp } from 'react-icons/lu';
import Tooltip from '../../../components/elements/tooltip';
import getSettingsParentField from '../../../lib/get-selectable-parent-field';
import { FieldType } from '@efie-form/core';

function FieldPropertiesTab() {
  const {
    selectedFieldId,
    clearSelectedFieldId,
    setActiveTab,
    setSelectedFieldId,
  } = useSettingsStore();
  const { getFieldById } = useSchemaStore();

  const field = getFieldById(selectedFieldId);

  const handleGoToParent = () => {
    if (!selectedFieldId) return;
    const parentField = getSettingsParentField(selectedFieldId);
    if (!parentField) return;

    if (parentField.type === FieldType.PAGE) {
      clearSelectedFieldId();
      setActiveTab(RIGHT_BAR_TABS.PAGE);
    }
    else {
      setSelectedFieldId(parentField.id);
      setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
    }
  };

  if (!field) return <></>;

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-1 px-2">
          <Tooltip content="Go to parent">
            <button className="text-neutral-700 p-1" onClick={handleGoToParent}>
              <LuCornerLeftUp className="size-3.5" />
            </button>
          </Tooltip>
          <p className="typography-body1 font-medium text-neutral-700">
            {FIELDS_NAME[field.type]}
          </p>
        </div>
        <button
          className="border-s border-neutral-100 px-2 py-2 hover:bg-neutral-100 transition-all"
          onClick={() => {
            clearSelectedFieldId();
            setActiveTab(RIGHT_BAR_TABS.PAGE);
          }}
        >
          <HiX />
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <RenderSettings field={field} />
        </div>
      </div>
    </div>
  );
}

export default FieldPropertiesTab;
