import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

interface SwitchProps {
  id?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ id, checked, onChange }: SwitchProps) {
  const [inputChecked, setInputChecked] = useControllableState({
    prop: checked,
    onChange,
    defaultProp: false,
  });

  return (
    <SwitchPrimitive.Root
      id={id}
      checked={inputChecked}
      onCheckedChange={setInputChecked}
      className="relative h-5 w-8 cursor-pointer bg-neutral-200 border border-neutral-200 rounded-full outline-none data-[state=checked]:bg-primary transition-all duration-300 data-[state=checked]:border-primary"
    >
      <SwitchPrimitive.Thumb className="block size-3.5 translate-x-0.5 rounded-full bg-white transition-all duration-300 will-change-transform data-[state=checked]:translate-x-[14px]" />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
