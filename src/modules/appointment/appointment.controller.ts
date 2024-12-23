import { Controller, Get, UseGuards, Request, Param, Body, Post, Patch } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Controller('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

    @ApiOperation({ summary: 'Get all appointments of a user' })
    @Get()
    async getAppointments(@Request() req) {
        const userId = req.user.userId as string;
        return this.appointmentService.getAppointmentsByUserId(userId);
    }

    @ApiOperation({ summary: 'Create a new appointment' })
    @Post()
    async createAppointment(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto) {
        const userId = req.user.userId as string;
        const result = await this.appointmentService.createAppointment(userId, createAppointmentDto);
        return {
            message: 'Create appointment successfully',
            result,
        };
    }

    @ApiOperation({ summary: 'Update an appointment' })
    @ApiParam({ name: 'appointmentId', type: 'string', required: true, description: 'Appointment ID', example: '676972f1adde35e47cc83535' })
    @Patch(':appointmentId')
    async updateAppointment(@Param('appointmentId') appointmentId: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        const result = await this.appointmentService.updateAppointment(appointmentId, updateAppointmentDto);
        return {
            message: 'Update appointment successfully',
            result,
        };
    }
}
