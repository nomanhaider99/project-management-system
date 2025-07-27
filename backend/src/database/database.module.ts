import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { AppConfigService } from "src/config/config.service";

@Module({
    imports: [],
    providers: [DatabaseService, AppConfigService]
})

export class DatabaseModule {}