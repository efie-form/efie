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
import { useEffect, useState } from 'react';
import useDebounce from '../../lib/hooks/useDebounce.ts';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  defaultColor?: string;
  onClose?: () => void;
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
  onClose,
}: ColorPickerProps) {
  const [colorObject, setColorObject] = useColor(value || defaultColor);
  const { control, watch, getValues, setValue } = useForm<FormSchema>({
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

  const [edited, setEdited] = useState(false);

  useDebounce(
    () => {
      const hex = getValues('hex');

      if (!HEX_REGEX.test(hex)) return;

      setColorObject(ColorService.convert('hex', hex));
    },
    250,
    [watch('hex')]
  );

  useDebounce(
    () => {
      const rgb = getValues('rgb');

      setColorObject(ColorService.convert('rgb', rgb));
    },
    250,
    [watch('rgb.r'), watch('rgb.g'), watch('rgb.b'), watch('rgb.a')]
  );

  const handleColorChange = (color: IColor) => {
    setEdited(true);
    setColorObject(color);

    setValue('hex', color.hex.toUpperCase());
    setValue('rgb.r', Math.round(color.rgb.r));
    setValue('rgb.g', Math.round(color.rgb.g));
    setValue('rgb.b', Math.round(color.rgb.b));
    setValue('rgb.a', color.rgb.a);
  };

  const handleRgbChange = (type: 'r' | 'g' | 'b', newValue: string) => {
    const value = Number(newValue.replace(/\D/g, ''));
    if (value > 255) return;
    setValue(`rgb.${type}`, value);
  };

  useEffect(() => {
    if (!edited) return;
    onChange?.(colorObject.hex);
  }, [colorObject, edited]);

  const [open, setOpen] = useState(false);

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setEdited(false);
        }
        if (!o && onClose) onClose();
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button className="relative focus:outline-primary inline-block border p-[2px] border-neutral-200 rounded-sm cursor-pointer">
          <div
            className="size-6 rounded-sm"
            style={{
              backgroundColor: colorObject.hex,
            }}
          />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content side="bottom" align="start" sideOffset={5}>
          <div className="bg-white shadow-lg w-64 p-3 rounded-lg [&_.rcp-saturation]:rounded-md [&_.rcp-saturation-cursor]:h-4 [&_.rcp-saturation-cursor]:w-4 [&_.rcp-saturation-cursor]:-translate-x-2 [&_.rcp-saturation-cursor]:-translate-y-2">
            <Saturation
              height={128}
              color={colorObject}
              onChange={handleColorChange}
            />
            <div className="mt-5 [&_.rcp-hue]:h-1.5 [&_.rcp-hue-cursor]:h-4 [&_.rcp-hue-cursor]:w-4 [&_.rcp-hue-cursor]:-translate-x-2 [&_.rcp-hue-cursor]:-translate-y-1">
              <Hue color={colorObject} onChange={handleColorChange} />
            </div>
            <div className="mt-5 [&_.rcp-alpha]:h-1.5 [&_.rcp-alpha-cursor]:h-4 [&_.rcp-alpha-cursor]:w-4 [&_.rcp-alpha-cursor]:-translate-x-2 [&_.rcp-alpha-cursor]:-translate-y-1">
              <Alpha color={colorObject} onChange={handleColorChange} />
            </div>
            <div className="flex gap-2 mt-5">
              <div className="flex gap-2">
                <div>
                  <Controller
                    render={({ field: { value, onChange } }) => (
                      <input
                        type="text"
                        className={cn(inputStyle, 'w-full text-center')}
                        value={value}
                        onChange={(e) => {
                          if (!HEX_ALLOWED_CHARS.test(e.target.value)) return;
                          setEdited(true);

                          const hex =
                            '#' +
                            e.target.value
                              .toUpperCase()
                              .replace(/#/g, '')
                              .slice(0, 8);

                          onChange(hex);
                        }}
                      />
                    )}
                    name={'hex'}
                    control={control}
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
                          setEdited(true);

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
                          setEdited(true);

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
                          setEdited(true);

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
