/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(
    @Inject('CLOUDINARY')
    private cloudinary = cloudinary,
  ) {}
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result.secure_url); // 👈 Trả về URL ảnh
        },
      );
      Readable.from(file.buffer).pipe(upload);
    });
  }
}
