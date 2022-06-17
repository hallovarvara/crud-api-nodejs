import { validate } from 'uuid';
import { STATUS_CODE_INVALID_INPUT } from '../constants.js';

export const validateUserId = ({ res, id }) => {
  if (!validate(id)) {
    res.statusCode = STATUS_CODE_INVALID_INPUT;
    res.end(JSON.stringify({ message: `User id '${id}' isn't valid` }));
  }
};
