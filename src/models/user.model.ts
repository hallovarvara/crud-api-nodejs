import { pid } from 'process';
import { v4 as uuidv4 } from 'uuid';
import { UserDataT, UsersDatabaseT, UserT } from '../types/user.types';

let users: UserT[] = [];

process.on('message', (message: UserT[]) => {
  users = message;
});

export const findAll = async (): Promise<UsersDatabaseT> =>
  new Promise((resolve) => {
    process.send?.({ users, pid });
    resolve(users);
  });

export const findById = async (id: string): Promise<UserT | undefined> =>
  new Promise((resolve) => {
    const user = users.find((u) => u.id === id);
    process.send?.({ users, pid });
    resolve(user);
  });

export const create = async (user: UserDataT): Promise<UserT> =>
  new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    process.send?.({ users, pid });
    resolve(newUser);
  });

type UserUpdateF = (props: {
  id: string;
  userData: UserDataT;
}) => Promise<UserT | undefined>;

export const update: UserUpdateF = async ({ id, userData }) => {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { ...users[index], ...userData };
    process.send?.({ users, pid });
    resolve(users[index]);
  });
};

export const remove = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    users = users.filter((user) => user.id !== id);
    process.send?.({ users, pid });
    resolve();
  });
};
