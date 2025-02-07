import { Module } from '@nestjs/common';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SuperheroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
