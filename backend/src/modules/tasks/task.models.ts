import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from '../projects/project.models';
import mongoose from 'mongoose';
import { User } from '../users/user.models';
import { Milestone } from '../milestones/milestone.models';

@Schema()
export class Task {
    @Prop({ required: true, minlength: [6, 'task title must be at least of 6 charachters.'], maxlength: [25, 'task title must not be more than 25 charachters.'] })
    title: string

    @Prop({ required: false, minlength: [30, 'description must be at least of 30 charachters.'], maxlength: [100, 'description must not be more than 100 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    project: Project 

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Milestone" })
    milestone: Milestone 
}

export const TaskSchema = SchemaFactory.createForClass(Task);