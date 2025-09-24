import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { ConfigModule } from '@nestjs/config';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './main/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MainModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available in all modules
    }),
    LibModule,
    AuthModule
  ],
})
export class AppModule {}
