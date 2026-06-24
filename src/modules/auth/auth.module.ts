import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserSchema, UserDocument } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtStrategy } from './presentation/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
         secret: configService.get<string>('JWT_SECRET') ||'supersecretkey',
         signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
 providers: [
    UserRepository,
    RegisterUseCase,
    LoginUseCase,
    JwtStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}