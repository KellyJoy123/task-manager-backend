import { IsString, IsOptional, IsBoolean, MaxLength, MinLength, Matches } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'El título no puede estar vacío' })
  @MaxLength(100, { message: 'El título no puede exceder 100 caracteres' })
  @Matches(/\S/, { message: 'El título no puede contener solo espacios' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El título solo puede contener letras, números y espacios' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}