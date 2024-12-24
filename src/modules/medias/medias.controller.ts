import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediasService } from './medias.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Medias') // Nhóm API này trong Swagger
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Xác thực bằng JWT
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload an image' }) // Mô tả chức năng
  @ApiConsumes('multipart/form-data') // Định dạng yêu cầu
  @ApiBody({
    description: 'File to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Định nghĩa file upload
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadFile(@Request() req, @UploadedFile() image: Express.Multer.File) {
    const result = await this.mediasService.uploadFile(image);
    return {
      result,
    };
  }
}
