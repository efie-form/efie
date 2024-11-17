import { useControllableState } from '@radix-ui/react-use-controllable-state';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { IColor } from 'react-color-palette';
import {
  Alpha,
  ColorService,
  Hue,
  Saturation,
  useColor,
} from 'react-color-palette';
import 'react-color-palette/css';
import { cn } from '../../lib/utils.ts';
import { Controller, useForm } from 'react-hook-form';
import type { ChangeEvent } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  defaultColor?: string;
}

const inputStyle =
  'text-xs outline-none border border-neutral-200 rounded-md px-2 py-1';

interface FormSchema {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

const HEX_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
const HEX_ALLOWED_CHARS = /^[#0-9a-fA-F]*$/;

function ColorPicker({
  value,
  onChange,
  defaultColor = '#FFFFFF',
}: ColorPickerProps) {
  const [color, setColor] = useControllableState({
    prop: value,
    onChange,
    defaultProp: defaultColor,
  });
  const [colorObject] = useColor(color!);
  const { control, watch, setValue } = useForm<FormSchema>({
    defaultValues: {
      hex: colorObject.hex,
      rgb: {
        r: colorObject.rgb.r,
        g: colorObject.rgb.g,
        b: colorObject.rgb.b,
        a: colorObject.rgb.a,
      },
    },
  });

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hex =
      '#' + e.target.value.toUpperCase().replace(/#/g, '').slice(0, 8);
    if (HEX_ALLOWED_CHARS.test(e.target.value)) {
      setValue('hex', hex);
    }

    if (HEX_REGEX.test(hex)) {
      setColor(hex);
    }
  };

  const handleRgbChange = (type: 'r' | 'g' | 'b', newValue: string) => {
    const value = Number(newValue.replace(/\D/g, ''));
    if (value > 255) return;
    setValue(`rgb.${type}`, value);

    const hex = ColorService.rgb2hex({
      r: type === 'r' ? value : colorObject.rgb.r,
      g: type === 'g' ? value : colorObject.rgb.g,
      b: type === 'b' ? value : colorObject.rgb.b,
      a: colorObject.rgb.a,
    });

    setColor(hex);
  };

  const handlePickerChange = (obj: IColor) => {
    setValue('hex', obj.hex.toUpperCase());
    setValue('rgb.r', Math.round(obj.rgb.r));
    setValue('rgb.g', Math.round(obj.rgb.g));
    setValue('rgb.b', Math.round(obj.rgb.b));
    setColor(obj.hex);
  };

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>
        <div className="relative inline-block border p-[2px] border-neutral-200 rounded-sm cursor-pointer">
          <div
            className="size-6 rounded-sm"
            style={{
              backgroundColor: colorObject.hex,
            }}
          />
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content side="bottom" align="start" sideOffset={5}>
          <div className="bg-white shadow-lg w-64 p-3 rounded-lg [&_.rcp-saturation]:rounded-md [&_.rcp-saturation-cursor]:h-4 [&_.rcp-saturation-cursor]:w-4 [&_.rcp-saturation-cursor]:-translate-x-2 [&_.rcp-saturation-cursor]:-translate-y-2">
            <Saturation
              height={128}
              color={colorObject}
              onChange={handlePickerChange}
            />
            <div className="mt-5 [&_.rcp-hue]:h-1.5 [&_.rcp-hue-cursor]:h-4 [&_.rcp-hue-cursor]:w-4 [&_.rcp-hue-cursor]:-translate-x-2 [&_.rcp-hue-cursor]:-translate-y-1">
              <Hue color={colorObject} onChange={handlePickerChange} />
            </div>
            <div className="mt-5 [&_.rcp-alpha]:h-1.5 [&_.rcp-alpha-cursor]:h-4 [&_.rcp-alpha-cursor]:w-4 [&_.rcp-alpha-cursor]:-translate-x-2 [&_.rcp-alpha-cursor]:-translate-y-1">
              <Alpha color={colorObject} onChange={handlePickerChange} />
            </div>
            <div className="flex gap-2 mt-5">
              <div className="flex gap-2">
                <div>
                  <input
                    type="text"
                    className={cn(inputStyle, 'w-full text-center')}
                    value={watch('hex')}
                    onChange={handleHexChange}
                  />
                  <p className="typography-body4 text-center">hex</p>
                </div>
                <div>
                  <Controller
                    render={({ field: { value } }) => (
                      <input
                        type="text"
                        className={cn(inputStyle, 'w-10 text-center')}
                        value={value}
                        onChange={(e) => {
                          handleRgbChange('r', e.target.value);
                        }}
                      />
                    )}
                    name="rgb.r"
                    control={control}
                  />
                  <p className="typography-body4 text-center">r</p>
                </div>
                <div>
                  <Controller
                    render={({ field: { value } }) => (
                      <input
                        type="text"
                        className={cn(inputStyle, 'w-10 text-center')}
                        value={value}
                        onChange={(e) => {
                          handleRgbChange('g', e.target.value);
                        }}
                      />
                    )}
                    name="rgb.g"
                    control={control}
                  />
                  <p className="typography-body4 text-center">g</p>
                </div>
                <div>
                  <Controller
                    render={({ field: { value } }) => (
                      <input
                        type="text"
                        className={cn(inputStyle, 'w-10 text-center')}
                        value={value}
                        onChange={(e) => {
                          handleRgbChange('b', e.target.value);
                        }}
                      />
                    )}
                    name="rgb.b"
                    control={control}
                  />
                  <p className="typography-body4 text-center">b</p>
                </div>
              </div>
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default ColorPicker;
