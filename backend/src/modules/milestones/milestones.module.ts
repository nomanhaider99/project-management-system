import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "src/modules/businesses/business.models";
import { Milestone, MilestoneSchema } from "src/modules/milestones/milestone.models";
import { MilestonesController } from "./milestones.controller";
import { MilestonesService } from "./milestones.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Milestone.name,
                    schema: MilestoneSchema
                }
            ]
        ),
    ],
    exports: [],
    controllers: [MilestonesController],
    providers: [MilestonesService]
})

export class MilestoneModule {}