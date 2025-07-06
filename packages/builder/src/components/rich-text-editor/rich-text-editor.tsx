import type { Content, JSONContent, Editor } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Underline } from '@tiptap/extension-underline';
import { Strike } from '@tiptap/extension-strike';
import { Heading } from '@tiptap/extension-heading';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { History } from '@tiptap/extension-history';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaSuperscript,
  FaSubscript,
  FaHeading,
  FaTextHeight,
} from 'react-icons/fa6';
import { FaUnlink } from 'react-icons/fa';
import { useState, useCallback, type ElementType } from 'react';
import { cn } from '../../lib/utils';
import ColorPicker from '../form/color-picker';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { createPortal } from 'react-dom';
import { Placeholder } from '@tiptap/extension-placeholder';
import { usePopper } from 'react-popper';
import { FontSize } from './extensions';

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  defaultValue?: Content;
  active?: boolean;
  placeholder?: string;
}

function RichTextEditor({ value, onChange, active, placeholder = 'Start typing...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextStyle,
      Color,
      FontSize.configure({
        types: ['textStyle'],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc list-inside',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal list-inside',
        },
      }),
      ListItem,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary-500 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Superscript,
      Subscript,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      History.configure({
        depth: 100,
      }),
    ],
    content: value,
    onBlur: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[100px] p-3 border border-neutral-200 rounded-md bg-white transition-all focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-100',
      },
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

  const addLink = useCallback(() => {
    const url = globalThis.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

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
            <div className="bg-white border border-neutral-200 rounded-lg shadow-xl p-3 backdrop-blur-sm">
              {/* Text Formatting Row */}
              <div className="flex items-center gap-1 mb-3 pb-3 border-b border-neutral-100">
                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Format</div>
                <ToolbarGroup label="Format">
                  <ToolbarButton
                    Icon={FaBold}
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    tooltip="Bold"
                  />
                  <ToolbarButton
                    Icon={FaItalic}
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    tooltip="Italic"
                  />
                  <ToolbarButton
                    Icon={FaUnderline}
                    active={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    tooltip="Underline"
                  />
                  <ToolbarButton
                    Icon={FaStrikethrough}
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    tooltip="Strikethrough"
                  />
                </ToolbarGroup>

                <div className="w-px h-6 bg-neutral-200 mx-2" />

                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Align</div>
                <ToolbarGroup label="Alignment">
                  <ToolbarButton
                    Icon={FaAlignLeft}
                    active={editor.isActive({ textAlign: 'left' })}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    tooltip="Align Left"
                  />
                  <ToolbarButton
                    Icon={FaAlignCenter}
                    active={editor.isActive({ textAlign: 'center' })}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    tooltip="Align Center"
                  />
                  <ToolbarButton
                    Icon={FaAlignRight}
                    active={editor.isActive({ textAlign: 'right' })}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    tooltip="Align Right"
                  />
                  <ToolbarButton
                    Icon={FaAlignJustify}
                    active={editor.isActive({ textAlign: 'justify' })}
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    tooltip="Justify"
                  />
                </ToolbarGroup>
              </div>

              {/* Lists and Links Row */}
              <div className="flex items-center gap-1 mb-3 pb-3 border-b border-neutral-100">
                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Lists</div>
                <ToolbarGroup label="Lists">
                  <ToolbarButton
                    Icon={FaListUl}
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    tooltip="Bullet List"
                  />
                  <ToolbarButton
                    Icon={FaListOl}
                    active={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    tooltip="Numbered List"
                  />
                </ToolbarGroup>

                <div className="w-px h-6 bg-neutral-200 mx-2" />

                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Links</div>
                <ToolbarGroup label="Links">
                  <ToolbarButton
                    Icon={FaLink}
                    active={editor.isActive('link')}
                    onClick={addLink}
                    tooltip="Add Link"
                  />
                  <ToolbarButton
                    Icon={FaUnlink}
                    active={false}
                    onClick={removeLink}
                    tooltip="Remove Link"
                    disabled={!editor.isActive('link')}
                  />
                </ToolbarGroup>

                <div className="w-px h-6 bg-neutral-200 mx-2" />

                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Script</div>
                <ToolbarGroup label="Script">
                  <ToolbarButton
                    Icon={FaSuperscript}
                    active={editor.isActive('superscript')}
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    tooltip="Superscript"
                  />
                  <ToolbarButton
                    Icon={FaSubscript}
                    active={editor.isActive('subscript')}
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    tooltip="Subscript"
                  />
                </ToolbarGroup>
              </div>

              {/* Headings and Color Row */}
              <div className="flex items-center gap-1">
                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Style</div>
                <ToolbarGroup label="Headings">
                  <HeadingDropdown editor={editor} />
                  <FontSizeDropdown editor={editor} />
                </ToolbarGroup>

                <div className="w-px h-6 bg-neutral-200 mx-2" />

                <div className="text-xs font-medium text-neutral-500 mr-2 typography-body4">Color</div>
                <ToolbarGroup label="Color">
                  <ColorPicker
                    value={editor.getAttributes('textStyle').color || '#000000'}
                    onChange={(color) => {
                      editor.commands.setColor(color);
                    }}
                    defaultColor="#000000"
                    onClose={() => editor.commands.focus()}
                  />
                </ToolbarGroup>
              </div>
            </div>
          </div>,
          formZone,
        );
      })()}
    </div>
  );
}

interface ToolbarButtonProps {
  Icon: ElementType;
  active?: boolean;
  onClick: () => void;
  tooltip: string;
  disabled?: boolean;
}

function ToolbarButton({ Icon, active, onClick, tooltip, disabled }: ToolbarButtonProps) {
  return (
    <button
      className={cn(
        'p-2.5 hover:bg-neutral-100 transition-all duration-200 rounded-md relative group transform hover:scale-105',
        {
          'bg-primary-100 text-primary-600 shadow-sm': active,
          'text-neutral-600 hover:text-neutral-800': !active && !disabled,
          'opacity-50 cursor-not-allowed text-neutral-300 hover:scale-100': disabled,
        },
      )}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >
      <Icon size={14} className="transition-transform duration-200" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-neutral-800"></div>
      </div>
    </button>
  );
}

interface ToolbarGroupProps {
  label: string;
  children: React.ReactNode;
}

function ToolbarGroup({ children }: ToolbarGroupProps) {
  return <div className="flex items-center gap-1">{children}</div>;
}

interface HeadingDropdownProps {
  editor: Editor;
}

function HeadingDropdown({ editor }: HeadingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const headingOptions = [
    { level: 0, label: 'Paragraph', command: () => editor.chain().focus().setParagraph().run() },
    { level: 1, label: 'Heading 1', command: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { level: 2, label: 'Heading 2', command: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { level: 3, label: 'Heading 3', command: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  ];

  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1';
    if (editor.isActive('heading', { level: 2 })) return 'H2';
    if (editor.isActive('heading', { level: 3 })) return 'H3';
    return 'P';
  };

  return (
    <div className="relative">
      <button
        className={cn(
          'px-3 py-2 text-sm font-medium rounded-md border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 flex items-center gap-2 hover:border-neutral-300',
          { 'bg-primary-100 text-primary-600 border-primary-200': editor.isActive('heading') },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaHeading size={12} />
        <span className="typography-body3 min-w-[20px]">{getCurrentHeading()}</span>
        <svg
          className={cn('w-3 h-3 transition-transform duration-200', { 'rotate-180': isOpen })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg z-20 min-w-[140px] animate-in fade-in slide-in-from-top-1 duration-200">
            {headingOptions.map(option => (
              <button
                key={option.level}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-all typography-body3 first:rounded-t-md last:rounded-b-md',
                  {
                    'bg-primary-50 text-primary-600':
                      (option.level === 0 && !editor.isActive('heading'))
                      || editor.isActive('heading', { level: option.level }),
                  },
                )}
                onClick={() => {
                  option.command();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface FontSizeDropdownProps {
  editor: Editor;
}

function FontSizeDropdown({ editor }: FontSizeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fontSizes = [
    { size: '12px', label: '12px' },
    { size: '14px', label: '14px' },
    { size: '16px', label: '16px' },
    { size: '18px', label: '18px' },
    { size: '20px', label: '20px' },
    { size: '24px', label: '24px' },
    { size: '28px', label: '28px' },
    { size: '32px', label: '32px' },
    { size: '36px', label: '36px' },
    { size: '48px', label: '48px' },
  ];

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes('textStyle').fontSize;
    return fontSize || '16px';
  };

  return (
    <div className="relative">
      <button
        className={cn(
          'px-3 py-2 text-sm font-medium rounded-md border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 flex items-center gap-2 hover:border-neutral-300',
          {
            'bg-primary-100 text-primary-600 border-primary-200': editor.getAttributes('textStyle').fontSize,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaTextHeight size={12} />
        <span className="typography-body3 min-w-[30px] text-left">{getCurrentFontSize()}</span>
        <svg
          className={cn('w-3 h-3 transition-transform duration-200', { 'rotate-180': isOpen })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg z-20 min-w-[100px] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-all typography-body3 border-b border-neutral-100"
              onClick={() => {
                editor.commands.unsetFontSize();
                setIsOpen(false);
              }}
            >
              Default
            </button>
            {fontSizes.map(font => (
              <button
                key={font.size}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-all typography-body3 last:rounded-b-md',
                  {
                    'bg-primary-50 text-primary-600': getCurrentFontSize() === font.size,
                  },
                )}
                onClick={() => {
                  editor.commands.setFontSize(font.size);
                  setIsOpen(false);
                }}
                style={{ fontSize: font.size }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RichTextEditor;
