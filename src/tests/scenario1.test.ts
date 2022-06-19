import { server } from '../index';
import request from 'supertest';

describe('scenario 1: user lifecycle', () => {
  const exampleUserData = {
    username: 'balin',
    age: 113,
    hobbies: ['eating', 'eating', 'eating more'],
  };

  const updatedUserData = {
    username: 'john',
    age: 17,
    hobbies: ['shopping', 'making photo', 'astrology'],
  };

  let userId: string;

  it('should return all users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  it('should create new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(exampleUserData);

    expect(response.statusCode).toBe(201);

    const { body: user = {} } = response;

    userId = user.id;

    expect(user).toEqual({ ...exampleUserData, id: userId });
  });

  it('should get new user by id', async () => {
    const response = await request(server).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);

    const { body: user = {} } = response;

    expect(user).toEqual({ ...exampleUserData, id: userId });
  });

  it('should update user', async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUserData);

    expect(response.statusCode).toBe(200);

    const { body: user = {} } = response;

    expect(user).toEqual({ ...updatedUserData, id: userId });
  });

  it('should delete user', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  it('should fail on getting new user by id', async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(404);
  });

  afterAll(async () => {
    await server.close();
  });
});
