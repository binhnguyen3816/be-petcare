import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}

    @ApiOperation({ summary: 'Create a new clinic' })
    @Post()
    async createClinic(@Body() createClinicDto: CreateClinicDto) {
        const result = await this.clinicService.createClinic(createClinicDto);
        return {
            message: 'Create clinic successfully',
            result,
        };
    }
    
    @ApiOperation({ summary: 'Get all clinics' })
    @Get()
    async getAllClinics() {
        return this.clinicService.getAllClinics();
    }

    @ApiOperation({ summary: 'Get clinic by ID' })
    @ApiParam({ name: 'clinicId', type: 'string', required: true, description: 'Clinic ID', example: '676972f1adde35e47cc83535' })
    @Get(':clinicId')
    async getClinicById(@Param('clinicId') clinicId: string) {
        return this.clinicService.getClinicById(clinicId);
    }
}
