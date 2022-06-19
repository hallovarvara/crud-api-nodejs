import http from 'http';
import { pid } from 'process';
import { config } from 'dotenv';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './controllers/user.controller';

import { getIdFromRequest } from './utils/get-id-from-request';
import { checkRequestUrlHasId } from './utils/check-request-url-has-id';
import { STATUS_CODE_NOT_FOUND, PORT_DEFAULT } from './constants';
import { handleError } from './utils/handle-error';

config();

export const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('PID', pid);

  const isUrlToUsersEndpoint =
    req.url === '/api/users' || req.url === '/api/users/';

  if (isUrlToUsersEndpoint && req.method === 'GET') {
    await getUsers({ res });
  } else if (checkRequestUrlHasId(req) && req.method === 'GET') {
    const id = getIdFromRequest(req);
    await getUser({ res, id });
  } else if (isUrlToUsersEndpoint && req.method === 'POST') {
    await createUser({ req, res });
  } else if (checkRequestUrlHasId(req) && req.method === 'PUT') {
    const id = getIdFromRequest(req);
    await updateUser({ res, req, id });
  } else if (checkRequestUrlHasId(req) && req.method === 'DELETE') {
    const id = getIdFromRequest(req);
    await removeUser({ res, id });
  } else {
    handleError({
      message:
        'Route is incorrect. Try to check API documentation in README.md for accessing correct url',
      res,
      statusCode: STATUS_CODE_NOT_FOUND,
    });
  }
});

const PORT = process.env['PORT'] || PORT_DEFAULT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
