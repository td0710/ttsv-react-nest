import { Module } from '@nestjs/common';
import { YeucaugiayxacnhanService } from './yeucaugiayxacnhan.service';
import { YeucaugiayxacnhanController } from './yeucaugiayxacnhan.controller';
import { YeuCauGiayXacNhan } from './entities/yeucaugiayxacnhan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThongtincanhanModule } from '../thongtincanhan/thongtincanhan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([YeuCauGiayXacNhan]),
    ThongtincanhanModule,
  ],
  providers: [YeucaugiayxacnhanService],
  controllers: [YeucaugiayxacnhanController],
  exports: [TypeOrmModule],
})
export class YeucaugiayxacnhanModule {}
