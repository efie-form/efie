type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Heading {
  level: Level;
  label: string;
}

export interface HeadingFieldConfig {
  formats: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    link?: boolean;
    code?: boolean;
    blockquote?: boolean;
    bulletList?: boolean;
    orderedList?: boolean;
    unorderedList?: boolean;
    codeBlock?: boolean;
    heading?: boolean | {
      options: Heading[];
      default?: Level;
    };
    fontSize?: boolean | {
      options: {
        label: string;
        size: string;
      }[];
      default?: {
        label: string;
        size: string;
      };
    };
  };
}

export interface FieldConfig {
  heading?: HeadingFieldConfig;
  // Add other field configurations as needed
}
