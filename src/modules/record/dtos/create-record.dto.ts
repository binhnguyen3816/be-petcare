import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';
import { RecordType } from 'src/shared/enums/recordType.enum';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'Record 1'})
  name: string;

  @IsNotEmpty()
  @IsEnum(RecordType)
  @ApiProperty({example: 'vaccination'})
  type: RecordType;

  @IsNotEmpty()
  @ApiProperty({example: '2021-09-01T00:00:00.000Z'})
  timeStamp: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'HCM'})
  location?: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({example: '66fe48705eb4fcc12e712191'})
  petId: Types.ObjectId;
}
