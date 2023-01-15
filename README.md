# crud-api

_Hello!_

## How to start

**For use this API please:**

1. Copy repository to you computer use this command:

> git clone git@github.com:LilithPrimary/crud-api.git

2. Change directory:

> cd crud-api

3. Install deps:

> npm i

4. Rename

> .env.example

to

> .env

**Now you can use scripts:**

> npm run start:dev

for development. Nodemon and ts-node are used.

> npm run start:prod

for production mode. Webpack on prod mode is used.

> npm test

for watching test cases

> npm test:coverage

for watching test coverage

## Implemented endpoint: api/users

**GET** _api/users_ - to get all users

**GET** _api/users/${userId}_ - to get user by id (uuid)

**POST** _api/users_ - to create record about new user and store it in database

**PUT** _api/users/${userId}_ - to update existing user

**DELETE** _api/users/${userId}_ - to delete existing user from database

User JSON for request body (all fields required):

```ts
{
  "username": string,
  "age": number,
  "hobbies": []
}
```

_Thank you!_
