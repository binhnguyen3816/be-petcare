import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'The ID of the post to like',
    type: String,
    example: '60c72b2f9b1e8a5f5f7e4f8d',
  })
  @IsMongoId()
  postId: Types.ObjectId;
}
