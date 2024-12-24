import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsUrl,
} from 'class-validator';
import { PostType } from 'src/shared/enums/postType.enum';

export class CreatePostDto {
  @IsNotEmpty()
  @IsEnum(PostType)
  @ApiProperty({
    enum: PostType,
    description: 'Type of the post',
    example: 'knowledge',
  })
  type: PostType;

  // Fields for Knowledge type
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Knowledge 1' })
  content?: string;

  // Fields for Moment type
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Lost a black cat near central park' })
  title?: string;

  // Fields for LostPet type
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Lost a black cat near central park' })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'HCM' })
  location?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ example: 'https://facebook.com/lostcat' })
  fbLink?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example:
      'http://res.cloudinary.com/dr0qbjqgt/image/upload/v1735045482/tppbucggskfhu5pika0b.jpg',
  })
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '0123456789' })
  phoneNo?: string;
}
