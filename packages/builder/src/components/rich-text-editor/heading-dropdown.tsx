import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import { useState } from 'react';
import { FaHeading } from 'react-icons/fa6';
import { cn } from '../../lib/utils';
import type { RichTextEditorOptions } from './type';

interface HeadingDropdownProps {
  editor: Editor;
  options?: RichTextEditorOptions['heading'];
}

export default function HeadingDropdown({ editor, options }: HeadingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getHeadingCommand = (level: Level) => {
    return () => editor.chain().focus().toggleHeading({ level }).run();
  };

  const getParagraphCommand = () => {
    return () => editor.chain().focus().setParagraph().run();
  };

  const headingOptions =
    !options || options === true
      ? getDefaultOptions(editor)
      : options.options.map((option) => ({
          level: option.level,
          label: option.label,
          command: option.level === 0 ? getParagraphCommand() : getHeadingCommand(option.level),
        }));

  const getCurrentHeading = () => {
    const activeHeading = editor.getAttributes('heading').level || 0;

    const currentOption = headingOptions.find((option) => option.level === activeHeading);
    return currentOption ? currentOption.label : 'Paragraph';
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 rounded border border-neutral-200 px-2 py-1.5 font-medium text-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50',
          { 'border-primary-200 bg-primary-100 text-primary-600': editor.isActive('heading') },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaHeading size={10} />
        <span className="typography-body4 min-w-[16px] text-xs">{getCurrentHeading()}</span>
        <svg
          className={cn('h-2.5 w-2.5 transition-transform duration-200', { 'rotate-180': isOpen })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-label="Chevron down"
        >
          <title>Chevron down</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close dropdown"
          />
          <div className="fade-in slide-in-from-top-1 absolute top-full left-0 z-20 mt-1 min-w-[120px] animate-in rounded-md border border-neutral-200 bg-white shadow-lg duration-200">
            {headingOptions.map((option) => (
              <button
                key={option.level}
                type="button"
                className={cn(
                  'typography-body3 w-full px-3 py-2 text-left text-sm transition-all first:rounded-t-md last:rounded-b-md hover:bg-neutral-50',
                  {
                    'bg-primary-50 text-primary-600':
                      (option.level === 0 && !editor.isActive('heading')) ||
                      editor.isActive('heading', { level: option.level }),
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

function getDefaultOptions(editor: Editor) {
  return [
    { level: 0, label: 'Paragraph', command: () => editor.chain().focus().setParagraph().run() },
    {
      level: 1,
      label: 'Heading 1',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      level: 2,
      label: 'Heading 2',
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      level: 3,
      label: 'Heading 3',
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
  ];
}
