import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '../src/modules/database/database.service';
import { User } from '../src/modules/user/user.entity';
import { Task } from '../src/modules/task/task.entity';
import { TaskHistory } from '../src/modules/task-history/task-history.entity';
// import jest from 'jest'

describe('AppController (e2e)', () => {
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

  afterAll(async () => {
    // await dbConnection.getRepository('user').clear()
    // drop tables
    // await dbConnection.createQueryRunner().dropTable('task_history')
    // await dbConnection.createQueryRunner().dropTable('task');
    // await dbConnection.createQueryRunner().dropTable('user');
    // jest.setTimeout(30000)

    // const entities = dbConnection.entityMetadatas;
    
    // await dbConnection.getRepository('task_history').clear()
    // await dbConnection.getRepository('task').clear()
    // await dbConnection.getRepository('user').clear()
  //   for (const entity of entities) {
  //     const repository = dbConnection.getRepository(entity.name); // Get repository
  //     await repository.clear(); // Clear each entity table's content
  // }


    await dbConnection
      .createQueryBuilder()
      .delete()
      .from(TaskHistory)
      .execute();
    await dbConnection.createQueryBuilder().delete().from(Task).execute();
    await dbConnection.createQueryBuilder().delete().from(User).execute();
    // await dbConnection.createQueryRunner().dropTable('task_history');
    // await dbConnection.createQueryRunner().dropTable(User);
    // await dbConnection.createQueryRunner().dropTable('user');

    await Promise.all([app.close()]);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('_ping');
  });
});
