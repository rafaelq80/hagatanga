import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Grupo } from "../entities/grupo.entity";


@Injectable()
export class GrupoService {
    constructor(
        @InjectRepository(Grupo)
        private grupoRepository: Repository<Grupo>
    ) { }

    // Encontrar os Grupos do Banco de Dados
    async findAll(): Promise<Grupo[]> {
        return await this.grupoRepository.find({
            relations:{
                turma: true,
                projeto: true
            }
        });
    }

    // Encontrar pelo ID
    async findById(id: number): Promise<Grupo> {
        let grupo = await this.grupoRepository.findOne({
            where: {
                id
            },
            relations:{
                turma: true,
                projeto: true
            }
        });
        if (!grupo) {
            throw new HttpException('Id relacionado a Projeto não identificado.', HttpStatus.NOT_FOUND)
        }
        return grupo;
    }


    // Encontrar pelo Número do Grupo
    async findByGroup(numeroGrupo: number): Promise<Grupo> {
        let grupo = await this.grupoRepository.findOne({
            where: {
                numeroGrupo
            },
            relations:{
                turma: true,
                projeto: true
            }
        });
        if (!grupo) {
            throw new HttpException('Id relacionado a Projeto não identificado.', HttpStatus.NOT_FOUND)
        }
        return grupo;
    }

    // Criar um Grupo
    async create(grupo: Grupo): Promise<Grupo> {
        return await this.grupoRepository.save(grupo)
    }

    // Atualizar um Grupo
    async update(grupo: Grupo): Promise<Grupo> {
        let buscaGrupo: Grupo = await this.findById(grupo.id)

        if (!buscaGrupo || !grupo.id) {
            throw new HttpException('Id relacionado a projeto não existe', HttpStatus.NOT_FOUND)
        }
        return await this.grupoRepository.save(grupo)
    }

    // Deletar um Grupo
    async delete(id: number): Promise<DeleteResult> {
        let buscaGrupo: Grupo = await this.findById(id)

        if (!buscaGrupo) {
            throw new HttpException("Id relacionado ao projeto não existe.", HttpStatus.NOT_FOUND)
        }
        return await this.grupoRepository.delete(id)
    }

}