import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginService } from './services/login.service';
import { CommonService } from './services/common.service';
import { AuthController } from './auth.controller';
import { SignUpService } from './services/signUp.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '3d'),
        },
      }),
    }),
  ],
  providers: [
    LoginService,
    CommonService,
    SignUpService
  ],
  controllers:[AuthController]
})
export class AuthModule {}
