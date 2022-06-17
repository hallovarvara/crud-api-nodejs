import path from 'path';
import usersDb from '../../data/users-example.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/write-data-to-file.js';
import { getDirname } from '../utils/get-dirname.js';

let users = [...usersDb];

const DATABASE_PATH = path.resolve(
  getDirname(import.meta.url),
  '../../data/users-example.json',
);

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  });
};

export const create = async (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    writeDataToFile({ filename: DATABASE_PATH, content: users });
    resolve(newUser);
  });
};
