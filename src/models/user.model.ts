import { UserDataT, UsersDatabaseT, UserT } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

let users: UserT[] = [];

export const findAll = async (): Promise<UsersDatabaseT> =>
  new Promise((resolve) => {
    resolve(users);
  });

export const findById = async (id: string): Promise<UserT | undefined> =>
  new Promise((resolve) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  });

export const create = async (user: UserDataT): Promise<UserT> =>
  new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
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
    resolve(users[index]);
  });
};

export const remove = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
};
