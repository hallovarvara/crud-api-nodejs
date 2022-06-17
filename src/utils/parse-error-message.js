import { isUndefined } from './is-undefined.js';

export const parseErrorMessage = (errorMessage) => {
  if (isUndefined(errorMessage)) {
    return '';
  } else if (
    errorMessage.includes('Unexpected') &&
    errorMessage.includes('JSON')
  ) {
    return 'Incorrect request body, please fix it and try again';
  } else {
    return errorMessage;
  }
};
