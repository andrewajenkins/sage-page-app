import { Line, LineType } from '../../shared/models/line';

export function parseText(text: string): Line[] {
  const lines = text.split('\n'); // Split the text into lines
  return lines
    .map((line) => {
      if (line.startsWith('######')) {
        const value = line.replace('###### ', '');
        return new Line(LineType.HEADING6, line, value, '          ' + value);
      } else if (line.startsWith('#####')) {
        const value = line.replace('##### ', '');
        return new Line(LineType.HEADING5, line, value, '        ' + value);
      } else if (line.startsWith('####')) {
        const value = line.replace('#### ', '');
        return new Line(LineType.HEADING4, line, value, '      ' + value);
      } else if (line.startsWith('###')) {
        const value = line.replace('### ', '');
        return new Line(LineType.HEADING3, line, value, '    ' + value);
      } else if (line.startsWith('##')) {
        const value = line.replace('## ', '');
        return new Line(LineType.HEADING2, line, value, '  ' + value);
      } else if (line.startsWith('#')) {
        const value = line.replace('# ', '');
        return new Line(LineType.HEADING1, line, value, value);
      } else if (line.match(/^\d+/)) {
        return new Line(LineType.ORDERED_LIST_ITEM, line, line, line);
      } else if (line.startsWith('*') || line.startsWith('-')) {
        return new Line(LineType.UNORDERED_LIST_ITEM, line, line, line);
      } else if (line.trim() === '') {
        return new Line(LineType.BLANK, line, line, line);
      } else {
        // Default to paragraph
        return new Line(LineType.TEXT, line, line, line);
      }
    })
    .filter((line) => line.type != LineType.BLANK);
}
