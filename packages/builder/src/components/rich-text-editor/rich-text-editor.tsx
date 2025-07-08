import type { Content, Extensions, JSONContent } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Underline } from '@tiptap/extension-underline';
import { Strike } from '@tiptap/extension-strike';
import { Heading } from '@tiptap/extension-heading';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { History } from '@tiptap/extension-history';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Placeholder } from '@tiptap/extension-placeholder';
import { usePopper } from 'react-popper';
import { FontSize } from './extensions';
import { EditorToolbar } from './editor-toolbar';
import Text from '@tiptap/extension-text';
import type { RichTextEditorOptions } from './type';

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  defaultValue?: Content;
  active?: boolean;
  placeholder?: string;
  options?: RichTextEditorOptions;
}

function RichTextEditor({
  value,
  onChange,
  active,
  placeholder = 'Start typing...',
  options,
}: RichTextEditorProps) {
  const DEFAULT_EXTENSIONS: Extensions = [
    Document,
    Paragraph,
    History.configure({ depth: 100 }),
    Text,
    Placeholder.configure({
      placeholder,
      emptyEditorClass: 'is-editor-empty',
    }),
  ];

  const [extensions, setExtensions] = useState<Extensions>(DEFAULT_EXTENSIONS);

  const editor = useEditor({
    extensions,
    content: value,
    onBlur: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[100px] p-3 rounded-md transition-all ring-0 focus:ring-0 focus:ring-0',
      },
    },
  });

  useEffect(() => {
    const _extensions: Extensions = DEFAULT_EXTENSIONS;
    if (options?.bold) _extensions.push(Bold);
    if (options?.italic) _extensions.push(Italic);
    if (options?.underline) _extensions.push(Underline);
    if (options?.strike) _extensions.push(Strike);
    if (options?.align) {
      _extensions.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      );
    }
    if (options?.list) {
      _extensions.push(BulletList, OrderedList, ListItem);
    }
    if (options?.link) {
      _extensions.push(
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary-500 underline cursor-pointer',
          },
        }),
      );
    }
    if (options?.superscript) _extensions.push(Superscript);
    if (options?.subscript) _extensions.push(Subscript);
    if (options?.heading) {
      _extensions.push(
        Heading.configure({
          levels: [1, 2, 3],
        }),
      );
    }
    if (options?.fontSize) {
      _extensions.push(
        FontSize.configure({
          types: ['textStyle'],
        }),
      );
    }
    setExtensions(_extensions);
  }, [options]);

  const [referenceElement, setReferenceElement] = useState<
    HTMLDivElement | undefined
  >();
  const [popperElement, setPopperElement] = useState<
    HTMLDivElement | undefined
  >();
  const { styles, attributes: popperAttributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'top-start',
    },
  );

  if (!editor) return;
  console.log(editor);

  return (
    <div
      className="relative rich-text-editor"
      ref={(el) => {
        if (el) setReferenceElement(el);
      }}
    >
      <EditorContent editor={editor} />
      {active && (() => {
        const formZone = document.querySelector('body');
        if (!formZone) return;

        return createPortal(
          <div
            ref={(el) => {
              if (el) setPopperElement(el);
            }}
            style={styles.popper}
            className="z-[99]"
            {...popperAttributes.popper}
          >
            <EditorToolbar editor={editor} />
          </div>,
          formZone,
        );
      })()}
    </div>
  );
}

export default RichTextEditor;
