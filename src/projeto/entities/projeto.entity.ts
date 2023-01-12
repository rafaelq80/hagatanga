import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grupo } from "../../grupo/entities/grupo.entity";


@Entity({ name: "tb_projeto" })
export class Projeto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 50, nullable: false })
    nomeProjeto: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    linkProjeto: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    pitProjeto: string;

    @ApiProperty()
    @OneToMany(() => Grupo, (grupo) => grupo.projeto)
    grupo: Grupo[]

}

