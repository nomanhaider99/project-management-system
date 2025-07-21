import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "src/modules/businesses/business.models";
import { Milestone, MilestoneSchema } from "src/modules/milestones/milestone.models";
import { Task, TaskSchema } from "src/modules/tasks/task.models";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

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
    exports: [],
    controllers: [TasksController],
    providers: [TasksService]
})

export class TaskModule {}