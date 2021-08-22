import 'dotenv/config';
import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../src/modules/database/database.service';

import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { taskStub } from './stubs/task.stub';
import { userStub2 } from './stubs/user.stub';

import { User } from '../src/modules/user/user.entity';
import { Task } from '../src/modules/task/task.entity';
import { TaskHistory } from '../src/modules/task-history/task-history.entity';
import { UserRepository } from '../src/modules/user/user.repository';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;
  let userAccessToken: string;
  let userCreated: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
    const signupResponse = await request(app.getHttpServer()).post('/auth/signup').send(userStub2);
    userCreated = signupResponse?.body?.data;
    const signinResponse = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({email:userStub2.email, password: userStub2.password});
    const accessToken = signinResponse.body.accessToken;
    userAccessToken = accessToken;
    
  });

  afterAll(async () => {
    await dbConnection
    .createQueryBuilder()
    .delete()
    .from(TaskHistory)
    .execute();
  await dbConnection.createQueryBuilder().delete().from(Task).execute();
  await dbConnection.createQueryBuilder().delete().from(User).execute();
    await Promise.all([
      app.close(),
    ])
  })

  describe('/api/task (POST)', () => {
    it('Shoud create new task', async () => {
      return request(app.getHttpServer())
      .post('/task')
      .send({ ...taskStub, assignee: userCreated?.id })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .expect(HttpStatus.CREATED);
    });
  });

  describe('/api/task (GET)', () => {
    it('Shoud return all tasks', () => {
      return request(app.getHttpServer())
        .get('/task')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(HttpStatus.OK);
    });
  });
});
