import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models/user.model';

import { getPostData } from '../utils/get-post-data';
import { handleErrorUserNotFound } from '../utils/handle-error-user-not-found';
import { validateUserId } from '../utils/validate-user-id';
import { isUndefined } from '../utils/is-undefined';
import { isString } from '../utils/is-string';
import { isArray } from '../utils/is-array';
import { isNumber } from '../utils/is-number';
import { handleError } from '../utils/handle-error';

import {
  MESSAGE_REQUIRED_FIELDS,
  STATUS_CODE_CREATED,
  STATUS_CODE_DELETED,
  STATUS_CODE_INVALID_INPUT,
  STATUS_CODE_SUCCESS,
} from '../constants';

import { UserDataT, UserT } from '../types/user.types';

/*
   @desc  Gets all users
   @route GET /api/users
*/

type GetUsersF = (props: { res: ServerResponse }) => void;

export const getUsers: GetUsersF = async ({ res }) => {
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

type GetAndRemoveUserF = (props: { res: ServerResponse; id: string }) => void;

export const getUser: GetAndRemoveUserF = async ({ res, id }) => {
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

type CreateUserF = (props: {
  req: IncomingMessage;
  res: ServerResponse;
}) => void;

export const createUser: CreateUserF = async ({ req, res }) => {
  try {
    const bodyJson = await getPostData({ req });
    const body = await JSON.parse(bodyJson);
    const { username, age } = body;
    const hobbies: UserT['hobbies'] = body.hobbies;

    if ([username, age, hobbies].some(isUndefined)) {
      handleError({
        statusCode: STATUS_CODE_INVALID_INPUT,
        message: `Request doesn't contain required fields. ${MESSAGE_REQUIRED_FIELDS}`,
        res,
      });

      return;
    } else if (
      !isString(username) ||
      !isNumber(age) ||
      !isArray(hobbies) ||
      (isArray(hobbies) && hobbies.some((hobby) => !isString(hobby)))
    ) {
      handleError({
        message: `Types of request fields are invalid. ${MESSAGE_REQUIRED_FIELDS}`,
        res,
      });

      return;
    }

    const user: UserDataT = { username, age, hobbies };
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

type UpdateUserF = (props: {
  req: IncomingMessage;
  res: ServerResponse;
  id: string;
}) => void;

export const updateUser: UpdateUserF = async ({ req, res, id }) => {
  try {
    validateUserId({ res, id });

    const user = await User.findById(id);

    if (!user) {
      handleErrorUserNotFound({ res, id });
      return;
    }

    const bodyJson = await getPostData({ req });
    const body = await JSON.parse(bodyJson);
    const { username, age } = body;
    const hobbies: UserT['hobbies'] = body.hobbies;

    if (
      !isString(username) ||
      !isNumber(age) ||
      !isArray(hobbies) ||
      (isArray(hobbies) && hobbies.some((hobby) => !isString(hobby)))
    ) {
      handleError({
        statusCode: STATUS_CODE_INVALID_INPUT,
        message: `Request fields data types are invalid. Please pass 'username' string, 'age' number, 'hobbies' array of strings or empty array`,
        res,
      });

      return;
    }

    const userData = {
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };

    const updatedUser = await User.update({ id, userData });

    res.statusCode = STATUS_CODE_SUCCESS;
    res.end(JSON.stringify(updatedUser));
  } catch (error) {
    handleError({ error, message: 'Problem with updating user request', res });
  }
};

/*
   @desc  Removes user by id
   @route DELETE /api/user/:id
*/
export const removeUser: GetAndRemoveUserF = async ({ res, id }) => {
  try {
    validateUserId({ res, id });

    const user = await User.findById(id);

    if (!user) {
      handleErrorUserNotFound({ res, id });
      return;
    }

    await User.remove(id);

    res.statusCode = STATUS_CODE_DELETED;
    res.end();
  } catch (error) {
    handleError({ error, message: 'Problem with deleting user request', res });
  }
};
