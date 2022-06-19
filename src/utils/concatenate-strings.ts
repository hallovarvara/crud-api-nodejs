import { isStringEmpty } from './is-string-empty';
import { isUndefined } from './is-undefined';

export const concatenateStrings = (
  ...strings: Array<string | undefined>
): string =>
  strings.reduce((result: string, str) => {
    if (isUndefined(str) || isStringEmpty(str)) {
      return result;
    }

    if (isStringEmpty(result)) {
      return str;
    }

    return result.slice(-1) === '.' ? `${result} ${str}` : `${result}. ${str}`;
  }, '');
