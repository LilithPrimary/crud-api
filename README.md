# crud-api

*Hello!*

## How to start

**For use this API please:**

1) Copy repository to you computer use this command:

> git clone git@github.com:LilithPrimary/crud-api.git

2) Change directory:

> cd crud-api

3) Install deps:

> npm i

**Now you can use scripts:**

> npm run start:dev

for development. Nodemon and ts-node are used.

> npm run start:prod

for production mode. Webpack on prod mode and ts-node are used.

> npm test

for watching test cases

> npm test:coverage

for watching test coverage

## Implemented endpoint: api/users

GET api/users - to get all users

GET api/users/${userId} - to get user by id (uuid)

POST api/users - to create record about new user and store it in database

PUT api/users/${userId} - to update existing user  

DELETE api/users/${userId} - to delete existing user from database

User JSON for request body (all fields required):

```ts
{  
  "username": string,  
  "age": number,  
  "hobbies": []  
}
```


*Thank you!*
