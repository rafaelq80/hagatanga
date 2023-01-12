import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoController } from './controllers/grupo.controller';
import { Grupo } from './entities/grupo.entity';
import { GrupoService } from './services/grupo.service';


@Module({
  imports: [TypeOrmModule.forFeature([Grupo])],
  controllers: [GrupoController],
  providers: [GrupoService],
  exports: [TypeOrmModule]
})
export class GrupoModule {}
