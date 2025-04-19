import type { Content, JSONContent } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Underline } from '@tiptap/extension-underline';
import { Heading } from '@tiptap/extension-heading';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6';
import { useState, type ElementType } from 'react';
import { cn } from '../../lib/utils';
import ColorPicker from '../form/ColorPicker';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  defaultValue?: Content;
  active?: boolean;
}

function RichTextEditor({ value, onChange, active }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Heading,
      TextStyle,
      Color,
    ],
    content: value,
    onBlur: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });
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

  return (
    <div
      className="relative "
      ref={(el) => {
        if (el) setReferenceElement(el);
      }}
    >
      <EditorContent editor={editor} />
      {active && (() => {
        const formZone = document.querySelector('#form-zone');
        if (!formZone) return;

        return createPortal(
          <div
            ref={(el) => {
              if (el) setPopperElement(el);
            }}
            style={styles.popper}
            {...popperAttributes.popper}
          >
            <div className="bg-neutral-50 border border-neutral-200 rounded-md flex typography-body3 shadow-md">
              <Button
                Icon={FaBold}
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
              />
              <Button
                Icon={FaItalic}
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              />
              <Button
                Icon={FaUnderline}
                active={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              />
              <ColorPicker
                value={editor.getAttributes('textStyle').color}
                onChange={(color) => {
                  editor.commands.setColor(color);
                }}
                defaultColor="#000000"
                onClose={() => editor.commands.focus()}
              />
            </div>
          </div>,
          formZone,
        );
      })()}
    </div>
  );
}

interface ButtonProps {
  Icon: ElementType;
  active?: boolean;
  onClick: () => void;
}

function Button({ Icon, active, onClick }: ButtonProps) {
  return (
    <button
      className="p-2 hover:bg-neutral-100/50 transition-all"
      onClick={onClick}
    >
      <Icon
        size={12}
        className={cn('transition-all', {
          'text-neutral-800': active,
          'text-neutral-300': !active,
        })}
      />
    </button>
  );
}

export default RichTextEditor;
