import { generateHTML } from '@tiptap/html';

function RichTextRenderer({ content, className }) {
  try {
    const html = generateHTML(content, []);

    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  catch (error) {
    console.warn('Failed to render rich text content:', error);
    return <div className={className}>Content unavailable</div>;
  }
}

export default RichTextRenderer;
