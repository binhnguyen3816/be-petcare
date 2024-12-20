import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Gender } from 'src/shared/enums/gender.enum';
import { PetType } from 'src/shared/enums/petType.enum';

export class UpdatePetDto {
  @IsNotEmpty()
  @ApiProperty({example: '66fe48705eb4fcc12e712191'})
  _id: ObjectId;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'Tom Hanks'})
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 2})
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({example: 'male'})
  gender?: Gender;

  @IsOptional()
  @IsEnum(PetType)
  @ApiProperty({example: 'cat'})
  type?: PetType;

  @IsOptional()
  @IsString()
  @ApiProperty({example: '2022-01-01'})
  avatar?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 10})
  weight?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({example: true})
  isNeutered?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'Golden Retriever'})
  breed?: string;
}
