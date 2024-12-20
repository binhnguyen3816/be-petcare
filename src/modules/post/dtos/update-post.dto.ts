import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsArray, IsUrl, IsNotEmpty } from 'class-validator';
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

  // Common fields
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'Array of image URLs',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  })
  images?: string[];

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
  @IsString()
  @ApiProperty({ example: '0123456789' })
  phoneNo?: string;
}
