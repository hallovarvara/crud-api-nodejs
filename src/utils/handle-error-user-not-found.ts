import { ServerResponse } from 'http';
import { handleError } from './handle-error';
import { STATUS_CODE_NOT_FOUND } from '../constants';

type HandleErrorUserNotFoundF = (props: {
  res: ServerResponse;
  id: string;
}) => void;

export const handleErrorUserNotFound: HandleErrorUserNotFoundF = ({
  res,
  id,
}) => {
  handleError({
    message: `User with id '${id}' wasn't found. Try to pass another id`,
    res,
    statusCode: STATUS_CODE_NOT_FOUND,
  });
};
