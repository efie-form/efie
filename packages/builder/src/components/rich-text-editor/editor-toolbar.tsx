import type { Editor } from '@tiptap/react';
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
} from 'react-icons/fa6';
import { FaUnlink } from 'react-icons/fa';
import type { RichTextEditorOptions } from './type';
import { FontSizeDropdown, HeadingDropdown, ToolbarButton, ToolbarGroup } from './';
import { ColorPicker } from '../form';

interface EditorToolbarProps {
  editor: Editor;
  options?: RichTextEditorOptions;
}

export default function EditorToolbar({ editor, options }: EditorToolbarProps) {
  const addLink = () => {
    const url = globalThis.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const hasTextFormatting = options?.bold || options?.italic || options?.underline || options?.strike;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-xl p-2 backdrop-blur-sm">
      <div className="flex items-center gap-1 flex-wrap">

        {/* Style Controls */}
        <ToolbarGroup label="Style">
          <HeadingDropdown editor={editor} options={options?.heading} />
          <FontSizeDropdown
            editor={editor}
            fontSizes={typeof options?.fontSize === 'object' ? options.fontSize.options : undefined}
            defaultSize={typeof options?.fontSize === 'object' ? options.fontSize.default : undefined}
          />
          <ColorPicker
            value={(editor.getAttributes('textStyle').color as string) || '#000000'}
            onChange={(color) => {
              editor.commands.setColor(color);
            }}
            defaultColor="#000000"
            onClose={() => editor.commands.focus()}
          />
        </ToolbarGroup>

        {/* Text Formatting */}
        {hasTextFormatting && (
          <>
            <div className="w-px h-5 bg-neutral-200 mx-1" />

            <ToolbarGroup label="Format">
              {options?.bold && (
                <ToolbarButton
                  Icon={FaBold}
                  active={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  tooltip="Bold"
                />
              )}
              {options?.italic && (
                <ToolbarButton
                  Icon={FaItalic}
                  active={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  tooltip="Italic"
                />
              )}
              {options?.underline && (
                <ToolbarButton
                  Icon={FaUnderline}
                  active={editor.isActive('underline')}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  tooltip="Underline"
                />
              )}
              {options?.strike && (
                <ToolbarButton
                  Icon={FaStrikethrough}
                  active={editor.isActive('strike')}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  tooltip="Strikethrough"
                />
              )}
            </ToolbarGroup>

          </>
        )}

        {/* Alignment */}
        {options?.align && (
          <>
            <div className="w-px h-5 bg-neutral-200 mx-1" />

            <ToolbarGroup label="Alignment">
              {hasAlign(options, 'left') && (
                <ToolbarButton
                  Icon={FaAlignLeft}
                  active={editor.isActive({ textAlign: 'left' })}
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  tooltip="Align Left"
                />
              )}
              {hasAlign(options, 'center') && (
                <ToolbarButton
                  Icon={FaAlignCenter}
                  active={editor.isActive({ textAlign: 'center' })}
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  tooltip="Align Center"
                />
              )}
              {hasAlign(options, 'right') && (
                <ToolbarButton
                  Icon={FaAlignRight}
                  active={editor.isActive({ textAlign: 'right' })}
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  tooltip="Align Right"
                />
              )}
              {hasAlign(options, 'justify') && (
                <ToolbarButton
                  Icon={FaAlignJustify}
                  active={editor.isActive({ textAlign: 'justify' })}
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                  tooltip="Justify"
                />
              )}
            </ToolbarGroup>

          </>
        )}

        {/* Lists */}
        { options?.list && (
          <>
            <div className="w-px h-5 bg-neutral-200 mx-1" />

            <ToolbarGroup label="Lists">
              {hasList(options, 'bullet') && (
                <ToolbarButton
                  Icon={FaListUl}
                  active={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  tooltip="Bullet List"
                />
              )}
              {hasList(options, 'ordered') && (
                <ToolbarButton
                  Icon={FaListOl}
                  active={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  tooltip="Numbered List"
                />
              )}
            </ToolbarGroup>

          </>
        )}

        {/* Links */}
        { options?.link && (
          <>
            <div className="w-px h-5 bg-neutral-200 mx-1" />

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

          </>
        )}

        {/* Script */}
        { (options?.superscript || options?.subscript) && (
          <>
            <div className="w-px h-5 bg-neutral-200 mx-1" />

            <ToolbarGroup label="Script">
              {options?.superscript && (
                <ToolbarButton
                  Icon={FaSuperscript}
                  active={editor.isActive('superscript')}
                  onClick={() => {
                    const chain = editor.chain().focus();
                    if (editor.isActive('subscript')) {
                      chain.toggleSubscript();
                    }
                    chain.toggleSuperscript().run();
                  }}
                  tooltip="Superscript"
                />
              )}
              {options?.subscript && (
                <ToolbarButton
                  Icon={FaSubscript}
                  active={editor.isActive('subscript')}
                  onClick={() => {
                    const chain = editor.chain().focus();
                    if (editor.isActive('superscript')) {
                      chain.toggleSuperscript();
                    }
                    chain.toggleSubscript().run();
                  }}
                  tooltip="Subscript"
                />
              )}
            </ToolbarGroup>

          </>
        )}

      </div>
    </div>
  );
}

function hasAlign(options: RichTextEditorOptions, direction: 'left' | 'center' | 'right' | 'justify') {
  if (!options.align) return false;
  if (typeof options.align === 'boolean') return true;
  return options.align[direction] !== false;
}

function hasList(options: RichTextEditorOptions, type: 'ordered' | 'bullet') {
  if (!options.list) return false;
  if (typeof options.list === 'boolean') return true;
  return options.list[type] !== false;
}
