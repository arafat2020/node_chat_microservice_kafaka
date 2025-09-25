import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibModule } from './lib/lib.module';

@Module({
  imports: [
    LibModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
