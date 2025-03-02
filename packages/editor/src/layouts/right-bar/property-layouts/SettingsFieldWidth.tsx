import Switch from '../../../components/form/Switch.tsx';
import Slider from '../../../components/form/Slider.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import type { FormField } from '@efie-form/core';

interface SettingsFieldWidthProps {
  label: string;
  divider?: boolean;
  field: FormField;
}

function SettingsFieldWidth({
  label,
  divider,
  field,
}: SettingsFieldWidthProps) {
  const { updateFieldProps } = useSchemaStore();

  if (
    !('props' in field) ||
    !('width' in field.props) ||
    typeof field.props.width !== 'object'
  )
    return null;
  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="typography-body4 text-neutral-800">Auto Width</p>
            <Switch
              checked={field.props.width.autoWidth}
              onChange={(value) =>
                updateFieldProps(field.id, 'props.width.autoWidth', value)
              }
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <div className="flex items-center gap-2">
            <Slider
              value={field.props.width.value}
              onChange={(value) =>
                updateFieldProps(field.id, 'props.width.value', value)
              }
              min={0}
              max={100}
              step={1}
              disabled={field.props.width.autoWidth}
            />
            <p className="typography-body3 text-neutral-800">
              {field.props.width.value}%
            </p>
          </div>
        </div>
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldWidth;
