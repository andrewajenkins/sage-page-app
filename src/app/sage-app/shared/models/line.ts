export enum LineType {
  HEADING1 = 'format_h1',
  HEADING2 = 'format_h2',
  HEADING3 = 'format_h3',
  HEADING4 = 'format_h4',
  HEADING5 = 'format_h5',
  HEADING6 = 'format_h6',
  ORDERED_LIST_ITEM = 'ol',
  UNORDERED_LIST_ITEM = 'ul',
  TEXT = 'text_fields',
  BLANK = '_',
}

export class Line {
  rawValue: string;
  pValue: string;
  value: string;
  type: LineType;
  chatSelected: boolean;
  editorSelected: boolean;
  constructor(type: LineType, rawValue: string, value: string, pValue: string) {
    this.rawValue = rawValue;
    this.value = value;
    this.pValue = pValue;
    this.type = type;
    this.chatSelected = false;
    this.editorSelected = false;
  }
}
