import { Module } from "@nestjs/common";
import { ProjectService } from "./projects.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/models/project.models";
import { Business, BusinessSchema } from "src/models/business.models";

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
            ]
        )
    ],
    exports: [
        ProjectService
    ]
})

export class ProjectModule {}