import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grupo } from "../../grupo/entities/grupo.entity";


@Entity({ name: "tb_turma" })
export class Turma {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    descricao: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    isAtivo: boolean;

    @ApiProperty()
    @OneToMany(() => Grupo, (grupo) => grupo.turma)
    grupo: Grupo[]


}

