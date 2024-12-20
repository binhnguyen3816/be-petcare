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

  @IsNumber()
  @ApiProperty({ example: 2 })
  age: number;

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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({example: 'https://example.com/image.jpg'})
  avatar?: string;

  @IsNumber()
  @ApiProperty({ example: 10 })
  weight: number;

  @IsString()
  @ApiProperty({ example: 'Golden Retriever' })
  breed: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  isNeutered: boolean;
}
