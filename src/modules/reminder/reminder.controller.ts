import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReminderDto } from './dtos/create-reminder.dto';
import { UpdateReminderDto } from './dtos/update-reminder.dto';
import { USER_MESSAGES } from 'src/shared/constants/messages';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('reminders')
@ApiBearerAuth()
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all reminders' })
  async getReminders(@Request() req) {
    const userId = req.user.userId as string;
    return this.reminderService.getRemindersByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new reminder' })
  async createReminder(
    @Request() req,
    @Body() createReminderDto: CreateReminderDto,
  ) {
    const userId = req.user.userId as string;
    const result = await this.reminderService.createReminder(
      userId,
      createReminderDto,
    );
    return {
      message: USER_MESSAGES.CREATE_REMINDER_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update a reminder' })
  async updateReminder(
    @Request() req,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    const userId = req.user.userId as string;
    const result = await this.reminderService.updateReminder(
      userId,
      updateReminderDto,
    );
    return {
      message: USER_MESSAGES.UPDATE_REMINDER_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':reminderId')
  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiParam({ name: 'reminderId', type: String, required: true, example: '66fe1855ed43466415cef4d3' })
  async deleteReminder(
    @Request() req,
    @Param('reminderId') reminderId: string,
  ) {
    const userId = req.user.userId as string;
    await this.reminderService.deleteReminder(userId, reminderId);
    return {
      message: USER_MESSAGES.DELETE_REMINDER_SUCCESSFULLY,
    };
  }
}
