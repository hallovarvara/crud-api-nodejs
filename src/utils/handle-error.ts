import { ServerResponse } from 'http';
import { STATUS_CODE_SERVER_ERROR } from '../constants';
import { concatenateStrings } from './concatenate-strings';
import { parseErrorMessage } from './parse-error-message';
import { isError } from './is-error';

type HandleErrorF = (props: {
  res: ServerResponse;
  error?: unknown;
  message?: string;
  statusCode?: number;
}) => void;

export const handleError: HandleErrorF = ({
  error,
  message: customMessage,
  res,
  statusCode = STATUS_CODE_SERVER_ERROR,
}) => {
  const errorMessage = parseErrorMessage(isError(error) ? error.message : '');

  const message =
    concatenateStrings(customMessage, errorMessage) ||
    `${STATUS_CODE_SERVER_ERROR}. Unexpected server error, try to check request body, url or header parameters`;

  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
