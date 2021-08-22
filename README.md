#### Table of contents

1. [Overview](#vois-backend-challenge)
   - [Features](#features)
   - [Dependencies](#dependencies)
2. [Repo structure](#repo-structure)
3. [How to Install](#how-to-install)
4. [Running the app](#running-the-app)
5. [E2E tests](#e2e-tests)
6. [Swagger Documentation](#swagger-documentation)

## VOIS Backend Challenge

The main idea of the task is to build an application to manage working tasks.

## Features

- As a user I can create tasks, so that all tasks for a project can be tracked.
- As a user I can change the status of a Task, so that the progress of the project can be tracked.
- As a user I can assign a task to another user, so that the responsibility of a task can be visualized.
- As a user I will see the history of a Task, so that I can track the history of a task.

## Dependencies

| Dependencies |  Version   |
| :----------- | :--------: |
| Node.js      | >= 12.13.1 |
| Typescript   |  >= 4.3.5  |
| MySQL        | >= 8.0.23  |
| @nestjs/cli  |  >= 8.0.0  |

## Repo structure:

```
- src/
   - config/
   - shared/
   - types/
   - utilities/
   - modules/
      - auth/
      - user/
      - task/
      - task-history/
```

## How to Install

```bash
$ npm i -g @nestjs/cli
$ npm install
$ mv .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## E2E tests

```bash
# e2e tests
$ npm run test:e2e
```

## Swagger Documentation

You can access Swagger documentation via [http://localhost:5000/swagger/](http://localhost:5000/swagger/)
![image](https://user-images.githubusercontent.com/32979588/130354548-9989d93e-69c8-4c2a-ae21-ca99ef0a7e85.png)

