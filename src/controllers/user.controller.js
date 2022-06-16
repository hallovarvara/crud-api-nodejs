import * as User from '../models/user.model.js';
import { STATUS_CODE_SUCCESS } from '../constants.js';

/*
   @desc  Gets all users
   @route GET /api/users
*/
export const getUsers = async ({ req, res }) => {
  try {
    const users = await User.findAll();

    res.statusCode = STATUS_CODE_SUCCESS;
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
