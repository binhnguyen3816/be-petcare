import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MediasService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async uploadFile(image: Express.Multer.File) {
    const uploadedImage = image
      ? await this.cloudinaryService.uploadFile(image)
      : null;
    const imageUrl = uploadedImage ? uploadedImage.url : null;
    return imageUrl;
  }
}
