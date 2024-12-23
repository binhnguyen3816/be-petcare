import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinic } from './schemas/clinic.schema';
import { CreateClinicDto } from './dtos/create-clinic.dto';

@Injectable()
export class ClinicService {
    constructor(@InjectModel('Clinic') private clinicModel: Model<Clinic>) {}

    async createClinic(createClinicDto: CreateClinicDto) {
        const newClinic = new this.clinicModel(createClinicDto);
        return newClinic.save();
    }

    async getAllClinics() {
        return this.clinicModel.find().exec();
    }

    async getClinicById(id: string) {
        try {
            const clinic = await this.clinicModel.findById(id).exec();
            console.log(clinic);
            if (!clinic) {
                throw new NotFoundException('Clinic not found');
            }
            return clinic;
        } catch (error) {
            throw new NotFoundException(`Error retrieving clinic: ${error.message}`);
        }
    }
}
