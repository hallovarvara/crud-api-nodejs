import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { STATUS_CODE_INVALID_INPUT } from '../constants';

type ValidateUserIdF = (props: { res: ServerResponse; id: string }) => void;

export const validateUserId: ValidateUserIdF = ({ res, id }) => {
  if (!validate(id)) {
    res.statusCode = STATUS_CODE_INVALID_INPUT;

    res.end(
      JSON.stringify({ message: `User id '${id}' isn't valid. Pass valid id` }),
    );
  }
};
