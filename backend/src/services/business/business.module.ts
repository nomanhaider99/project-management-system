import { Module } from "@nestjs/common";
import { BusinessService } from "./business.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/models/project.models";
import { Business, BusinessSchema } from "src/models/business.models";

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
    exports: [
        BusinessService
    ]
})

export class ProjectModule {}