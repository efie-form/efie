import { FontSize } from '../font-size';
import { Editor } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';

describe('FontSize Extension', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        FontSize,
      ],
    });
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should set font size correctly', () => {
    editor.commands.setFontSize('24px');

    const attributes = editor.getAttributes('textStyle');
    expect(attributes.fontSize).toBe('24px');
  });

  it('should unset font size correctly', () => {
    editor.commands.setFontSize('24px');
    editor.commands.unsetFontSize();

    const attributes = editor.getAttributes('textStyle');
    expect(attributes.fontSize).toBeUndefined();
  });

  it('should render font size in HTML correctly', () => {
    editor.commands.insertContent('<span style="font-size: 20px">Test text</span>');

    const html = editor.getHTML();
    expect(html).toContain('font-size: 20px');
  });

  it('should parse font size from HTML correctly', () => {
    editor.commands.setContent('<p><span style="font-size: 18px;">Test</span></p>');

    // Move cursor to the span
    editor.commands.focus();
    editor.commands.setTextSelection(1);

    const attributes = editor.getAttributes('textStyle');
    expect(attributes.fontSize).toBe('18px');
  });

  it('should handle default font sizes', () => {
    const extension = FontSize.configure();
    const defaultSizes = extension.options.sizes;

    expect(defaultSizes).toContain('16px');
    expect(defaultSizes).toContain('24px');
    expect(defaultSizes).toContain('48px');
  });
});
