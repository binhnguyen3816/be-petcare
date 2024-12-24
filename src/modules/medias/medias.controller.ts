import { Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MediasService } from './medias.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@Request() req, @UploadedFile() image: Express.Multer.File) {
    const result = await this.mediasService.uploadFile(image);
    return {
      result,
    };
  }
}
