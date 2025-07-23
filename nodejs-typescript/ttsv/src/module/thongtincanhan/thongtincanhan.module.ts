import { Module } from '@nestjs/common';
import { ThongtincanhanService } from './thongtincanhan.service';
import { ThongtincanhanController } from './thongtincanhan.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThongTinCaNhan } from './entities/thongtincanhan.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ThongTinCaNhan])],
  providers: [ThongtincanhanService],
  controllers: [ThongtincanhanController],
  exports: [ThongtincanhanService, TypeOrmModule],
})
export class ThongtincanhanModule {}
