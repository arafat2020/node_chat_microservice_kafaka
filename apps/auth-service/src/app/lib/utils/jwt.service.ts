import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService as JwtServiceRoot } from '@nestjs/jwt';


@Injectable()
export class JwtService{
    constructor(
        private readonly jwt: JwtServiceRoot,
        private readonly configService: ConfigService,
    ){}

    public async generateToken(user: { id: string; email: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwt.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '7d',
    });
  }
}