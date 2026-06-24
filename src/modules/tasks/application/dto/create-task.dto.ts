import { IsString, IsOptional, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1, {message: "El título es obligatorio"})
  @MaxLength(100, {message: "El título no puede exceder más de 100 caracteres"})
  @Matches(/\S/, { message: 'El título no puede estar vacío o contener solo espacios' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El título solo puede contener letras, números y espacios' })
title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, {message: "La descripción no puede exceder más de 500 caracteres"})
  description?: string;
}