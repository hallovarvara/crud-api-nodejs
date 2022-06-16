import http from 'http';
import { STATUS_CODE_NOT_FOUND } from './constants.js';

import { getUsers } from './controllers/user.controller.js';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (
    (req.url === '/api/users' || req.url === '/api/users/') &&
    req.method === 'GET'
  ) {
    await getUsers({ req, res });
  } else {
    res.statusCode = STATUS_CODE_NOT_FOUND;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
