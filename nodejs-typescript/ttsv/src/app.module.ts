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
import { GiayxacnhanModule } from './module/giayxacnhan/giayxacnhan.module';
import { YeucaugiayxacnhanModule } from './module/yeucaugiayxacnhan/yeucaugiayxacnhan.module';
import { GiayXacNhan } from './module/giayxacnhan/entities/giayxacnhan.entity';
import { YeuCauGiayXacNhan } from './module/yeucaugiayxacnhan/entities/yeucaugiayxacnhan.entity';
import { TuyenxebuytModule } from './module/tuyenxebuyt/tuyenxebuyt.module';
import { TuyenXeBuyt } from './module/tuyenxebuyt/entities/tuyenxebuyt.entity';
import { YeucauvexebuytModule } from './module/yeucauvexebuyt/yeucauvexebuyt.module';
import { YeuCauVeXe } from './module/yeucauvexebuyt/entities/yeucauvexebuyt.entity';
import { UploadModule } from './upload/upload.module';

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
      entities: [
        User,
        ThongTinCaNhan,
        GiayXacNhan,
        YeuCauGiayXacNhan,
        TuyenXeBuyt,
        YeuCauVeXe,
      ],
    }),
    UserModule,
    ThongtincanhanModule,
    YeucaugiayxacnhanModule,
    GiayxacnhanModule,
    TuyenxebuytModule,
    YeucauvexebuytModule,
    UploadModule,
  ],
  controllers: [AppController, ThongtincanhanController],
  providers: [AppService, ThongtincanhanService],
})
export class AppModule {}
