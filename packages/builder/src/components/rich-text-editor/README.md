## Enhanced Rich Text Editor

This Rich Text Editor component has been significantly enhanced with better design, more functionality, and improved user experience.

### Key Features

#### ✨ **Enhanced Formatting Options**
- **Bold, Italic, Underline, Strikethrough** - Classic text formatting
- **Font Size** - Choose from predefined font sizes (12px to 48px) with visual preview
- **Superscript & Subscript** - For mathematical expressions and footnotes
- **Text Alignment** - Left, center, right, and justify alignment
- **Color Picker** - Change text colors with an intuitive color picker

#### 📝 **Advanced Text Structure**
- **Headings** - H1, H2, H3 with intuitive dropdown selector
- **Font Sizes** - Multiple predefined sizes with live preview in dropdown
- **Lists** - Bullet points and numbered lists
- **Links** - Add and remove hyperlinks easily
- **Placeholder Text** - Helpful guidance for empty editors

#### 🎨 **Beautiful Design**
- **Modern Toolbar** - Organized into logical groups with visual separators
- **Smooth Animations** - Hover effects and transitions for better interaction
- **Tooltips** - Helpful descriptions for each formatting option
- **Visual Feedback** - Clear active states and disabled states
- **Responsive Layout** - Works well on different screen sizes

#### ⌨️ **Keyboard Shortcuts**
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Shift + S` - Strikethrough
- `Ctrl/Cmd + Shift + L` - Bullet list
- `Ctrl/Cmd + Shift + O` - Ordered list

### Usage Example

```tsx
import RichTextEditor from './components/rich-text-editor/rich-text-editor';

function MyComponent() {
  const [content, setContent] = useState({
    type: 'doc',
    content: []
  });

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      active={true}
      placeholder="Start writing your content..."
    />
  );
}
```

### Technical Improvements

1. **Better State Management** - Proper handling of editor state and updates
2. **Accessibility** - Proper ARIA labels and keyboard navigation
3. **Performance** - Optimized re-renders and memoized callbacks
4. **TypeScript** - Full type safety with proper interfaces
5. **CSS Architecture** - Custom styles that work well with Tailwind
6. **Extension Architecture** - Easy to add new TipTap extensions

### Custom Styling

The editor includes custom CSS classes for consistent typography:

- Headings are properly sized and weighted
- Lists have appropriate spacing and indentation
- Links are styled with the primary color scheme
- Placeholder text is subtly styled
- Focus states provide clear visual feedback

### Future Enhancements

Potential additions for even more functionality:
- Tables
- Code blocks with syntax highlighting
- Image insertion
- Undo/Redo buttons
- Word count
- Full-screen mode
- Export options (HTML, Markdown, PDF)

### Font Size Extension

The font size functionality is implemented through a custom TipTap extension located at `./extensions/font-size.ts`.

#### Features:
- **Predefined Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 36px, 48px
- **Default Reset**: Option to reset to default font size
- **Live Preview**: Font sizes are shown in the dropdown using the actual size
- **Persistence**: Font sizes are properly saved and loaded with the document
- **Inline Styling**: Uses CSS `font-size` property for maximum compatibility

#### Usage:
```tsx
// Set font size
editor.commands.setFontSize('24px');

// Get current font size
const fontSize = editor.getAttributes('textStyle').fontSize;

// Remove font size (reset to default)
editor.commands.unsetFontSize();
```

#### Custom Sizes:
You can customize the available font sizes by modifying the extension configuration:

```tsx
FontSize.configure({
  types: ['textStyle'],
  sizes: ['10px', '12px', '14px', '16px', '20px', '24px', '36px'], // Custom sizes
})
```