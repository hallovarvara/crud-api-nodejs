import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants.js';

export const getIdFromRequest = (req) => {
  const url = req?.url || '';

  if (url === '') {
    return '';
  }

  return req?.url?.replace(URL_BEFORE_USER_ID_ROUTE_REGEX, '');
};
