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
import { RecordService } from './record.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateRecordDto } from './dtos/create-record.dto';
import { USER_MESSAGES } from 'src/shared/constants/messages';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('records')
@ApiBearerAuth()
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get records by petId' })
  @ApiParam({
    name: 'petId',
    type: 'string',
    required: true,
    description: 'Pet ID',
    example: '66fe1855ed43466415cef4d3',
  })
  @Get('pets/:petId')
  async getRecordsByPetId(@Request() req, @Param('petId') petId: string) {
    const userId = req.user.userId as string;
    return this.recordService.getRecordsByPetId(userId, petId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create record for a pet' })
  async createRecord(@Request() req, @Body() createRecordDto: CreateRecordDto) {
    const userId = req.user.userId as string;
    const result = await this.recordService.createRecord(
      userId,
      createRecordDto,
    );
    return {
      message: USER_MESSAGES.CREATE_RECORD_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update record for a pet' })
  async updateRecord(@Request() req, @Body() updateRecordDto: UpdateRecordDto) {
    const userId = req.user.userId as string;
    const result = await this.recordService.updateRecord(
      userId,
      updateRecordDto,
    );
    return {
      message: USER_MESSAGES.UPDATE_RECORD_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':recordId')
  @ApiOperation({ summary: 'Delete record for a pet' })
  @ApiParam({
    name: 'recordId',
    type: 'string',
    required: true,
    description: 'Record ID',
    example: '66ff5e1200bd5bd5536aeb94',
  })
  async deleteReminder(@Request() req, @Param('recordId') recordId: string) {
    const userId = req.user.userId as string;
    await this.recordService.deleteRecord(userId, recordId);
    return {
      message: USER_MESSAGES.DELETE_RECORD_SUCCESSFULLY,
    };
  }
}
