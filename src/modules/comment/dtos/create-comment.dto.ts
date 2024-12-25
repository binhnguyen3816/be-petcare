import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    type: String,
    example: 'This is a comment',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The ID of the post the comment belongs to',
    type: String,
    example: '60c72b2f9b1e8a5f5f7e4f8d',
  })
  @IsMongoId()
  postId: Types.ObjectId;
}
