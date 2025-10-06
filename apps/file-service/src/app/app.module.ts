import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibModule } from './lib/lib.module';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    LibModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
