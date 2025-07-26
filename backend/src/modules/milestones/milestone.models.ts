import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from '../projects/project.models';
import mongoose from 'mongoose';

@Schema()
export class Milestone {
    @Prop({ required: true, minlength: [6, 'milestone title must be at least of 6 charachters.'], maxlength: [25, 'milestone title must not be more than 25 charachters.'] })
    title: string

    @Prop({ required: false, minlength: [30, 'description must be at least of 30 charachters.'], maxlength: [100, 'description must be at least of 100 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    project: Project 

    @Prop({ required: false })
    status?: "ongoing" | "completed"
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);