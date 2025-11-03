import { Global, Module } from '@nestjs/common';
import { kafkaModule } from './kafka/kafka.module';
import { DdbService } from './db/db.service';

@Global()
@Module({
  providers: [DdbService],
  imports: [kafkaModule],
  exports: [DdbService],
})
export class LibModule {}
