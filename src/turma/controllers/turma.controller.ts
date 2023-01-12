import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Delete, UseGuards, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { TurmaService } from '../services/turma.service';
import { Turma } from '../entities/turma.entity';





@ApiTags("/Turma")
@Controller("/turma")
export class TurmaController{
    constructor ( private readonly turmaService: TurmaService) {}


    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Turma[]> {
        return this.turmaService.findAll();
    }

    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Turma> {
        return this.turmaService.findById(id);
    }

    @Get('/search/:turma')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('turma') descricao: string): Promise<Turma[]> {
        return this.turmaService.findByName(descricao);
    }

    @Post('/criar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body()turma: Turma): Promise<Turma>{
    return this.turmaService.create(turma)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body()turma: Turma): Promise<Turma> {
        return this.turmaService.update(turma)
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.turmaService.delete(id)
    }
}