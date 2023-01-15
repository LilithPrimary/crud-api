import { createServer } from 'http';
import supertest from 'supertest';

import { BASE_URL } from '../src/constants/BASE_URL';
import { serverHandler } from '../src/server/serverHandler';
import { StatusCode } from '../src/types/StatusCode';
import { UserRequest } from '../src/types/UserRequest';
import { bodyValidator } from '../src/utils/BodyValidator';

const user: UserRequest = {
  username: 'test name',
  age: 0,
  hobbies: [],
};

describe('API TEST', () => {
  let userId;
  it('first GET should return empty array', async () => {
    const expected = [];

    const response = await supertest(createServer(serverHandler)).get(BASE_URL);

    expect(response.statusCode).toBe(StatusCode.Successful200);
    expect(response.body).toEqual(expected);
  });

  it('POST should return object', async () => {
    const response = await supertest(createServer(serverHandler))
      .post(BASE_URL)
      .send(JSON.stringify(user));

    const { id, ...body } = response.body;
    userId = id;

    expect(response.statusCode).toBe(StatusCode.Successful201);
    expect(() => bodyValidator(body)).not.toThrow(Error);
  });

  it('GET should return array with one element', async () => {
    const response = await supertest(createServer(serverHandler)).get(BASE_URL);

    expect(response.statusCode).toBe(StatusCode.Successful200);
    expect(response.body.length).toBe(1);
  });

  it('DELETE should return nothing', async () => {
    const response = await supertest(createServer(serverHandler)).delete(`${BASE_URL}/${userId}`);

    expect(response.statusCode).toBe(StatusCode.Successful204);
    expect(response.body).toBeFalsy();
  });

  it('GET user array should be empty again', async () => {
    const response = await supertest(createServer(serverHandler)).get(BASE_URL);

    expect(response.statusCode).toBe(StatusCode.Successful200);
    expect(response.body.length).toBe(0);
  });
});
