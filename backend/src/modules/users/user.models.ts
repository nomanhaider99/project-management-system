import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from '../projects/project.models';

@Schema()
export class User {
    @Prop({ required: true, unique: true, minlength: [6, 'username must be at least of 6 charachters.'], maxlength: [24, 'username must not be more than 24 charachters.'], lowercase: true })
    username: string

    @Prop({ required: true, unique: true, lowercase: true })
    email: string

    @Prop({ required: true, unique: true, minlength: [8, 'password must be at least of 8 charachters.'] })
    password: string

    @Prop({ required: false })
    verified?: boolean

    @Prop({ required: false })
    image?: string

    @Prop({ required: false, minlength: [15, 'tagline must be at least of 15 charachters.'], maxlength: [120, 'tagline must not be more than 120 charachters.'] })
    tagline?: string

    @Prop({ required: false, minlength: [30, 'description must be at least of 30 charachters.'], maxlength: [600, 'description must not be more than 600 charachters.'] })
    description?: string

    @Prop({ required: false })
    skills?: string[]

    @Prop({ required: false, type: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}] })
    projects?: mongoose.Schema.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);