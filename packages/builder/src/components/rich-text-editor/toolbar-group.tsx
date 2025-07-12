interface ToolbarGroupProps {
  label: string;
  children: React.ReactNode;
}

export default function ToolbarGroup({ children, label }: ToolbarGroupProps) {
  return <div className="flex items-center gap-1" aria-label={label}>{children}</div>;
}
