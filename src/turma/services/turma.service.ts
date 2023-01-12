import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Turma } from "../entities/turma.entity";

@Injectable()
export class TurmaService {
    constructor(
        @InjectRepository(Turma)
        private turmaRepository: Repository<Turma>
    ) { }

    // Encontrar as Turmas do Banco de Dados
    async findAll(): Promise<Turma[]> {
        return await this.turmaRepository.find({
            relations: {
                grupo: true
            }
        });
    }

    // Encontrar Turma pelo ID
    async findById(id: number): Promise<Turma> {
        let turma = await this.turmaRepository.findOne({
            where: {
                id
            },
            relations: {
                grupo: true
            }
        });
        if (!turma) {
            throw new HttpException('Id relacionado a turma não identificado.', HttpStatus.NOT_FOUND)
        }
        return turma;
    }

    // Encontrar pela Descrição
    async findByName(descricao: string): Promise<Turma[]> {
        return await this.turmaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                grupo: true
            }
        })
    }

    // Criar uma Turma
    async create(turma: Turma): Promise<Turma> {
        return await this.turmaRepository.save(turma)
    }

    // Atualizar uma Turma
    async update(turma: Turma): Promise<Turma> {
        let buscaTurma: Turma = await this.findById(turma.id)

        if (!buscaTurma || !turma.id) {
            throw new HttpException('Id relacionado a turma não existe', HttpStatus.NOT_FOUND)
        }
        return await this.turmaRepository.save(turma)
    }

    // Deletar uma Turma
    async delete(id: number): Promise<DeleteResult> {
        let buscaTurma: Turma = await this.findById(id)

        if (!buscaTurma) {
            throw new HttpException("Id relacionado a turma não existe.", HttpStatus.NOT_FOUND)
        }
        return await this.turmaRepository.delete(id)
    }

}