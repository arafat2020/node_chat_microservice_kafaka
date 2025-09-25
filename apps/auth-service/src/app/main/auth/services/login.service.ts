import { BadRequestException, Injectable } from '@nestjs/common';
import { HashService } from '../../../lib/utils/hash.service';
import { ApiResponse, SignInDto } from '@node-chat/shared';
import { CommonService } from './common.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly hashService: HashService,
    private readonly commonService: CommonService
  ) {}

  public async signIn({ email, password }: SignInDto): Promise<ApiResponse<Record<string, string>>> {

    const isEmailExist = await this.commonService.isEmailExist(email);
    if (!isEmailExist.isExist || !isEmailExist.user) {
      throw new BadRequestException('Email does not exist');
    }
    if (isEmailExist.user.password === null) {
      throw new BadRequestException(
        'Wrong way to sign in. Did you sign up with Google or Facebook?'
      );
    }
    const isPasswordMatched = await this.hashService.VerifyPassword({
      HashedPassword: isEmailExist.user.password,
      PlainPassword: password,
    });
    if (!isPasswordMatched) {
      throw new BadRequestException('Password is not correct');
    }

    return {
      data: {
        userId: isEmailExist.user.id,
        email: isEmailExist.user.email,
        name: isEmailExist.user.name,
      },
      message: 'User signed in successfully',
      success: true,
    };
  }
}
