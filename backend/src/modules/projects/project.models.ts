import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Business } from '../businesses/business.models';

@Schema()
export class Project {
    @Prop({ required: true, minlength: [6, 'project title must be at least of 6 charachters.'], maxlength: [25, 'project title must not be more than 25 charachters.'] })
    title: string

    @Prop({ required: true, minlength: [30, 'description must be at least of 30 charachters.'], maxlength: [100, 'description must be at least of 100 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Business" })
    owner: Business 

    @Prop({ required: false, type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}] })
    members?: mongoose.Schema.Types.ObjectId[]

    @Prop({ required: false, type: [{type: mongoose.Schema.Types.ObjectId, ref: "Milestone"}] })
    milestones?: mongoose.Schema.Types.ObjectId[]

    @Prop({ required: false })
    status?: "ongoing" | "completed" | "expired"

    @Prop({ required: false })
    priority?: "low" | "medium" | "urgent"

    @Prop({ required: false })
    progress: number

    @Prop({ required: false, type: Date })
    startDate: Date

    @Prop({ required: false })
    endDate: Date
}

export const ProjectSchema = SchemaFactory.createForClass(Project);