import { Appointment } from './../schemas/appointment.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AppointmentStatus } from 'src/shared/enums/appointmentStatus.enum';
import { RecordType } from 'src/shared/enums/recordType.enum';

export class CreateAppointmentDto {
    @IsEnum(RecordType)
    @IsNotEmpty()
    @ApiProperty({ example: RecordType.Vaccination })
    type: RecordType;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'appointment of Binh' })
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'HCM' })
    location: string;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @ApiProperty({ example: '2022-01-01' })
    timeStamp: Date;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Bob' })
    petName: string;

    @IsEnum(AppointmentStatus)
    @IsNotEmpty()
    @ApiProperty({ example: AppointmentStatus.InComming })
    status: AppointmentStatus;
}
