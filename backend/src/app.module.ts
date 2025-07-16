import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users/users.controller';
import { ProjectsController } from './controllers/projects/projects.controller';
import { userModule } from './services/users/users.module';
import { UserService } from './services/users/users.service';
import { User, UserSchema } from './models/user.models';
import { BusinessController } from './controllers/business/business.controller';
import { BusinessService } from './services/business/business.service';
import { Business, BusinessSchema } from './models/business.models';
import { Project, ProjectSchema } from './models/project.models';
import { ProjectService } from './services/projects/projects.service';
import { MilestonesService } from './services/milestones/milestones.service';
import { MilestonesController } from './controllers/milestones/milestones.controller';
import { MilestoneModule } from './services/milestones/milestones.module';
import { Milestone, MilestoneSchema } from './models/milestone.models';
import { TasksService } from './services/tasks/tasks.service';
import { Task, TaskSchema } from './models/task.models';
import { TaskModule } from './services/tasks/tasks.module';
import { TasksController } from './controllers/tasks/tasks.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://noman567n:ta5LlgtMVKxMRXun@data.2ha9nes.mongodb.net/?retryWrites=true&w=majority&appName=data'),
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema
        },
        {
          name: Business.name,
          schema: BusinessSchema
        },
        {
          name: Project.name,
          schema: ProjectSchema
        },
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
    userModule,
    MilestoneModule,
    TaskModule
  ],
  controllers: [UsersController, ProjectsController, BusinessController, MilestonesController, TasksController],
  providers: [UserService, BusinessService, ProjectService, MilestonesService, TasksService],
})
export class AppModule {}
