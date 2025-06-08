import type { Color } from '@efie-form/core';
import * as PopoverPrimitive from '@radix-ui/react-popover';

interface ColorPicker2Props<T extends Color> {
  value?: T;
  onChange?: (value: T) => void;

}

export default function ColorPicker2<T extends Color>({ value, onChange }: ColorPicker2Props<T>) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button className="relative focus:outline-primary inline-block border p-[2px] border-neutral-200 rounded-sm cursor-pointer">
          <div
            className="size-6 rounded-sm"
            style={{
              backgroundColor: value?.hex,
            }}
          />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content className="p-2 bg-white rounded shadow-lg">
        abhc
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}
