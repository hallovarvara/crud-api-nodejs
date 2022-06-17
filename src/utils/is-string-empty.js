import { isString } from './is-string.js';

export const isStringEmpty = (value) => isString(value) && value.length === 0;
