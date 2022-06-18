import { isUndefined } from './is-undefined';

export const parseErrorMessage = (errorMessage?: string): string => {
  if (isUndefined(errorMessage)) {
    return '';
  } else if (
    errorMessage?.includes('Unexpected') &&
    errorMessage?.includes('JSON')
  ) {
    return 'Incorrect request body, please fix it and try again';
  } else {
    return errorMessage;
  }
};
