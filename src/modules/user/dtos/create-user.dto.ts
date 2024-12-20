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
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  readonly location?: string;

  @IsOptional()
  @IsNumber()
  readonly activity_point?: number;
}
function Apiproperty(arg0: { name: any; }): (target: CreateUserDto, propertyKey: "name") => void {
  throw new Error('Function not implemented.');
}

