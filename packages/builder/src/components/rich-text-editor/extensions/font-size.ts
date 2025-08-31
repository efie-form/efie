import type { ChainedCommands } from '@tiptap/core';
import { Extension } from '@tiptap/core';

export interface FontSizeOptions {
  types: string[];
  sizes: string[];
}

const setFontSizeCommand =
  (fontSize: string) =>
  ({ chain }: { chain: () => ChainedCommands }) => {
    return chain().setMark('textStyle', { fontSize }).run();
  };

const unsetFontSizeCommand =
  () =>
  ({ chain }: { chain: () => ChainedCommands }) => {
    return chain().setMark('textStyle', { fontSize: undefined }).removeEmptyTextStyle().run();
  };

export const defaultFontSizes = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px',
];

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
      sizes: defaultFontSizes,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: undefined,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize: setFontSizeCommand,
      unsetFontSize: unsetFontSizeCommand,
    };
  },
});
