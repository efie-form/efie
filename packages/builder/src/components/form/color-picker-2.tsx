import { getColorObject, type Color } from '@efie-form/core';
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
import { useState } from 'react';
import Select from './select';
import { useControllableState } from '../../lib/hooks/use-controllable-state';

interface ColorPicker2Props {
  value?: Color;
  onChange?: (value: Color) => void;
  defaultColor?: Color;
  onClose?: () => void;
}

const inputStyle = 'text-xs outline-none border border-neutral-200 rounded-md px-2 py-1';

type ColorMode = keyof Color;

const HEX_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
const HEX_ALLOWED_CHARS = /^[#0-9a-fA-F]*$/;

const COLOR_MODE_OPTIONS = [
  { value: 'hex' as const, label: 'HEX' },
  { value: 'rgba' as const, label: 'RGBA' },
  { value: 'hsla' as const, label: 'HSLA' },
];

// Helper function to get display color from Color object
function getDisplayColor(color?: Color): string {
  if (!color) return '#FFFFFF';
  if (color.hex) return color.hex;
  if (color.rgba) {
    const { r, g, b, a } = color.rgba;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (color.hsla) {
    const { h, s, l, a } = color.hsla;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }
  return '#FFFFFF';
}

// Helper function to convert Color to IColor for react-color-palette
function colorToIColor(color?: Color): IColor {
  if (!color) {
    return ColorService.convert('hex', '#FFFFFF');
  }

  if (color.hex) {
    return ColorService.convert('hex', color.hex);
  }
  if (color.rgba) {
    return ColorService.convert('rgb', color.rgba);
  }
  if (color.hsla) {
    // Convert HSLA to HSV for react-color-palette
    const { h, s, l, a } = color.hsla;
    // Convert HSL to RGB first, then to HSV
    const tempColor = ColorService.convert('hex', `hsl(${h}, ${s}%, ${l}%)`);
    return {
      ...tempColor,
      hsv: { ...tempColor.hsv, a },
      rgb: { ...tempColor.rgb, a },
    };
  }

  return ColorService.convert('hex', '#FFFFFF');
}

export default function ColorPicker2({
  value,
  onChange,
  defaultColor = getColorObject('#FFFFFF'),
  onClose,
}: ColorPicker2Props) {
  const [internalColor, setInternalColor] = useControllableState({
    defaultValue: value || defaultColor,
    onChange,
    value,
  });

  const [colorMode, setColorMode] = useState<ColorMode>('hex');

  const [colorObject, setColorObject] = useState(() => colorToIColor(internalColor));

  const [open, setOpen] = useState(false);

  const handleColorChange = (color: IColor) => {
    const newColor = getColorObject(color.rgb);
    setColorObject(color);
    setInternalColor(newColor);
  };

  const handleRgbaChange = (type: 'r' | 'g' | 'b' | 'a', newValue: string) => {
    const value = Number(newValue.replaceAll(/\D/g, ''));
    if (value > 255) return;
    const newColor = getColorObject({
      ...internalColor.rgba,
      [type]: value,
    });
    setInternalColor(newColor);
    setColorObject(colorToIColor(newColor));
  };

  const handleAlphaChange = (newValue: string) => {
    const value = Math.max(0, Math.min(1, Number(newValue)));
    const newColor = getColorObject({
      ...internalColor.rgba,
      a: value,
    });
    setInternalColor(newColor);
    setColorObject(colorToIColor(newColor));
  };

  const handleHslaChange = (type: 'h' | 's' | 'l', newValue: string) => {
    const value = Number(newValue.replaceAll(/\D/g, ''));
    if (type === 'h' && value > 360) {
      return;
    }
    if ((type === 's' || type === 'l') && value > 100) {
      return;
    }
    const newColor = getColorObject({
      ...internalColor.hsla,
      [type]: value,
    });
    setInternalColor(newColor);
    setColorObject(colorToIColor(newColor));
  };

  const handlehexChange = (newValue: string) => {
    if (!HEX_ALLOWED_CHARS.test(newValue)) return;

    const hex = '#' + newValue
      .toUpperCase()
      .replaceAll('#', '')
      .slice(0, 8);

    if (!HEX_REGEX.test(hex)) return;

    const newColor = getColorObject(hex);
    setInternalColor(newColor);
    setColorObject(colorToIColor(newColor));
  };

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o && onClose) onClose();
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button aria-label="Open color picker" className="relative focus:outline-primary inline-block border p-[2px] border-neutral-200 rounded-sm cursor-pointer">
          <div
            className="size-6 rounded-sm"
            style={{
              backgroundColor: getDisplayColor(internalColor),
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
            {/* Color Mode Selector */}
            <div className="mt-5">
              <Select
                value={colorMode}
                onChange={(newMode) => {
                  setColorMode(newMode);
                }}
                options={COLOR_MODE_OPTIONS}
                className="w-20"
              />
            </div>

            {/* Input Fields Based on Selected Mode */}
            <div className="flex gap-2 mt-3">
              {colorMode === 'hex' && (
                <div className="flex-1">
                  <input
                    type="text"
                    className={cn(inputStyle, 'w-full text-center')}
                    value={internalColor.hex}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      handlehexChange(value);
                    }}
                  />
                  <p className="typography-body4 text-center">hex</p>
                </div>
              )}

              {colorMode === 'rgba' && (
                <div className="flex gap-1 w-full">
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.rgba.r}
                      onChange={(e) => {
                        handleRgbaChange('r', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">r</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.rgba.g}
                      onChange={(e) => {
                        handleRgbaChange('g', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">g</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.rgba.b}
                      onChange={(e) => {
                        handleRgbaChange('b', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">b</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.rgba.a}
                      onChange={(e) => {
                        handleRgbaChange('a', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">a</p>
                  </div>

                </div>
              )}

              {colorMode === 'hsla' && (
                <div className="flex gap-1 w-full">
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.hsla.h}
                      onChange={(e) => {
                        handleHslaChange('h', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">h</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.hsla.s}
                      onChange={(e) => {
                        handleHslaChange('s', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">s</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.hsla.l}
                      onChange={(e) => {
                        handleHslaChange('l', e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">l</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className={cn(inputStyle, 'w-full text-center')}
                      value={internalColor.hsla.a}
                      onChange={(e) => {
                        handleAlphaChange(e.target.value);
                      }}
                    />
                    <p className="typography-body4 text-center">a</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
