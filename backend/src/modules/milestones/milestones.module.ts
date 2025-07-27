import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Milestone, MilestoneSchema } from "src/modules/milestones/milestone.models";
import { MilestonesController } from "./milestones.controller";
import { MilestonesService } from "./milestones.service";
import { Project, ProjectSchema } from "../projects/project.models";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Milestone.name,
                    schema: MilestoneSchema
                },
                {
                    name: Project.name,
                    schema: ProjectSchema
                }
            ]
        ),
    ],
    exports: [],
    controllers: [MilestonesController],
    providers: [MilestonesService]
})

export class MilestoneModule { }