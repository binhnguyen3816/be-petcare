import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Gender } from 'src/shared/enums/gender.enum';
import { PetType } from 'src/shared/enums/petType.enum';

export class UpdatePetDto {
  @IsNotEmpty()
  @ApiProperty({ example: '66fe48705eb4fcc12e712191' })
  _id: ObjectId;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Tom Hanks' })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 2 })
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ example: 'male' })
  gender?: Gender;

  @IsOptional()
  @IsEnum(PetType)
  @ApiProperty({ example: 'cat' })
  type?: PetType;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 10 })
  weight?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  isNeutered?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Golden Retriever' })
  breed?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'My first pet' })
  description?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2022-01-01' })
  birthday?: string;

  @IsString()
  @ApiProperty({
    example:
      'http://res.cloudinary.com/dr0qbjqgt/image/upload/v1735045482/tppbucggskfhu5pika0b.jpg',
  })
  avatar?: string;
}
