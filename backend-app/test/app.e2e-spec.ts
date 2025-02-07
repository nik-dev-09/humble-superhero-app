import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Adjust path as needed
import { INestApplication } from '@nestjs/common';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import the actual AppModule for integration tests
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return an empty array for getSuperheroes', () => {
    return request(app.getHttpServer())
      .get('/superheroes') // Assuming the route is /superheroes
      .expect(200)
      .expect([]);
  });

  it('should create a new superhero', () => {
    const newHero = {
      name: 'Test Hero',
      superpower: 'Flying',
      humilityScore: 8,
    };
    return request(app.getHttpServer())
      .post('/superheroes')
      .send(newHero)
      .expect(201)
      .expect({
        ...newHero,
        id: expect.any(String), // Assuming the response includes the id
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
