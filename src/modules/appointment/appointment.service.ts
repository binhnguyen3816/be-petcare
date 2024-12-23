import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel('Appointment') private appointmentModel: Model<Appointment>) {}

    async getAppointmentsByUserId(userId: string) {
        return this.appointmentModel.find({ userId });
    }

    async createAppointment(userId: string, createAppointmentDto: CreateAppointmentDto) {
        const newAppointment = new this.appointmentModel({
            ...createAppointmentDto,
            userId,
        });
        return newAppointment.save();
    }

    async updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto) {
        const appointment = await this.appointmentModel.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }
        return this.appointmentModel.findByIdAndUpdate(new Types.ObjectId(appointmentId), { $set: updateAppointmentDto }, { new: true });
    }
}
