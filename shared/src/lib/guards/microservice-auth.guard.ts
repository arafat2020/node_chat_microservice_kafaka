import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from 'src/lib/interfaces/auth-response.interface.js';

export function RPC_AuthGuard(
  verifyTopic: string,
  kafkaCLient: ClientKafka
): Type<CanActivate> {
  @Injectable()
  class RPC_MixinGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const RPC_Context = context.switchToRpc().getContext<KafkaContext>();
      const headers = RPC_Context.getMessage().headers || {};

      const token = headers.authorization
        ? headers.authorization.toString()
        : null;

      if (!token) {
        throw new UnauthorizedException('Missing token in Kafka headers');
      }

      try {

        const response: AuthResponse = await firstValueFrom(
          kafkaCLient.send<AuthResponse, string>(verifyTopic, token)
        );

        if (!response.success) {
          throw new UnauthorizedException(response.message || 'Invalid token');
        }

        (RPC_Context as any).user = response.data;

        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
            ? error
            : 'Token verification failed';
        throw new UnauthorizedException(message);
      }
    }
  }

  return mixin(RPC_MixinGuard);
}
