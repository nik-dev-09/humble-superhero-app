import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const mockSuperheroesService = {
      getSuperheroes: jest.fn().mockReturnValue([]), // Mock the method to return an empty array
      createSuperhero: jest.fn().mockResolvedValue(undefined), // Mock the createSuperhero method
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: mockSuperheroesService, // Use the mock service
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getSuperheroes from service', async () => {
    await controller.getSuperheroes(); // Call the controller's method
    expect(service.getSuperheroes).toHaveBeenCalled(); // Check if service method was called
  });

  it('should call createSuperhero from service', async () => {
    const newHero = {
      name: 'Test Hero',
      superpower: 'Flying',
      humilityScore: 8,
    };
    await controller.createSuperhero(
      newHero.name,
      newHero.superpower,
      newHero.humilityScore,
    ); // Pass arguments individually
    expect(service.createSuperhero).toHaveBeenCalledWith(
      newHero.name,
      newHero.superpower,
      newHero.humilityScore,
    ); // Ensure the service method was called with correct arguments
  });
});
