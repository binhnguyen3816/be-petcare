import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ServiceTag } from 'src/shared/enums/serviceTag.enum';

export class CreateClinicDto {
    @ApiProperty({example: 'BKU Clinic'})
    @IsString()
    name: string;

    @ApiProperty({example: '123 Nguyen Van Linh, District 7, HCM City'})
    @IsString()
    address: string;

    @ApiProperty({example: '0123456789'})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({example: 'sFtIY@example.com'})
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({example: 4.8})
    @IsNotEmpty()
    rating: number;

    @ApiProperty({example: 'https://example.com/image.jpg'})
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({example: 'This is a clinic'})
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: [{ name: 'Vaccination', price: 100000 }] })
    @IsNotEmpty()
    priceList: {
        name: string,
        price: number,
    }[]

    @ApiProperty({ enum: ServiceTag, isArray: true, example: [ServiceTag.Vaccination, ServiceTag.Diagnosis] })
    @IsNotEmpty()
    @IsEnum(ServiceTag, { each: true })
    serviceTags: ServiceTag[];

    @ApiProperty({example: 500})
    @IsNumber()
    distanceAway: number;

    @ApiProperty({example: '08:00'})
    @IsNotEmpty()
    @IsString()
    openTime: string;

    @ApiProperty({example: '17:00'})
    @IsNotEmpty()
    @IsString()
    closeTime: string;
}
