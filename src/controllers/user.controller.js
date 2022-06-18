import * as User from '../models/user.model.js';

import { getPostData } from '../utils/get-post-data.js';
import { handleErrorUserNotFound } from '../utils/handle-error-user-not-found.js';
import { validateUserId } from '../utils/validate-user-id.js';
import { isUndefined } from '../utils/is-undefined.js';
import { isString } from '../utils/is-string.js';
import { isArray } from '../utils/is-array.js';
import { isNumber } from '../utils/is-number.js';
import { handleError } from '../utils/handle-error.js';

import {
  STATUS_CODE_CREATED,
  STATUS_CODE_INVALID_INPUT,
  STATUS_CODE_SUCCESS,
} from '../constants.js';

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
    handleError({
      error,
      message: 'Problem with getting all users request',
      res,
    });
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
    handleError({
      error,
      message: 'Problem with getting user by id request',
      res,
    });
  }
};

/*
   @desc  Creates a new user
   @route POST /api/users
*/
export const createUser = async ({ req, res }) => {
  try {
    const bodyJson = await getPostData({ req });
    const body = await JSON.parse(bodyJson);
    const { username, age, hobbies } = body;

    if (
      [username, age, hobbies].some(isUndefined) ||
      !isString(username) ||
      !isNumber(age) ||
      !isArray(hobbies) ||
      (isArray(hobbies) && hobbies.some((hobby) => !isString(hobby)))
    ) {
      handleError({
        statusCode: STATUS_CODE_INVALID_INPUT,
        message: `Request doesn't contain required fields or types of these are invalid. Please pass 'username' string, 'age' number and 'hobbies' array of strings (or empty one)`,
        res,
      });

      return;
    }

    const user = { username, age, hobbies };
    const newUser = await User.create(user);

    res.statusCode = STATUS_CODE_CREATED;
    res.end(JSON.stringify(newUser));
  } catch (error) {
    handleError({ error, message: 'Problem with creating user request', res });
  }
};

/*
   @desc  Updates user by id
   @route PUT /api/user/:id
*/
export const updateUser = async ({ req, res, id }) => {
  try {
    validateUserId({ res, id });

    const user = await User.findById(id);

    if (!user) {
      handleErrorUserNotFound({ res, id });
    } else {
      const bodyJson = await getPostData({ req });
      const body = await JSON.parse(bodyJson);
      const { username, age, hobbies } = body;

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatedUser = await User.update({ id, userData });

      res.statusCode = STATUS_CODE_SUCCESS;
      res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    handleError({ error, message: 'Problem with updating user request', res });
  }
};
