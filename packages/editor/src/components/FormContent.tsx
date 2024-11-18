import useDropZone from '../lib/hooks/useDropZone.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import RenderField from './RenderField.tsx';
import { useSettingsStore } from '../lib/state/settings.state.ts';
import {
  RIGHT_BAR_TABS,
  useRightBarState,
} from '../lib/state/right-bar.state.ts';

const SCREEN_SIZES = {
  mobile: 375,
  desktop: 768,
};

function FormContent() {
  const dropZoneProps = useDropZone();
  const { watch } = useFormContext<FormSchema>();
  const { setSelectedFieldId, mode } = useSettingsStore();
  const setActiveTab = useRightBarState((state) => state.setActiveTab);

  return (
    <div
      className="min-h-full pb-64"
      {...dropZoneProps}
      onClick={() => {
        setSelectedFieldId(null);
        setActiveTab(RIGHT_BAR_TABS.LAYOUT);
      }}
    >
      <div className="p-4">
        <div
          className="bg-white min-h-20 rounded-lg p-4 w-full mx-auto transition-all"
          style={{
            maxWidth: SCREEN_SIZES[mode],
          }}
        >
          {watch('form.fields').map((field) => (
            <RenderField field={field} key={field.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormContent;
