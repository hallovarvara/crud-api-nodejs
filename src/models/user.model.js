import usersDb from '../../data/users-example.json' assert { type: 'json' };

let users = [...usersDb];

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};
