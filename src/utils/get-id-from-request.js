import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants.js';

export const getIdFromRequest = (req) => {
  const url = req?.url || '';

  if (url === '') {
    return '';
  }

  const id = req?.url?.replace(URL_BEFORE_USER_ID_ROUTE_REGEX, '');
  const restPathPartIndex = id.indexOf('/') + 1;
  return restPathPartIndex > 0 ? id.slice(0, id.indexOf('/') + 1) : id;
};
