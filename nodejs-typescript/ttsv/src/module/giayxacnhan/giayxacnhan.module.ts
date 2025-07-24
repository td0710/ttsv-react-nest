import { Module } from '@nestjs/common';
import { GiayxacnhanService } from './giayxacnhan.service';
import { GiayxacnhanController } from './giayxacnhan.controller';
import { GiayXacNhan } from './entities/giayxacnhan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GiayXacNhan])],
  providers: [GiayxacnhanService],
  controllers: [GiayxacnhanController],
  exports: [TypeOrmModule],
})
export class GiayxacnhanModule {}
