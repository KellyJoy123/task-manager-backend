import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const exists = await this.userRepository.exists(registerDto.email);
    if (exists) {
      throw new ConflictException('El email ya está registrado');
    }

    const user = new User(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );

    const createdUser = await this.userRepository.create(user);
    
    if (!createdUser.id || !createdUser.email || !createdUser.name) {
      throw new Error('Error al crear el usuario');
    }

    const payload = { sub: createdUser.id, email: createdUser.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      },
    };
  }
}