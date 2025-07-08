interface ToolbarGroupProps {
  label: string;
  children: React.ReactNode;
}

export function ToolbarGroup({ children }: ToolbarGroupProps) {
  return <div className="flex items-center gap-1">{children}</div>;
}
