import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('User')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @ApiOperation({ summary: 'Login' })
  async updateUser(@Body() authDto: AuthDto) {
    try {
      const result = await this.authService.login(authDto);
      if (!result) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      return {
        message: 'Login success',
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}
