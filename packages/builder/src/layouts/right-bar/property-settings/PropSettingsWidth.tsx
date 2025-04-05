import {
  PropertyType,
  SizeUnit,
  type FormField,
  type WidthProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import Slider from '../../../components/form/Slider';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Switch } from '../../../components/form';
import { getFieldProp } from '../../../lib/utils';

const defaultWidth: WidthProperty = {
  type: PropertyType.WIDTH,
  value: {
    value: 100,
    unit: SizeUnit.PERCENT,
  },
  autoWidth: true,
};

interface PropSettingsWidthProps {
  field: FormField;
}

export default function PropSettingsWidth({ field }: PropSettingsWidthProps) {
  const { updateFieldProps } = useSchemaStore();
  const widthProp = getFieldProp(field, PropertyType.WIDTH);
  const [width, setWidth] = useControllableState({
    defaultValue: widthProp || defaultWidth,
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.WIDTH, value);
    },
  });

  const handleChangeWidth = (value: number) => {
    setWidth({
      ...width,
      value: { ...width.value, value },
    });
  };

  const handleChangeAutoWidth = (value: boolean) => {
    setWidth({
      ...width,
      autoWidth: value,
    });
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">Width</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="typography-body4 text-neutral-800">Auto Width</p>
            <Switch
              checked={width.autoWidth}
              onChange={handleChangeAutoWidth}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <div className="flex items-center gap-2">
            <Slider
              value={width.value.value}
              onChange={handleChangeWidth}
              min={0}
              max={100}
              step={1}
              disabled={width.autoWidth}
            />
            <p className="typography-body3 text-neutral-800">
              {width.value.value}%
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}
