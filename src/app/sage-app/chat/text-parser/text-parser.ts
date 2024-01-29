import { Line, LineType } from '../../shared/models/line';

export function parseText(text: string): Line[] {
  const lines = text.split('\n'); // Split the text into lines
  return lines.map((line) => {
    if (line.startsWith('#')) {
      return new Line(LineType.HEADING, line);
    } else if (line.match(/^\d+\.\s\*\*/)) {
      return new Line(LineType.LIST_ITEM, line);
    } else if (line.trim() === '') {
      return new Line(LineType.BLANK, line);
    } else {
      // Default to paragraph
      return new Line(LineType.TEXT, line);
    }
  });
}
