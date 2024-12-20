import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'Hung'})
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example: 'sFtIY@example.com'})
  readonly email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @ApiProperty({example: '123Aa@hahgal'})
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly location?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly activity_point?: number;
}

