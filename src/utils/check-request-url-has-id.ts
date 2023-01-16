import { IncomingMessage } from 'http';

import { URL_BEFORE_USER_ID_ROUTE_REGEX } from '../constants';

export const checkRequestUrlHasId = (req: IncomingMessage): boolean =>
  URL_BEFORE_USER_ID_ROUTE_REGEX.test(req?.url || '');
