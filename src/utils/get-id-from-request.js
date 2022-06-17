import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants.js';

export const getIdFromRequest = (req) => {
  const url = req?.url || '';

  if (url === '') {
    return '';
  }

  const urlPathRemoved = req?.url?.replace(URL_BEFORE_USER_ID_ROUTE_REGEX, '');

  return urlPathRemoved.slice(0, urlPathRemoved.indexOf('/'));
};
