import { STATUS_CODE_NOT_FOUND } from '../constants.js';

export const handleErrorUserNotFound = ({ res, id }) => {
  res.statusCode = STATUS_CODE_NOT_FOUND;

  res.end(
    JSON.stringify({
      message: `User with id '${id}' wasn't found. Try to pass another id parameter`,
    }),
  );
};
