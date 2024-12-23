import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { ServiceTag } from 'src/shared/enums/serviceTag.enum';

export type ClinicDocument = HydratedDocument<Clinic>;

@Schema({ timestamps: true })
export class Clinic {
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true })
    address: string;
    
    @Prop({ required: false })
    phone: string;
    
    @Prop({ required: false })
    email: string;
    
    @Prop({ required: false, default: 5 })
    rating: number;

    @Prop({ required: false })
    image: string;
    
    @Prop({ required: true })
    description: string;

    @Prop({ required: true, type: [{ name: String, price: Number }] })
    priceList: {
        name: string,
        price: number,
    }[]

    @Prop({ required: true })
    serviceTags: ServiceTag[];

    @Prop({ required: false })
    distanceAway: number;

    @Prop({ required: true, type: String })
    openTime: string;

    @Prop({ required: true, type: String })
    closeTime: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
