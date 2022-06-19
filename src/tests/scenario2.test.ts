import { server } from '../index';
import request from 'supertest';

describe('scenario 2: broken id consequences', () => {
  const exampleUserData = {
    username: 'jack',
    age: 31,
    hobbies: ['computer games', 'writing poems'],
  };

  let userId = '';
  let brokenId = '';

  it('should return empty database of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(exampleUserData);

    expect(response.statusCode).toBe(201);

    const { body: user = {} } = response;

    userId = user.id;

    expect(user).toEqual({
      ...exampleUserData,
      id: userId,
    });
  });

  it('should get user by correct id', async () => {
    const response = await request(server).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);

    const { body: user = {} } = response;

    userId = user.id;

    expect(user).toEqual({
      ...exampleUserData,
      id: userId,
    });
  });

  it('should fail with status 404 while getting user by incorrect valid id', async () => {
    brokenId = userId.replace('1', '2').replace('3', '4').replace('5', '6');

    const response = await request(server).get(`/api/users/${brokenId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  it('should fail with status 400 while getting user by incorrect invalid id', async () => {
    brokenId = '2';

    const response = await request(server).get(`/api/users/${brokenId}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  it('should return database of one user with correct id', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toBe(userId);
  });

  afterAll(async () => {
    await server.close();
  });
});
