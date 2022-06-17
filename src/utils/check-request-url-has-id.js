import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants.js';

export const checkRequestUrlHasId = (req) =>
  URL_BEFORE_USER_ID_ROUTE_REGEX.test(req?.url || '');
