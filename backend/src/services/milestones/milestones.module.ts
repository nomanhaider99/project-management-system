import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "src/models/business.models";
import { Milestone, MilestoneSchema } from "src/models/milestone.models";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Business.name,
                    schema: BusinessSchema
                },
                {
                    name: Milestone.name,
                    schema: MilestoneSchema
                }
            ]
        ),
    ],
    exports: []
})

export class MilestoneModule {}