import http from 'http';
import { STATUS_CODE_NOT_FOUND, PORT_DEFAULT } from './constants.js';

import {
  getUsers,
  getUser,
  createUser,
} from './controllers/user.controller.js';

import { getIdFromRequest } from './utils/get-id-from-request.js';
import { checkRequestUrlHasId } from './utils/check-request-url-has-id.js';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const isUrlToUsersEndpoint =
    req.url === '/api/users' || req.url === '/api/users/';

  if (isUrlToUsersEndpoint && req.method === 'GET') {
    await getUsers({ req, res });
  } else if (checkRequestUrlHasId(req) && req.method === 'GET') {
    const id = getIdFromRequest(req);
    await getUser({ res, req, id });
  } else if (isUrlToUsersEndpoint && req.method === 'POST') {
    await createUser({ req, res });
  } else {
    res.statusCode = STATUS_CODE_NOT_FOUND;

    res.end(
      JSON.stringify({
        message:
          'Route is incorrect. Try to check API documentation in README.md for accessing correct url',
      }),
    );
  }
});

const PORT = process.env.PORT || PORT_DEFAULT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
