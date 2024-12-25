import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { Gender } from 'src/shared/enums/gender.enum';
import { PetType } from 'src/shared/enums/petType.enum';

export class CreatePetDto {
  @IsString()
  @ApiProperty({ example: 'Tom' })
  name: string;

  @IsEnum(Gender, { message: 'Gender must be either male or female.' })
  @IsNotEmpty()
  @ApiProperty({ example: 'male', required: true })
  gender: Gender;

  @IsEnum(PetType, { message: 'Pet type must be either cat or dog' })
  @IsNotEmpty()
  @ApiProperty({ example: 'cat', required: true })
  type: PetType;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2022-01-01' })
  birthday: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 10 })
  weight: number;

  @IsString()
  @ApiProperty({ example: 'Golden Retriever' })
  breed: string;

  @IsString()
  @ApiProperty({
    example:
      'http://res.cloudinary.com/dr0qbjqgt/image/upload/v1735045482/tppbucggskfhu5pika0b.jpg',
  })
  avatar: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  @IsOptional()
  isNeutered: boolean;

  @IsString()
  @ApiProperty({ example: 'My first pet' })
  @IsOptional()
  description: string;
}
