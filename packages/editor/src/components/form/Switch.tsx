import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ checked, onChange }: SwitchProps) {
  const [inputChecked, setInputChecked] = useControllableState({
    prop: checked,
    onChange,
    defaultProp: false,
  });
  return (
    <SwitchPrimitive.Root
      checked={inputChecked}
      onCheckedChange={setInputChecked}
      className="relative h-[24px] w-[42px] cursor-pointer bg-white border border-neutral-200 rounded-full outline-none data-[state=checked]:bg-primary transition-all duration-300 data-[state=checked]:border-primary"
    >
      <SwitchPrimitive.Thumb className="block size-[18px] translate-x-0.5 rounded-full bg-neutral-400 data-[state=checked]:bg-white transition-all duration-300 will-change-transform data-[state=checked]:translate-x-[20px]" />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
