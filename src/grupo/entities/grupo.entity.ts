import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Projeto } from "../../Projeto/entities/projeto.entity";
import { Turma } from "../../turma/entities/turma.entity";


@Entity({ name: "tb_grupo" })
export class Grupo {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    numeroGrupo: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    maisInfos: string;

    @ApiProperty({ type: () => Projeto })
    @ManyToOne(() => Projeto, (projeto) => projeto.grupo, {
        onDelete: "CASCADE"
    })
    projeto: Projeto;

    @ApiProperty({ type: () => Turma })
    @ManyToOne(() => Turma, (turma) => turma.grupo, {
        onDelete: "CASCADE"
    })
    turma: Turma;

}

