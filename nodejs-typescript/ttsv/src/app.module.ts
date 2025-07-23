import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import User from './module/user/user.entity';
import { ThongtincanhanController } from './module/thongtincanhan/thongtincanhan.controller';
import { ThongtincanhanService } from './module/thongtincanhan/thongtincanhan.service';
import { ThongtincanhanModule } from './module/thongtincanhan/thongtincanhan.module';
import { ThongTinCaNhan } from './module/thongtincanhan/entities/thongtincanhan.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [User, ThongTinCaNhan],
    }),
    UserModule,
    ThongtincanhanModule,
  ],
  controllers: [AppController, ThongtincanhanController],
  providers: [AppService, ThongtincanhanService],
})
export class AppModule {}
