import type { Editor } from '@tiptap/react';
import { useState } from 'react';
import { FaTextHeight } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

interface FontSizeDropdownProps {
  editor: Editor;
  fontSizes?: { size: string; label: string }[];
  defaultSize?: { size: string; label: string };
}
const defaultFontSizes = [
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

export function FontSizeDropdown({
  editor,
  fontSizes = defaultFontSizes,
  defaultSize = { size: '16px', label: 'Default' },
}: FontSizeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultSizeLabel = defaultSize.label;

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes('textStyle').fontSize as string;
    if (!fontSize) {
      return defaultSizeLabel;
    }

    return fontSizes.find(size => size.size === fontSize)?.label || defaultSizeLabel;
  };

  return (
    <div className="relative">
      <button
        className={cn(
          'px-2 py-1.5 text-sm font-medium rounded border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 flex items-center gap-1 hover:border-neutral-300',
          {
            'bg-primary-100 text-primary-600 border-primary-200': editor.getAttributes('textStyle').fontSize,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaTextHeight size={10} />
        <span className="typography-body4 min-w-[24px] text-left text-xs">{getCurrentFontSize()}</span>
        <svg
          className={cn('w-2.5 h-2.5 transition-transform duration-200', { 'rotate-180': isOpen })}
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
          <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg z-20 min-w-[80px] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-all typography-body3 border-b border-neutral-100"
              onClick={() => {
                editor.commands.unsetFontSize();
                editor.chain().focus().run();
                editor.view.focus();
                setIsOpen(false);
              }}
            >
              {defaultSizeLabel}
            </button>
            {fontSizes.map(font => (
              <button
                key={font.size}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-all typography-body3 last:rounded-b-md whitespace-nowrap',
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
