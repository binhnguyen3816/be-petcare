import { Appointment } from './../schemas/appointment.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AppointmentStatus } from 'src/shared/enums/appointmentStatus.enum';
import { RecordType } from 'src/shared/enums/recordType.enum';

export class UpdateAppointmentDto {
    @IsEnum(RecordType)
    @IsOptional()
    @ApiProperty({ example: RecordType.Vaccination })
    type: RecordType;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'appointment of Binh' })
    name: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'HCM' })
    location: string;
  
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @ApiProperty({ example: '2022-01-01' })
    timeStamp: Date;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Bob' })
    petName: string;

    @IsEnum(AppointmentStatus)
    @IsOptional()
    @ApiProperty({ example: AppointmentStatus.InComming })
    status: AppointmentStatus;
}
