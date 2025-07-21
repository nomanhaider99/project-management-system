import { Module } from "@nestjs/common";
import { BusinessService } from "./business.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "./business.models";
import { BusinessController } from "./business.controller";

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
    providers: [BusinessService],
    exports: [],
    controllers: [BusinessController]
})

export class BusinessModule {}