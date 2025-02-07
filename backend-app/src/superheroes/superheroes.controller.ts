import { Controller, Post, Body, Get } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superheroes.service'; // Importing Superhero interface

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  addSuperhero(
    @Body('name') name: string,
    @Body('superpower') superpower: string,
    @Body('humilityScore') humilityScore: number,
  ) {
    if (humilityScore < 1 || humilityScore > 10 || isNaN(humilityScore)) {
      throw new Error('Humility score must be a number between 1 and 10');
    }
    this.superheroesService.createSuperhero(name, superpower, humilityScore);
  }

  @Get()
  getSuperheroes(): Superhero[] {
    // Specify the return type here as Superhero[]
    return this.superheroesService.getSuperheroes();
  }

  @Post()
  createSuperhero(
    @Body('name') name: string,
    @Body('superpower') superpower: string,
    @Body('humilityScore') humilityScore: number,
  ) {
    return this.superheroesService.createSuperhero(
      name,
      superpower,
      humilityScore,
    );
  }
}
