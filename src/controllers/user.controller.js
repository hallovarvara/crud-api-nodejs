import * as User from '../models/user.model.js';
import { STATUS_CODE_SUCCESS } from '../constants.js';
import { handleErrorUserNotFound } from '../utils/handle-error-user-not-found.js';
import { validateUserId } from '../utils/validate-user-id.js';

/*
   @desc  Gets all users
   @route GET /api/users
*/
export const getUsers = async ({ res }) => {
  try {
    const users = await User.findAll();

    res.statusCode = STATUS_CODE_SUCCESS;
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

/*
   @desc  Gets one user by id
   @route GET /api/user/:id
*/
export const getUser = async ({ res, id }) => {
  try {
    validateUserId({ res, id });

    const user = await User.findById(id);

    if (!user) {
      handleErrorUserNotFound({ res, id });
    } else {
      res.statusCode = STATUS_CODE_SUCCESS;
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};
