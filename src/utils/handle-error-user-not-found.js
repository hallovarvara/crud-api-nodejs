import { handleError } from './handle-error.js';
import { STATUS_CODE_NOT_FOUND } from '../constants.js';

export const handleErrorUserNotFound = ({ res, id }) => {
  handleError({
    message: `User with id '${id}' wasn't found. Try to pass another id`,
    res,
    statusCode: STATUS_CODE_NOT_FOUND,
  });
};
