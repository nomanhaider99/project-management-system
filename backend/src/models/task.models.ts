import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from './project.models';
import mongoose from 'mongoose';
import { User } from './user.models';

@Schema()
export class Task {
    @Prop({ required: true, min: [2, 'task title must be at least of 2 charachters.'], max: [80, 'task title must not be more than 80 charachters.'] })
    title: string

    @Prop({ required: false, min: [30, 'description must be at least of 30 charachters.'] })
    description?: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    project: Project 

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: "User" })
    members?: User[]

    @Prop({ required: false })
    status?: "ongoing" | "completed"

    @Prop({ required: false })
    progress: number

    @Prop({ required: false })
    startDate: Date

    @Prop({ required: false })
    endDate: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task);