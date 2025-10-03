import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from '../../lib/kafka.service';
import { SignInDto, SignUpDto} from '@node-chat/shared';
import type { PromiseMapResponse } from '@node-chat/shared';
import { lastValueFrom } from 'rxjs';
import { TokenVerificationDto } from './dto/token.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

  constructor(private readonly kafkaService: KafkaService) {}

  @Post('sign_in')
  async signIn(@Body() signInDto: SignInDto): PromiseMapResponse {
    return await lastValueFrom(
        this.kafkaService.send('user.signin', signInDto)
    );
  }

  @Post('sign_up')
  async signUp(@Body() signUpDto: SignUpDto): PromiseMapResponse {
    return await lastValueFrom(
       this.kafkaService.send('user.signup', signUpDto)
    );
  }
  
  @Post('verify_token')
  @ApiOperation({ summary: 'This is for testing porous, it will use in internal system' })
  async verifyToken(@Body() token: TokenVerificationDto): PromiseMapResponse {
    return await lastValueFrom(
       this.kafkaService.send('user.verifyToken', token.token)
    );
  }

}
