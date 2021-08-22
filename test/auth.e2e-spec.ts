import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { userStub1 } from './stubs/user.stub';
import { DatabaseService } from '../src/modules/database/database.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    
  });

  describe('/api/auth/signup (POST)', () => {
    it('Shoud create new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(userStub1)
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
          expect(body.data.name).toEqual(userStub1.name);
          expect(body.data.email).toEqual(userStub1.email);
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/api/auth/signin (POST)', () => {
    it('/Should login with the reqistered user', () => {
      return request(app.getHttpServer())
      .post('/auth/signin')
      .send({email: userStub1.email, password: userStub1.password})
      .expect(({ body }) => {
        expect(body.tokenType).toEqual('Bearer');
        expect(body.accessToken).toBeDefined();
      })
      .expect(HttpStatus.CREATED)
    });
  })
});
