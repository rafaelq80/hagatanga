import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Grupo } from '../entities/grupo.entity';
import { GrupoService } from '../services/grupo.service';

@ApiTags("/Grupo")
@Controller("/grupos")
export class GrupoController{
    constructor ( private readonly grupoService: GrupoService) {}

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Grupo[]> {
        return this.grupoService.findAll();
    }

    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Grupo> {
        return this.grupoService.findById(id);
    }

    @Get('/search/:grupo')
    @HttpCode(HttpStatus.OK)
    findByGroup(@Param('grupo', ParseIntPipe) numeroGrupo: number): Promise<Grupo> {
        return this.grupoService.findByGroup(numeroGrupo);
    }

    @Post('/criar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body()grupo: Grupo): Promise<Grupo>{
    return this.grupoService.create(grupo)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body()grupo: Grupo): Promise<Grupo> {
        return this.grupoService.update(grupo)
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.grupoService.delete(id)
    }
}