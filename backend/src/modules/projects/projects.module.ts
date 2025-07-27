import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ProjectService } from "./projects.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./project.models";
import { Business, BusinessSchema } from "src/modules/businesses/business.models";
import { ProjectsController } from "./projects.controller";
import { User, UserSchema } from "../users/user.models";
import { Milestone, MilestoneSchema } from "../milestones/milestone.models";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Project.name,
                    schema: ProjectSchema
                },
                {
                    name: Business.name,
                    schema: BusinessSchema
                },
                {
                    name: User.name,
                    schema: UserSchema
                },
                {
                    name: Milestone.name,
                    schema: MilestoneSchema
                }
            ]
        )
    ],
    providers: [ProjectService],
    controllers: [ProjectsController],
    exports: [],
})

export class ProjectModule {}