import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { PostType } from 'src/shared/enums/postType.enum';

export class UpdatePostDto {
  @IsNotEmpty()
  @ApiProperty({ example: '66ff5e1200bd5bd5536aeb94' })
  _id: ObjectId;

  @IsOptional()
  @IsEnum(PostType)
  @ApiProperty({
    enum: PostType,
    description: 'Type of the post',
    example: 'knowledge',
  })
  type?: PostType;

  // Fields for Knowledge type
  @IsOptional()
  @IsString()
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
  @ApiProperty({ example: 'Lost a black cat near central park' })
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
