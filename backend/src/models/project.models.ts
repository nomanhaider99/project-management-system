import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Business } from './business.models';
import { User } from './user.models';

@Schema()
export class Project {
    @Prop({ required: true, min: [2, 'project title must be at least of 2 charachters.'], max: [80, 'project title must not be more than 80 charachters.'] })
    title: string

    @Prop({ required: true, min: [30, 'description must be at least of 30 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Business" })
    owner: Business 

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: "User" })
    members?: User[]

    @Prop({ required: false })
    status?: "ongoing" | "completed" | "expired"

    @Prop({ required: false })
    priority?: "low" | "medium" | "urgent"

    @Prop({ required: false })
    progress: number

    @Prop({ required: false })
    startDate: Date

    @Prop({ required: false })
    endDate: Date
}

export const ProjectSchema = SchemaFactory.createForClass(Project);