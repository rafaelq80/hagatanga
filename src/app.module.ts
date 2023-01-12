import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './Projeto/entities/projeto.entity';
import { AppController } from './app.controller';
import { ProjetoModule } from './projeto/projeto.module';
import { Turma } from './turma/entities/turma.entity';
import { TurmaModule } from './turma/turma.module';
import { Grupo } from './grupo/entities/grupo.entity';
import { GrupoModule } from './grupo/grupo.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_hagatanga',
      entities: [Projeto, Grupo, Turma],
      synchronize: true
    }),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    TurmaModule,
    ProjetoModule,
    GrupoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

