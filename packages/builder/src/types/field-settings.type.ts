type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Heading {
  level: Level;
  label: string;
}

interface FontSize {
  label: string;
  size: string;
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
    superscript?: boolean;
    subscript?: boolean;
    list?: boolean | {
      ordered: boolean;
      bullet: boolean;
    };
    codeBlock?: boolean;
    align: boolean | {
      left: boolean;
      center: boolean;
      right: boolean;
      justify: boolean;
    };
    heading?: boolean | {
      options: Heading[];
      default?: Level;
    };
    fontSize?: boolean | {
      options: FontSize[];
      default?: FontSize;
    };
  };
};

export interface FieldConfig {
  heading?: HeadingFieldConfig;
  // Add other field configurations as needed
}
