import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterDto } from '../../application/dto/register.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { AuthResponseDto } from '../../application/dto/auth-response.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }
}