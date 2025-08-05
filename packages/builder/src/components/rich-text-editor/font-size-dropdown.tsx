import type { Editor } from '@tiptap/react';
import { useState } from 'react';
import { FaTextHeight } from 'react-icons/fa6';
import { cn } from '../../lib/utils';
import { defaultFontSizes } from './extensions/font-size';

interface FontSizeDropdownProps {
  editor: Editor;
  fontSizes?: { size: string; label: string }[];
  defaultSize?: { size: string; label: string };
}

const getDefaultFontSizes = () => {
  return defaultFontSizes.map((size) => ({
    size,
    label: size,
  }));
};

export default function FontSizeDropdown({
  editor,
  fontSizes = getDefaultFontSizes(),
  defaultSize = { size: '16px', label: 'Default' },
}: FontSizeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultSizeLabel = defaultSize.label;

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes('textStyle').fontSize as string;
    if (!fontSize) {
      return defaultSizeLabel;
    }

    return fontSizes.find((size) => size.size === fontSize)?.label || defaultSizeLabel;
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 rounded border border-neutral-200 px-2 py-1.5 font-medium text-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50',
          {
            'border-primary-200 bg-primary-100 text-primary-600':
              editor.getAttributes('textStyle').fontSize,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaTextHeight size={10} />
        <span className="typography-body4 min-w-[24px] text-left text-xs">
          {getCurrentFontSize()}
        </span>
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
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            tabIndex={0}
            aria-label="Close dropdown"
          />
          <div className="fade-in slide-in-from-top-1 absolute top-full left-0 z-20 mt-1 max-h-60 min-w-[80px] animate-in overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg duration-200">
            <button
              type="button"
              className="typography-body3 w-full border-neutral-100 border-b px-3 py-2 text-left text-sm transition-all hover:bg-neutral-50"
              onClick={() => {
                editor.commands.unsetFontSize();
                editor.chain().focus().run();
                setIsOpen(false);
              }}
            >
              {defaultSizeLabel}
            </button>
            {fontSizes.map((font) => (
              <button
                key={font.size}
                type="button"
                className={cn(
                  'typography-body3 w-full whitespace-nowrap px-3 py-2 text-left text-sm transition-all last:rounded-b-md hover:bg-neutral-50',
                  {
                    'bg-primary-50 text-primary-600': getCurrentFontSize() === font.size,
                  },
                )}
                onClick={() => {
                  editor.commands.setFontSize(font.size);
                  editor.chain().focus().run();
                  editor.view.focus();
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
