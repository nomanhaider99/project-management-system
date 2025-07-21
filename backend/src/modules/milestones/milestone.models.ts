import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from '../projects/project.models';
import mongoose from 'mongoose';
import { User } from '../users/user.models';

@Schema()
export class Milestone {
    @Prop({ required: true, min: [2, 'milestone title must be at least of 2 charachters.'], max: [80, 'milestone title must not be more than 80 charachters.'] })
    title: string

    @Prop({ required: false, min: [30, 'description must be at least of 30 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    project: Project 

    @Prop({ required: false })
    status?: "ongoing" | "completed"

    @Prop({ required: false })
    progress: number

    @Prop({ required: false })
    startDate: Date

    @Prop({ required: false })
    endDate: Date
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);