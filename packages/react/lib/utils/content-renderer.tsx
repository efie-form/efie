import type { JSONContent } from '@tiptap/core';
import type { ReactNode } from 'react';
import type {
  RenderContentOptions,
  RenderDocProps,
  RenderHeadingProps,
  RenderLinkProps,
  RenderMarkProps,
  RenderNodeProps,
  RenderParagraphProps,
  RenderTextProps,
} from '../../types/field-props';

interface RenderContentProps {
  content: JSONContent;
  options?: Partial<RenderContentOptions>;
}

export default function ContentRenderer({ content, options }: RenderContentProps) {
  const text = options?.text || renderText;
  const link = options?.link || renderLink;
  const superscript = options?.superscript || renderSuperscript;
  const subscript = options?.subscript || renderSubscript;
  const paragraph = options?.paragraph || renderParagraph;
  const heading = options?.heading || renderHeading;
  const doc = options?.doc || renderDoc;
  const bold = options?.bold || renderBold;
  const italic = options?.italic || renderItalic;
  const underline = options?.underline || renderUnderline;
  const strike = options?.strike || renderStrike;
  const bulletList = options?.bulletList || renderBulletList;
  const orderedList = options?.orderedList || renderOrderedList;
  const listItem = options?.listItem || renderListItem;

  return (
    <ContentItem
      content={content}
      options={{
        text,
        link,
        superscript,
        subscript,
        paragraph,
        heading,
        doc,
        bold,
        italic,
        underline,
        strike,
        bulletList,
        orderedList,
        listItem,
      }}
    />
  );
}

interface ContentItemProps {
  content: JSONContent;
  options?: RenderContentOptions;
}

function ContentItem({ content, options }: ContentItemProps) {
  switch (content.type) {
    case 'doc': {
      return options?.doc({
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    case 'paragraph': {
      return options?.paragraph({
        style: getStyles(content.attrs),
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    case 'text': {
      const { style, restMarks } = getAttributes(content.marks);

      const textContent = options?.text({
        text: content.text || '',
        style,
      });

      if (restMarks?.length) {
        return (
          <Marks
            marks={restMarks}
            remainingMarks={content.marks}
            textContent={textContent}
            options={options}
          />
        );
      }

      return textContent;
    }
    case 'heading': {
      return options?.heading({
        level: content.attrs?.level || 1,
        style: getStyles(content.attrs),
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    case 'bulletList': {
      return options?.bulletList({
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    case 'orderedList': {
      return options?.orderedList({
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    case 'listItem': {
      return options?.listItem({
        children: (
          <>
            {content.content?.map((node, index) => (
              <ContentItem key={index} content={node} options={options} />
            ))}
          </>
        ),
      });
    }
    default: {
      console.warn('Unknown content type:', content.type);
      return null;
    }
  }
}

interface Mark {
  type: string;
  attrs?: Record<string, unknown>;
  [key: string]: unknown;
}

interface MarksProps {
  marks: Mark[];
  remainingMarks?: Mark[];
  textContent?: ReactNode;
  options?: RenderContentOptions;
}

function Marks({ marks, remainingMarks, textContent, options }: MarksProps) {
  if (marks.length === 0) {
    return textContent;
  }

  const [currentMark, ...restMarks] = marks;

  switch (currentMark.type) {
    case 'bold': {
      return options?.bold({
        children: (
          <Marks
            marks={restMarks}
            remainingMarks={remainingMarks}
            textContent={textContent}
            options={options}
          />
        ),
      });
    }
    case 'italic': {
      return options?.italic({
        children: (
          <em>
            <Marks
              marks={restMarks}
              remainingMarks={remainingMarks}
              textContent={textContent}
              options={options}
            />
          </em>
        ),
      });
    }
    case 'underline': {
      return options?.underline({
        children: (
          <u>
            <Marks
              marks={restMarks}
              remainingMarks={remainingMarks}
              textContent={textContent}
              options={options}
            />
          </u>
        ),
      });
    }
    case 'strike': {
      return options?.strike({
        children: (
          <s>
            <Marks
              marks={restMarks}
              remainingMarks={remainingMarks}
              textContent={textContent}
              options={options}
            />
          </s>
        ),
      });
    }
    case 'superscript': {
      return options?.superscript({
        children: (
          <sup>
            <Marks
              marks={restMarks}
              remainingMarks={remainingMarks}
              textContent={textContent}
              options={options}
            />
          </sup>
        ),
      });
    }
    case 'subscript': {
      return options?.subscript({
        children: (
          <sub>
            <Marks
              marks={restMarks}
              remainingMarks={remainingMarks}
              textContent={textContent}
              options={options}
            />
          </sub>
        ),
      });
    }
    case 'link': {
      return options?.link({
        href: typeof currentMark.attrs?.href === 'string' ? currentMark.attrs.href : '',
        target: typeof currentMark.attrs?.target === 'string' ? currentMark.attrs.target : '_blank',
        rel:
          typeof currentMark.attrs?.rel === 'string'
            ? currentMark.attrs.rel
            : 'noopener noreferrer',
        children: (
          <Marks
            marks={restMarks}
            remainingMarks={remainingMarks}
            textContent={textContent}
            options={options}
          />
        ),
      });
    }
    default: {
      return (
        <Marks
          marks={restMarks}
          remainingMarks={remainingMarks}
          textContent={textContent}
          options={options}
        />
      );
    }
  }
}

function getStyles(attrs?: Record<string, unknown>) {
  const style: Record<string, string> = {};
  if (!attrs) return style;
  if (typeof attrs.fontSize === 'string') {
    style.fontSize = attrs.fontSize;
  }
  if (typeof attrs.color === 'string') {
    style.color = attrs.color;
  }
  if (typeof attrs.textAlign === 'string') {
    style.textAlign = attrs.textAlign;
  }
  return style;
}

function getAttributes(marks?: Mark[]) {
  if (!marks) return { style: {}, restMarks: [] as Mark[] };
  const style: Record<string, string> = {};
  const restMarks: Mark[] = [];

  for (const mark of marks) {
    if (mark.type === 'textStyle') {
      if (typeof mark.attrs?.fontSize === 'string') {
        style.fontSize = mark.attrs.fontSize;
      }
      if (typeof mark.attrs?.color === 'string') {
        style.color = mark.attrs.color;
      }
    } else if (mark.type !== 'bold') {
      restMarks.push(mark);
    } else {
      restMarks.push(mark);
    }
  }

  return { style, restMarks };
}

// Render helpers
const renderText = ({ text, style }: RenderTextProps) => {
  return <span style={style}>{text}</span>;
};

const renderLink = ({ href, target, rel, children }: RenderLinkProps) => {
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};

const renderParagraph = ({ style, children }: RenderParagraphProps) => {
  return <p style={style}>{children}</p>;
};

const renderDoc = ({ children }: RenderDocProps) => {
  return <>{children}</>;
};

const renderHeading = ({ level, style, children }: RenderHeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <HeadingTag style={style}>{children}</HeadingTag>;
};

const renderSuperscript = ({ children }: RenderMarkProps) => {
  return <sup>{children}</sup>;
};

const renderSubscript = ({ children }: RenderMarkProps) => {
  return <sub>{children}</sub>;
};

const renderBold = ({ children }: RenderMarkProps) => {
  return <strong>{children}</strong>;
};

const renderItalic = ({ children }: RenderMarkProps) => {
  return <em>{children}</em>;
};

const renderUnderline = ({ children }: RenderMarkProps) => {
  return <u>{children}</u>;
};

const renderStrike = ({ children }: RenderMarkProps) => {
  return <s>{children}</s>;
};

const renderBulletList = ({ children }: RenderNodeProps) => {
  return (
    <ul
      style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
      }}
    >
      {children}
    </ul>
  );
};

const renderOrderedList = ({ children }: RenderNodeProps) => {
  return (
    <ol
      style={{
        listStyleType: 'decimal',
        paddingLeft: '20px',
      }}
    >
      {children}
    </ol>
  );
};

const renderListItem = ({ children }: RenderNodeProps) => {
  return <li>{children}</li>;
};
