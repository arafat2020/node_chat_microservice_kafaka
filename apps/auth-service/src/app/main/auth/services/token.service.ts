import { Injectable } from '@nestjs/common';
import { JwtService } from '../../../lib/utils/jwt.service';
import { PromiseMapResponse } from '@node-chat/shared';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

    public async verifyToken(token: string): PromiseMapResponse {
        const verificationResult = await this.jwtService.verifyToken(token);
        if (!verificationResult.valid) {
            return {
                success: false,
                message: verificationResult.message || 'Token is invalid',
                data: null,
            };
        }
        return {
            success: true,
            message: 'Token is valid',
            data: verificationResult.payload,
        };
    }
}
