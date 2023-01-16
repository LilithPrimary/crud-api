import { Color } from '../types/Color';

export const colorizeText = (color: Color, text: string) => {
  const style = {
    [Color.red]: '\x1b[31m',
    [Color.green]: '\x1b[32m',
    [Color.lightblue]: '\x1b[36m',
    [Color.yellow]: '\x1b[33m',
    end: '\x1b[0m',
  };

  return style[color] + text + style.end;
};
