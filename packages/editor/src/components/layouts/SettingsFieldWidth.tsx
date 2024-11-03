import Switch from '../form/Switch.tsx';
import { Controller, useWatch } from 'react-hook-form';
import Slider from '../form/Slider.tsx';

interface SettingsFieldWidthProps {
  fieldKey: string;
  label: string;
  divider?: boolean;
}

function SettingsFieldWidth({
  label,
  fieldKey,
  divider,
}: SettingsFieldWidthProps) {
  const isAutoWidth = useWatch({
    name: `${fieldKey}.props.width.autoWidth`,
  });
  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="typography-body4 text-neutral-800">Auto Width</p>
            <Controller
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
              name={`${fieldKey}.props.width.autoWidth`}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Controller
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center gap-2">
                <Slider
                  value={value}
                  onChange={onChange}
                  min={0}
                  max={100}
                  step={1}
                  disabled={isAutoWidth}
                />
                <p className="typography-body3 text-neutral-800">{value}%</p>
              </div>
            )}
            name={`${fieldKey}.props.width.value`}
          />
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
