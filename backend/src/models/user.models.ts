import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from './project.models';

@Schema()
export class User {
    @Prop({ required: true, unique: true, min: [6, 'username must be at least of 6 charachters.'], max: [24, 'username must not be more than 24 charachters.'], lowercase: true })
    username: string

    @Prop({ required: true, unique: true, lowercase: true })
    email: string

    @Prop({ required: true, unique: true, min: [8, 'password must be at least of 8 charachters.'], max: [30, 'password must not be more than 30 charachters.'] })
    password: string

    @Prop({ required: false })
    verified?: boolean

    @Prop({ required: false })
    image?: string

    @Prop({ required: false, min: [15, 'tagline must be at least of 15 charachters.'], max: [120, 'tagline must not be more than 120 charachters.'] })
    tagline?: string

    @Prop({ required: false, min: [30, 'description must be at least of 30 charachters.'] })
    description?: string

    @Prop({ required: false })
    skills?: string[]

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    projects?: Project
}

export const UserSchema = SchemaFactory.createForClass(User);