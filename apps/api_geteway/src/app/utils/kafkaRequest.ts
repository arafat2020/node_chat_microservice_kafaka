import { InternalServerErrorException } from "@nestjs/common";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

export async function kafkaRequest<T = any>(
  client: { send: (topic: string, payload: any) => any }, 
  topic: string,
  payload: any,
  timeoutMs = 5000,
): Promise<T> {
  return firstValueFrom(
    client.send(topic, payload).pipe(
      timeout(timeoutMs),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          return throwError(() => new InternalServerErrorException(`${topic} service unavailable (timeout)`));
        }
        return throwError(() => err);
      }),
    ),
  );
}
