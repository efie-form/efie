import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Color } from '@tiptap/extension-color';
import { Document } from '@tiptap/extension-document';
import { Heading, type Level } from '@tiptap/extension-heading';
import { History } from '@tiptap/extension-history';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Strike } from '@tiptap/extension-strike';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import Text from '@tiptap/extension-text';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import type { Content, Extensions, JSONContent } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { EditorToolbar } from './';
import { FontSize, type FontSizeOptions } from './extensions';
import { defaultFontSizes } from './extensions/font-size';
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
  const editor = useEditor({
    extensions: getExtensions(options),
    content: value,
    onBlur: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'p-3 rounded-md transition-all ring-0 focus:ring-0 focus:ring-0',
      },
    },
  });

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | undefined>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | undefined>();
  const { styles, attributes: popperAttributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
  });

  function getExtensions(options?: RichTextEditorOptions) {
    const extensions: Extensions = [
      Document,
      Paragraph,
      History.configure({ depth: 100 }),
      Text,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      TextStyle,
    ];

    if (options?.bold) extensions.push(Bold);
    if (options?.italic) extensions.push(Italic);
    if (options?.underline) extensions.push(Underline);
    if (options?.strike) extensions.push(Strike);
    if (options?.align) {
      extensions.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      );
    }
    if (options?.list) {
      if (options.list === true || options.list.ordered) {
        extensions.push(OrderedList);
      }
      if (options.list === true || options.list.bullet) {
        extensions.push(BulletList);
      }
      extensions.push(ListItem);
    }
    if (options?.link) {
      extensions.push(
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            className: 'text-primary-500 underline cursor-pointer',
          },
        }),
      );
    }
    if (options?.superscript) extensions.push(Superscript);
    if (options?.subscript) extensions.push(Subscript);
    if (options?.heading) {
      const headingLevels: Level[] =
        options.heading === true
          ? [1, 2, 3]
          : options.heading.options.map((option) => option.level).filter((level) => level !== 0);
      extensions.push(
        Heading.configure({
          levels: headingLevels,
        }),
      );
    }
    if (options?.fontSize) {
      const fontSizeOptions: FontSizeOptions = {
        types: ['textStyle'],
        sizes: defaultFontSizes,
      };
      if (typeof options.fontSize === 'object' && options.fontSize.options) {
        fontSizeOptions.sizes = options.fontSize.options.map((option) => option.size);
      }
      extensions.push(FontSize.configure(fontSizeOptions));
    }

    return extensions;
  }

  if (!editor) return;

  return (
    <div
      className="rich-text-editor relative"
      ref={(el) => {
        if (el) setReferenceElement(el);
      }}
    >
      <EditorContent editor={editor} />
      {active &&
        (() => {
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
              <EditorToolbar editor={editor} options={options} />
            </div>,
            formZone,
          );
        })()}
    </div>
  );
}

export default RichTextEditor;
