import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsMongoId, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { RecordType } from 'src/shared/enums/recordType.enum';

export class UpdateRecordDto {
  @IsMongoId()
  @ApiProperty({ example: '66ff5e1200bd5bd5536aeb94' })
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Record 1' })
  name: string;

  @IsOptional()
  @IsEnum(RecordType)
  @ApiProperty({ example: 'vaccination' })
  type: RecordType;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'HCM' })
  location?: string;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  @IsOptional()
  timeStamp: Date;
}
