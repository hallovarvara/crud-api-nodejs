import { server } from '../index';
import request from 'supertest';

describe('scenario 3: fail on fail', () => {
  const correctUserData = {
    username: 'maria',
    age: 28,
    hobbies: ['baseball', 'reading', 'boxing', 'hiking'],
  };

  const incorrectUserData = {
    username: 'maria',
    age: '28',
    hobbies: ['baseball', 0, 'reading', 'boxing', 'hiking'],
  };

  let brokenId = '123';
  let userId: string;

  it("prerequisites → should create new user and store it's id", async () => {
    const response = await request(server)
      .post('/api/users')
      .send(correctUserData);

    expect(response.statusCode).toBe(201);

    userId = response.body.id || '';
  });

  it('should fail returning all users because of url', async () => {
    const response = await request(server).get('/api/users//');
    expect(response.statusCode).toBe(400);
  });

  it('should fail creating new user because of incorrect data', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(incorrectUserData);

    expect(response.statusCode).toBe(400);
  });

  it('should fail on getting user by invalid id', async () => {
    const response = await request(server).get(`/api/users/${brokenId}`);
    expect(response.statusCode).toBe(400);
  });

  it('should fail updating existing user because of incorrect data', async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(incorrectUserData);

    expect(response.statusCode).toBe(400);
  });

  it('should fail deleting existing user because of invalid id', async () => {
    const response = await request(server).delete(`/api/users/${brokenId}`);
    expect(response.statusCode).toBe(400);
  });

  it('should fail deleting non-existent user', async () => {
    brokenId = userId.replace('1', '2').replace('3', '4').replace('5', '6');
    const response = await request(server).delete(`/api/users/${brokenId}`);
    expect(response.statusCode).toBe(404);
  });

  afterAll(async () => {
    await server.close();
  });
});
