import type { JSONContent } from '@tiptap/react';
import { useState } from 'react';
import RichTextEditor from '../rich-text-editor';

/**
 * Example component demonstrating font size functionality
 * in the enhanced rich text editor.
 */
export function FontSizeExample() {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is normal text. ',
          },
          {
            type: 'text',
            text: 'This is large text. ',
            marks: [
              {
                type: 'textStyle',
                attrs: {
                  fontSize: '24px',
                },
              },
            ],
          },
          {
            type: 'text',
            text: 'This is small text.',
            marks: [
              {
                type: 'textStyle',
                attrs: {
                  fontSize: '12px',
                },
              },
            ],
          },
        ],
      },
    ],
  });

  return (
    <div className="mx-auto max-w-4xl px-4">
      <h2 className="mb-4 font-bold text-2xl">Font Size Example</h2>
      <p className="mb-4 text-neutral-600">
        Try selecting text and changing the font size using the dropdown in the toolbar. The toolbar
        appears when the editor is active.
      </p>

      <div className="rounded-lg border border-neutral-200 p-4">
        <RichTextEditor
          value={content}
          onChange={setContent}
          active={true}
          placeholder="Try typing and changing font sizes..."
        />
      </div>

      <div className="mt-4">
        <h3 className="mb-2 font-semibold text-lg">Available Font Sizes:</h3>
        <div className="grid grid-cols-2 gap-2 text-center md:grid-cols-5">
          {['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'].map(
            (size) => (
              <div
                key={size}
                className="rounded border border-neutral-200 p-2"
                style={{ fontSize: size }}
              >
                {size}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default FontSizeExample;
