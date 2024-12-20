import { Types } from 'mongoose';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { USER_MESSAGES } from 'src/shared/constants/messages';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return {
      message: USER_MESSAGES.CREATE_USER_SUCCESSFULLY,
      result,
    };
  }
  @ApiOperation({ summary: 'Get user information' })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Request() req) {
    const result = await this.userService.findById(req.user.userId);
    return {
      result,
    };
  }
  @ApiOperation({ summary: 'Update user information' })
  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.validateUserExists(req.user.userId as string);
    const result = await this.userService.updateUser(
      req.user.userId,
      updateUserDto,
    );
    return {
      message: USER_MESSAGES.UPDATE_ME_SUCCESSFULLY,
      result,
    };
  }
}
