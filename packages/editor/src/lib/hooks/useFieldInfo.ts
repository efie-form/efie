import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import findFieldById from '../findFieldById.ts';

interface UseFieldInfoProps {
  fieldId: string;
}

function useFieldInfo({ fieldId }: UseFieldInfoProps) {
  const { getValues } = useFormContext<FormSchema>();

  return findFieldById(getValues('form.fields'), fieldId);
}

export default useFieldInfo;
