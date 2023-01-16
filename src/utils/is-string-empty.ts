import { isString } from './is-string';

export const isStringEmpty = (value: unknown): boolean =>
  isString(value) && value.length === 0;
