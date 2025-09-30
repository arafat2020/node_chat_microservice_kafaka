import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginService } from './services/login.service';
import { SignInDto, SignUpDto } from '@node-chat/shared';
import type { PromiseMapResponse } from '@node-chat/shared';
import { SignUpService } from './services/signUp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly signUpService: SignUpService
  ) {}

  @MessagePattern('user.signin')
  async signIn(@Payload() signInDto: SignInDto): PromiseMapResponse {
    try {
      const result = await this.loginService.signIn(signInDto);
      return result;
    } catch (error) {
      return {
        data: null,
        message:
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as any).message
            : 'Sign in failed',
        success: false,
      };
    }
  }

  @MessagePattern('user.signup')
  async signUp(@Payload() sigUpDto: SignUpDto): PromiseMapResponse {
    // Implement sign-up logic here
    try {
      const result = await this.signUpService.signUp(sigUpDto);
      return result;
    } catch (error) {
      return {
        data: null,
        message:
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as any).message
            : 'SignUp in failed',
        success: false,
      };
    }
  }
}
