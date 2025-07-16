import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "src/models/business.models";
import { Milestone, MilestoneSchema } from "src/models/milestone.models";
import { Task, TaskSchema } from "src/models/task.models";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Milestone.name,
                    schema: MilestoneSchema
                },
                {
                    name: Task.name,
                    schema: TaskSchema
                },
            ]
        ),
    ],
    exports: []
})

export class TaskModule {}