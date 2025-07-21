import mongoose from "mongoose"
import { config } from 'dotenv'

config();

export const connectDatabase = async () => {
    const DB_URL = process.env.MONGODB_URI;
    await mongoose.connect(DB_URL as string)
        .then(() => {
            console.log(`MongoDB Connected Successfully! 🔥`)
        })
        .catch(() => {
            console.log(`Failed to Connect MongoDB! ❌`)
        })
}