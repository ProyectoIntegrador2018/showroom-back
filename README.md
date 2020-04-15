# Showroom Backend

## Commands

These commands are available in `package.json`.

```bash
npm test # test using Jest
npm run coverage # test and open the coverage report in the browser
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

#### 1. Playing locally (Installing MongoDB)

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance and create a folder /data/db/ in the root drive (windows)

To run MongoDB: 
```bash
$ mongod
```
Or on windows, run mongod.exe


#### 2. After you've installed MongoDB, clone the repository of the project and install the dependencies.

```shell
$ git clone https://github.com/Angulz/showroom-back.git
$ cd showroom-back
$ npm install
```

#### 3. Run de server in development mode

```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

#### X. Use Cases
Create a user (sign up):
```bash
curl -X POST http://0.0.0.0:9000/users -i -d "email=test@example.com&password=123456"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "id": "57d8160eabfa186c7887a8d3",
  "name": "test",
  "picture":"https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
  "email": "test@example.com",
  "createdAt": "2016-09-13T15:06:54.633Z"
}
```

Authenticate the user (sign in):
```bash
curl -X POST http://0.0.0.0:9000/auth -i -u test@example.com:123456 -d
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "id": "57d8160eabfa186c7887a8d3",
    "name": "test",
    "picture": "https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
    "email": "test@example.com",
    "createdAt":"2016-09-13T15:06:54.633Z"
  }
}
```

Now you can use the `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` token (it's usually greater than this) to call user protected APIs. For example, you can create a new `article` API using `yo rest:api` and make the `POST /articles` endpoint only accessible to authenticated users. Then, to create a new article you must pass the `access_token` parameter.
```bash
curl -X POST http://0.0.0.0:9000/articles -i -d "title=Awesome Article&content=Yeah Baby&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "id": "57d819bfabfa186c7887a8d6",
  "title": "Awesome Article",
  "content": "Yeah Baby",
  "createdAt": "2016-09-13T15:22:39.846Z",
  "updatedAt":"2016-09-13T15:22:39.846Z"
}
```

> Some endpoints are only accessible by admin users. To create an admin user, just pass the `role=admin` along to other data when calling `POST /users`.


## Directory structure

### Overview

The `src` and `api` directories contain most of the code that can be modified.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
