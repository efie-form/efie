import { useState } from 'react';

interface EditableTextProps {
  defaultValue?: string;
  onSave?: (value: string) => void;
}

export default function EditableText({ defaultValue, onSave }: EditableTextProps) {
  const [_editMode, _setEditModee] = useState(false);

  return <></>;
}
