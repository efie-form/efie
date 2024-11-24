import type { DividerFieldProps } from '@efie-form/react/types/FieldProps.ts';

function DividerField({ style }: DividerFieldProps) {
  return (
    <div
      className="efie-divider"
      style={{
        borderStyle: style,
      }}
    />
  );
}

export default DividerField;
