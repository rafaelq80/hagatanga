import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Delete, UseGuards, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ProjetoService } from '../services/projeto.service';
import { Projeto } from '../entities/projeto.entity';





@ApiTags("/Projeto")
@Controller("/projeto")
export class ProjetoController{
    constructor ( private readonly projetoService: ProjetoService) {}


    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Projeto[]> {
        return this.projetoService.findAll();
    }

    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
        return this.projetoService.findById(id);
    }

    @Get('/search/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nomeProjeto: string): Promise<Projeto[]> {
        return this.projetoService.findByName(nomeProjeto);
    }

    @Post('/criar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body()projeto: Projeto): Promise<Projeto>{
    return this.projetoService.create(projeto)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body()projeto: Projeto): Promise<Projeto> {
        return this.projetoService.update(projeto)
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.projetoService.delete(id)
    }
}