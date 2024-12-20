import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Hung bla' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  location?: string;
}
