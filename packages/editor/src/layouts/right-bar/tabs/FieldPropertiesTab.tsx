import RenderSettings from '../RenderSettings.tsx';
import { useMemo } from 'react';
import findFieldById from '../../../lib/findFieldById.ts';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { useSettingsStore } from '../../../lib/state/settings.state.ts';

function FieldPropertiesTab() {
  const { getValues } = useFormContext<FormSchema>();
  const { selectedFieldId } = useSettingsStore();

  const field = useMemo(
    () => findFieldById(getValues('form.fields'), selectedFieldId),
    [selectedFieldId, getValues]
  );

  if (!field) return null;

  return (
    <>
      <RenderSettings field={field.field} fieldKey={field?.key} />
    </>
  );
}

export default FieldPropertiesTab;
