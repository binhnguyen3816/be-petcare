import {
  IsNotEmpty,
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

export class CreateReminderDto {
  @IsNotEmpty()
  @IsEnum(Frequency)
  @ApiProperty({
    enum: Frequency,
    description: 'Frequency of the reminder',
    example: 'daily',
  })
  frequency: Frequency;

  @IsNotEmpty()
  @IsEnum(ReminderType)
  @ApiProperty({
    enum: ReminderType,
    description: 'Type of the reminder',
    example: 'feeding',
  })
  type: ReminderType;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'HCM' })
  location?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2022-01-01' })
  occurDate: Date;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '66fe48705eb4fcc12e712191' })
  petId: Types.ObjectId;
}
