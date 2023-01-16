import { IncomingMessage } from 'http';
import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants';
import { isStringEmpty } from './is-string-empty';

export const getIdFromRequest = (req: IncomingMessage): string => {
  const url = req?.url || '';

  if (isStringEmpty(url)) {
    return '';
  }

  return url.replace(URL_BEFORE_USER_ID_ROUTE_REGEX, '');
};
