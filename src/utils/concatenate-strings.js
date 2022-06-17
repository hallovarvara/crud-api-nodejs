import { isStringEmpty } from './is-string-empty.js';
import { isUndefined } from './is-undefined.js';

export const concatenateStrings = (...strings) =>
  strings.reduce((result, str) => {
    if (isUndefined(str) || isStringEmpty(str)) {
      return result;
    }

    if (isStringEmpty(result)) {
      return str;
    }

    return result.slice(-1) === '.' ? `${result} ${str}` : `${result}. ${str}`;
  }, '');
