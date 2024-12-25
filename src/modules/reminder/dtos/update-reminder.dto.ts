import {
  IsString,
  IsOptional,
  IsDate,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Frequency } from 'src/shared/enums/frequency.enum';
import { Types } from 'mongoose';
import { ReminderType } from 'src/shared/enums/reminderType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReminderDto {
  @IsMongoId()
  @ApiProperty({ example: '66fe48705eb4fcc12e712191' })
  _id: Types.ObjectId;

  @IsOptional()
  @IsEnum(Frequency)
  @ApiProperty({
    enum: Frequency,
    description: 'Frequency of the reminder',
    example: 'daily',
  })
  frequency?: Frequency;

  @IsOptional()
  @IsEnum(ReminderType)
  @ApiProperty({
    enum: ReminderType,
    description: 'Type of the reminder',
    example: 'feeding',
  })
  type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'HCM' })
  location?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2022-01-01' })
  occurDate?: Date;
}
