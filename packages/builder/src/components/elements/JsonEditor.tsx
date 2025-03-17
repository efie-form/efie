import { Editor } from '@monaco-editor/react';

interface JsonEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

function JsonEditor({ value, onChange }: JsonEditorProps) {
  return (
    <Editor
      height="100%"
      width="100%"
      value={value}
      onChange={onChange}
      language="json"
      theme="light"
    />
  );
}

export default JsonEditor;
