import { Module } from '@nestjs/common';
import { YeucauvexebuytService } from './yeucauvexebuyt.service';
import { YeucauvexebuytController } from './yeucauvexebuyt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YeuCauVeXe } from './entities/yeucauvexebuyt.entity';
import { ThongtincanhanModule } from '../thongtincanhan/thongtincanhan.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([YeuCauVeXe]),
    ThongtincanhanModule,
    UploadModule,
  ],
  providers: [YeucauvexebuytService],
  controllers: [YeucauvexebuytController],
  exports: [TypeOrmModule],
})
export class YeucauvexebuytModule {}
