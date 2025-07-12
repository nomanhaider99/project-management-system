import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from './project.models';
import mongoose from 'mongoose';

@Schema()
export class Business {
    @Prop({ required: true, min: [2, 'business name must be at least of 2 charachters.'], max: [80, 'business name must not be more than 80 charachters.'] })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true, unique: true, min: [8, 'password must be at least of 8 charachters.'], max: [30, 'password must not be more than 30 charachters.'] })
    password: string

    @Prop({ required: false })
    verified?: boolean

    @Prop({ required: false })
    logo?: string

    @Prop({ required: false, min: [15, 'tagline must be at least of 15 charachters.'], max: [120, 'tagline must not be more than 120 charachters.'] })
    tagline?: string

    @Prop({ required: false, min: [30, 'description must be at least of 30 charachters.'] })
    description?: string

    @Prop({ required: false })
    industry?: string

    @Prop({ required: false, min: [10, 'address must be at least of 10 charachters.'], max: [150, 'address must not be more than 150 charachters.'] })
    address?: string

    @Prop({ required: false, type: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}] })
    projects: mongoose.Schema.Types.ObjectId[]
}

export const BusinessSchema = SchemaFactory.createForClass(Business);