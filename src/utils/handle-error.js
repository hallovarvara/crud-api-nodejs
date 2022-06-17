import { STATUS_CODE_SERVER_ERROR } from '../constants.js';
import { concatenateStrings } from './concatenate-strings.js';
import { parseErrorMessage } from './parse-error-message.js';

export const handleError = ({
  error,
  message: customMessage,
  res,
  statusCode = STATUS_CODE_SERVER_ERROR,
}) => {
  const errorMessage = parseErrorMessage(error?.message);

  const message =
    concatenateStrings(customMessage, errorMessage) ||
    `${STATUS_CODE_SERVER_ERROR}. Unexpected server error, try to check request body, url or header parameters`;

  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
