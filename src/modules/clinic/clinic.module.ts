import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicSchema } from './schemas/clinic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Clinic', schema: ClinicSchema }])],
  controllers: [ClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
