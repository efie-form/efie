import RenderSettings from '../RenderSettings.tsx';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { RIGHT_BAR_TABS, useSettingsStore } from '../../../lib/state/settings.state.ts';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import { HiX } from 'react-icons/hi';

function FieldPropertiesTab() {
  const { selectedFieldId, clearSelectedFieldId, setActiveTab } =
    useSettingsStore();
  const { getFieldById } = useSchemaStore();

  const field = getFieldById(selectedFieldId);

  if (!field) return null;

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-100">
        <p className="typography-body1 font-medium text-neutral-700 ps-3">
          {FIELDS_NAME[field.type]}
        </p>
        <button
          className="border-s border-neutral-100 px-2 py-2 hover:bg-neutral-100 transition-all"
          onClick={() => {
            clearSelectedFieldId();
            setActiveTab(RIGHT_BAR_TABS.LAYOUT);
          }}
        >
          <HiX />
        </button>
      </div>
      <RenderSettings field={field} />
    </>
  );
}

export default FieldPropertiesTab;
