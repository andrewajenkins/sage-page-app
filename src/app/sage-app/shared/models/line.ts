export enum LineType {
  TEXT,
  HEADING,
  LIST_ITEM,
  BLANK,
}

export class Line {
  value: string;
  type: LineType;
  chatSelected: boolean;
  constructor(type: LineType, value: string) {
    this.value = value;
    this.type = type;
    this.chatSelected = false;
  }
}
