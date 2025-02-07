import { Injectable } from '@nestjs/common';

export interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [];

  // Add a new superhero
  createSuperhero(name: string, superpower: string, humilityScore: number) {
    const newHero: Superhero = { name, superpower, humilityScore };
    this.superheroes.push(newHero);
  }

  // Get all superheroes sorted by humility score descending order
  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
