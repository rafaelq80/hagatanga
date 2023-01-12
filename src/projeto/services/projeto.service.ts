import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult, ILike } from "typeorm"
import { Projeto } from "../entities/projeto.entity";


@Injectable()
export class ProjetoService {
    constructor(
        @InjectRepository(Projeto)
        private projetoRepository: Repository<Projeto>
    ) { }

    // Encontrar as Projetos do Banco de Dados
    async findAll(): Promise<Projeto[]> {
        return await this.projetoRepository.find({
            relations: {
                grupo: true
            }
        });
    }

    // Encontrar pelo ID
    async findById(id: number): Promise<Projeto> {
        let projeto = await this.projetoRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true
            }
        });
        if (!projeto) {
            throw new HttpException('Id relacionado a Projeto não identificado.', HttpStatus.NOT_FOUND)
        }
        return projeto;
    }


    // Encontrar pelo Nome
    async findByName(nomeProjeto: string): Promise<Projeto[]> {
        return await this.projetoRepository.find({
            where: {
                nomeProjeto: ILike(`%${nomeProjeto}%`)
            },
            relations: {
                grupo: true
            }
        })
    }

    // Criar um Projeto
    async create(Projeto: Projeto): Promise<Projeto> {
        return await this.projetoRepository.save(Projeto)
    }

    // Atualizar um Projeto
    async update(projeto: Projeto): Promise<Projeto> {
        let buscaProjeto: Projeto = await this.findById(projeto.id)

        if (!buscaProjeto || !projeto.id) {
            throw new HttpException('Id relacionado a projeto não existe', HttpStatus.NOT_FOUND)
        }
        return await this.projetoRepository.save(projeto)
    }

    // Deletar um Projeto
    async delete(id: number): Promise<DeleteResult> {
        let buscaProjeto: Projeto = await this.findById(id)

        if (!buscaProjeto) {
            throw new HttpException("Id relacionado ao projeto não existe.", HttpStatus.NOT_FOUND)
        }
        return await this.projetoRepository.delete(id)
    }

}