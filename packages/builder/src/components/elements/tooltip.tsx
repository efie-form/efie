import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: TooltipPrimitive.TooltipContentProps['side'];
  align?: TooltipPrimitive.TooltipContentProps['align'];
  sideOffset?: TooltipPrimitive.TooltipContentProps['sideOffset'];
  alignOffset?: TooltipPrimitive.TooltipContentProps['alignOffset'];
}

export default function Tooltip({
  children,
  content,
  side = 'top',
  align = 'start',
  sideOffset = 0,
  alignOffset = 0,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="typography-body4 rounded-md bg-neutral-400 px-2 py-0.5 text-white">
            {content}
          </p>
          <TooltipPrimitive.Arrow className="fill-neutral-400" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
