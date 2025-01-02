import Switch from '../../../components/form/Switch.tsx';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '../../../components/form/Input.tsx';
import type { FormSchema } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import genFieldKey from '../../../lib/genFieldKey.ts';

interface SettingsFieldOptionsValueProps {
  label: string;
  divider?: boolean;
  fieldKey: FieldKeyPrefix;
}

function SettingsFieldOptionsValue({
  label,
  divider,
  fieldKey,
}: SettingsFieldOptionsValueProps) {
  const { watch, control } = useFormContext<FormSchema>();

  return (
    <>
      <div className="px-4 py-3.5" key={`${fieldKey}-options-value-property`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Controller
              key={`${fieldKey}.props.isValueDifferent`}
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
              name={`${fieldKey}.props.isValueDifferent`}
            />
          </div>
        </div>
        {watch(genFieldKey(fieldKey, 'props.isValueDifferent')) && (
          <div className="mt-5">
            <div className="flex flex-col gap-3">
              <Controller
                render={({ field: { value } }) => (
                  <>
                    {value.map((option, index) => (
                      <div className="flex items-center w-full">
                        <div className="w-1/3 pe-2">
                          <p className="typography-body4 whitespace-nowrap truncate">
                            {option.label}
                          </p>
                        </div>
                        <div className="w-2/3">
                          <Controller
                            render={({ field: { value, onChange } }) => (
                              <Input value={value} onChange={onChange} />
                            )}
                            name={genFieldKey(
                              fieldKey,
                              `props.options.${index}.value`
                            )}
                            control={control}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
                name={genFieldKey(fieldKey, 'props.options')}
                control={control}
              />
            </div>
          </div>
        )}
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldOptionsValue;
