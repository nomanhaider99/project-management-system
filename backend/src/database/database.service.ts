import { Inject, Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { AppConfigService } from "src/config/config.service";

@Injectable()
export class DatabaseService {
    constructor (@Inject(AppConfigService) private appConfigService: AppConfigService) {}

    async connectMongoDB () {
        const DB_URL = this.appConfigService.databaseUrl;

        await mongoose.connect(DB_URL)
        .then(() => {
            console.log(`MongoDB Connected Successfully! 🔥`)
        })
        .catch(() => {
            console.log(`Failed to Connect MongoDB! ❌`)
        })
    }

}