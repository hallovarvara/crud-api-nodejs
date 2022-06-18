import { v4 as uuidv4 } from 'uuid';

let users = [];

export const findAll = async () => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const findById = async (id) => {
  return new Promise((resolve) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  });
};

export const create = async (user) => {
  return new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    resolve(newUser);
  });
};

export const update = async ({ id, userData }) => {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { ...users[index], ...userData };
    resolve(users[index]);
  });
};

export const remove = async (id) => {
  return new Promise((resolve) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
};
