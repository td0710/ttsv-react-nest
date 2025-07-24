import { Module } from '@nestjs/common';
import { TuyenxebuytController } from './tuyenxebuyt.controller';
import { TuyenxebuytService } from './tuyenxebuyt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TuyenXeBuyt } from './entities/tuyenxebuyt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TuyenXeBuyt])],
  controllers: [TuyenxebuytController],
  providers: [TuyenxebuytService],
  exports: [TypeOrmModule],
})
export class TuyenxebuytModule {}
