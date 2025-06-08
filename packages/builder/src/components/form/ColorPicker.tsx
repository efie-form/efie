import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { IColor } from 'react-color-palette';
import {
  Alpha,
  ColorService,
  Hue,
  Saturation,
} from 'react-color-palette';
import 'react-color-palette/css';
import { cn } from '../../lib/utils';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useDebounce from '../../lib/hooks/useDebounce';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type { Color } from '@efie-form/core';

interface ColorPickerProps<T extends Color> {
  value: T;
  onChange: (value: T) => void;
  defaultColor?: T;
  onClose?: () => void;
}

const inputStyle
  = 'text-xs outline-none border border-neutral-200 rounded-md px-2 py-1';

interface FormSchema {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

// Utility to detect color type
function detectColorType(color: unknown): 'hex' | 'rgb' | 'hsl' {
  if (typeof color === 'string' && color.startsWith('#')) return 'hex';
  if (
    typeof color === 'object'
    && color !== null
    && 'r' in color
    && 'g' in color
    && 'b' in color
  ) {
    return 'rgb';
  }
  if (
    typeof color === 'object'
    && color !== null
    && 'h' in color
    && 's' in color
    && 'l' in color
  ) {
    return 'hsl';
  }
  return 'hex'; // fallback
}

// Type guard for hex string
function isHexString(val: unknown): val is string {
  return typeof val === 'string' && val.startsWith('#');
}

// Type for RGB color
interface RgbColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// Type for HSL color
interface HslColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

// Utility to normalize RGB object to always have alpha
function normalizeRgb(rgb: RgbColor | undefined): { r: number; g: number; b: number; a: number } {
  return {
    r: rgb?.r ?? 0,
    g: rgb?.g ?? 0,
    b: rgb?.b ?? 0,
    a: typeof rgb?.a === 'number' ? rgb.a! : 1,
  };
}

// Utility to normalize HSL object to always have alpha
function normalizeHsl(hsl: HslColor | undefined): { h: number; s: number; l: number; a: number } {
  return {
    h: hsl?.h ?? 0,
    s: hsl?.s ?? 0,
    l: hsl?.l ?? 0,
    a: typeof hsl?.a === 'number' ? hsl.a! : 1,
  };
}

const HEX_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
const HEX_ALLOWED_CHARS = /^[#0-9a-fA-F]*$/;

// Utility: convert rgb to hsl
function rgbToHsl({ r, g, b, a = 1 }: RgbColor): HslColor {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
    h = h / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a };
}

// Utility: convert hsl to rgb
function hslToRgb({ h, s, l, a = 1 }: HslColor): RgbColor {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  let r = l;
  let g = l;
  let b = l;
  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a };
}

function ColorPicker<T extends Color>({
  value,
  onChange,
  defaultColor,
  onClose,
}: ColorPickerProps<T>) {
  const initialType = detectColorType(value || defaultColor);
  const [colorType] = useState<'hex' | 'rgb' | 'hsl'>(initialType);

  // Convert initial value to IColor for internal use
  const getInitialColorObject = () => {
    if (colorType === 'hex') {
      const v = value || defaultColor;
      const hex = isHexString(v) ? v : '#000000';
      return ColorService.convert('hex', hex);
    }
    if (colorType === 'rgb') {
      const rgb = normalizeRgb((value || defaultColor) as RgbColor | undefined);
      return ColorService.convert('rgb', rgb);
    }
    // hsl: convert to rgb, then use ColorService.convert('rgb', ...)
    const hsl = normalizeHsl((value || defaultColor) as HslColor | undefined);
    const rgb = normalizeRgb(hslToRgb(hsl));
    return ColorService.convert('rgb', rgb);
  };

  const [internalValue, setInternalValue] = useControllableState({
    defaultProp: value || defaultColor,
    onChange,
    prop: value,
  });

  const [colorObject, setColorObject] = useState(() => getInitialColorObject());

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

  // Update colorObject when internalValue changes
  useEffect(() => {
    if (!edited) {
      if (colorType === 'hex') {
        setColorObject(ColorService.convert('hex', isHexString(internalValue) ? internalValue : '#000000'));
      }
      else if (colorType === 'rgb') {
        setColorObject(ColorService.convert('rgb', normalizeRgb(internalValue as RgbColor | undefined)));
      }
      else {
        // hsl: convert to rgb, then use ColorService.convert('rgb', ...)
        const hsl = normalizeHsl(internalValue as HslColor | undefined);
        const rgb = normalizeRgb(hslToRgb(hsl));
        setColorObject(ColorService.convert('rgb', rgb));
      }
    }
  }, [internalValue, edited, colorType]);

  useDebounce(
    () => {
      const hex = getValues('hex');
      if (!HEX_REGEX.test(hex)) return;
      setColorObject(ColorService.convert('hex', hex));
    },
    250,
    [watch('hex')],
  );

  useDebounce(
    () => {
      const rgb = getValues('rgb');
      setColorObject(ColorService.convert('rgb', normalizeRgb(rgb)));
    },
    250,
    [watch('rgb.r'), watch('rgb.g'), watch('rgb.b'), watch('rgb.a')],
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
    const value = Number(newValue.replaceAll(/\D/g, ''));
    if (value > 255) return;
    setValue(`rgb.${type}`, value);
  };

  // When colorObject changes and edited, convert to original type and call onChange
  useEffect(() => {
    if (!edited) return;
    let output: T | string | { r: number; g: number; b: number; a: number } | { h: number; s: number; l: number; a: number };
    switch (colorType) {
      case 'hex': {
        output = colorObject.hex;
        break;
      }
      case 'rgb': {
        output = { ...colorObject.rgb };
        break;
      }
      case 'hsl': {
        const hsl = rgbToHsl(colorObject.rgb);
        output = { h: hsl.h, s: hsl.s, l: hsl.l, a: hsl.a ?? 1 };
        break;
      }
      default: {
        output = colorObject.hex;
        break;
      }
    }
    setInternalValue(output as T);
  }, [colorObject, edited, setInternalValue, colorType]);

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

                          const hex
                            = '#'
                              + e.target.value
                                .toUpperCase()
                                .replaceAll('#', '')
                                .slice(0, 8);

                          onChange(hex);
                        }}
                      />
                    )}
                    name="hex"
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
