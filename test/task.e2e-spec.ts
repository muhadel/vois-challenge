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
  let userRepository: UserRepository;
  let createdTask: any;

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
    await request(httpServer).post('/auth/signup').send(userStub2);
  });

  describe('/api/task (POST)', () => {
    it('Shoud create new task', async () => {
      const authResponse = await request(httpServer)
        .post('/auth/signin')
        .send({ email: userStub2.email, password: userStub2.password });
      const accessToken = authResponse.body.accessToken;
      const users = await dbConnection
        .createQueryBuilder()
        .select()
        .from(User, 'user')
        .execute();
      userAccessToken = accessToken;
      const response = await request(app.getHttpServer())
        .post('/task')
        .send({ ...taskStub, assignee: users[0]?.id })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`);
      console.log('response__task', response);

      createdTask = response.body;
      expect(response.status).toBe(HttpStatus.CREATED);
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
