import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.id || !user.email || !user.name) {
      throw new Error('Datos de usuario inválidos');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}