import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoController } from './controllers/projeto.controller';
import { Projeto } from './entities/projeto.entity';
import { ProjetoService } from './services/projeto.service';


@Module({
  imports: [TypeOrmModule.forFeature([Projeto])],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [TypeOrmModule]
})
export class ProjetoModule {}
