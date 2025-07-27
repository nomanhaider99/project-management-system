import { Module } from "@nestjs/common";
import { BusinessService } from "./business.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "./business.models";
import { BusinessController } from "./business.controller";
import { AppConfigService } from "src/config/config.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Business.name,
                    schema: BusinessSchema
                },
            ]
        )
    ],
    providers: [BusinessService, AppConfigService],
    exports: [],
    controllers: [BusinessController]
})

export class BusinessModule {}