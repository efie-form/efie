import React from 'react';

import { Editor } from '@monaco-editor/react';

interface JsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

function JsonEditor({ value, onChange }: JsonEditorProps) {
  return (
    <div className="h-full rounded-md overflow-hidden">
      {/*<AceEditor
        mode="json"
        width="100%"
        height="95%"
        theme={theme.light}
        value={value}
        ref={ref}
        onChange={handleChange}
      />*/}
      <Editor
        height="95%"
        width="100%"
        value={value}
        onChange={onChange}
        language="json"
        theme="light"
      />
    </div>
  );
}

export default JsonEditor;
