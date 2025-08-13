import * as SliderPrimitive from '@radix-ui/react-slider';
import { useControllableState } from '../../lib/hooks/use-controllable-state';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}

function Slider({ value, onChange, min, max, step, disabled }: SliderProps) {
  const [inputValue, setInputValue] = useControllableState({
    value: value !== undefined ? [value] : undefined,
    onChange: ([val]) => onChange?.(val),
    defaultValue: [min],
  });

  return (
    <SliderPrimitive.Root
      disabled={disabled}
      className="relative flex h-5 w-[200px] touch-none select-none items-center"
      value={inputValue}
      onValueChange={setInputValue}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-[3px] grow rounded-full bg-neutral-100">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary data-[disabled]:bg-neutral-400" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block size-4 cursor-pointer rounded-[10px] border-2 border-primary bg-white outline-none data-[disabled]:cursor-default data-[disabled]:border-neutral-400"
        aria-label="Volume"
      />
    </SliderPrimitive.Root>
  );
}

export default Slider;
