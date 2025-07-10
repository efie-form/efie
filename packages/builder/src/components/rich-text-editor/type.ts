type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Heading = {
  level: Level;
  label: string;
};

interface FontSize {
  label: string;
  size: string;
}

export interface RichTextEditorOptions {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  align?: boolean;
  list?: boolean;
  link?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  heading?: boolean | {
    options: Heading[];
    default?: Level;
  };
  fontSize?: boolean | {
    options: FontSize[];
    default?: FontSize;
  };
}
