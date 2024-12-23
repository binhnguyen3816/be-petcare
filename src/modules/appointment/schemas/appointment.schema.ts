import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { AppointmentStatus } from 'src/shared/enums/appointmentStatus.enum';
import { RecordType } from 'src/shared/enums/recordType.enum';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ enum: RecordType, required: true })
  type: RecordType;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  location: string;

  @Prop({ type: Date, required: true, default: Date.now })
  timeStamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: false })
  clinicId: ObjectId;

  @Prop({ required: true })
  petName: string;

  @Prop({
    enum: AppointmentStatus,
    required: true,
    default: AppointmentStatus.InComming,
  })
  status: AppointmentStatus;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
