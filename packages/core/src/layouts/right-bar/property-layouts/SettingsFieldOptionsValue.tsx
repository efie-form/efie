import Switch from '../../../components/form/Switch.tsx';
import Input from '../../../components/form/Input.tsx';
import type {
  FormFieldMultipleChoices,
  FormFieldSingleChoice,
} from '../../../../../core-old';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface SettingsFieldOptionsValueProps {
  label: string;
  divider?: boolean;
  field: FormFieldSingleChoice | FormFieldMultipleChoices;
}

function SettingsFieldOptionsValue({
  label,
  divider,
  field,
}: SettingsFieldOptionsValueProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <>
      <div className="px-4 py-3.5" key={`${field.id}-options-value-property`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Switch
              checked={field.props.isValueDifferent}
              onChange={(value) => {
                updateFieldProps(field.id, 'props.isValueDifferent', value);
                if (!value) {
                  updateFieldProps(
                    field.id,
                    'props.options',
                    field.props.options.map((option) => ({
                      ...option,
                      value: option.label,
                    }))
                  );
                }
              }}
            />
          </div>
        </div>
        {field.props.isValueDifferent && (
          <div className="mt-5">
            <div className="flex flex-col gap-3">
              {field.props.options.map((option, index) => (
                <div key={index} className="flex items-center w-full">
                  <div className="w-1/3 pe-2">
                    <p className="typography-body4 whitespace-nowrap truncate">
                      {option.label}
                    </p>
                  </div>
                  <div className="w-2/3">
                    <Input
                      value={option.value}
                      onChange={(value) =>
                        updateFieldProps(
                          field.id,
                          `props.options.${index}.value`,
                          value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
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
