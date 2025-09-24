import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as Argon2 from 'argon2';

@Injectable()
export class HashService {
  async getHashed(plainStr: string): Promise<string> {
    try {
      const hash = await Argon2.hash(plainStr);
      return hash;
    } catch (error) {
      throw new HttpException(
        {
          msg: 'Something went wrong',
          obj: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async VerifyPassword({
    HashedPassword,
    PlainPassword,
  }: {
    HashedPassword: string;
    PlainPassword: string;
  }) {
    try {
      return await Argon2.verify(HashedPassword, PlainPassword);
    } catch (error) {
      throw new HttpException(
        {
          msg: 'Something went wrong',
          obj: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
