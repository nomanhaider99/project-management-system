import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessController } from './modules/businesses/business.controller';
import { MilestoneModule } from './modules/milestones/milestones.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { ProjectModule } from './modules/projects/projects.module';
import { BusinessModule } from './modules/businesses/business.module';
import { UserModule } from './modules/users/users.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AppConfigService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserUtilsService } from './common/utils/users/user.utils.service';
import { UserUtilsModule } from './common/utils/users/user.utils.module';
import { User, UserSchema } from './modules/users/user.models';
import { ProjectsController } from './modules/projects/projects.controller';
import { TasksController } from './modules/tasks/tasks.controller';
import { MilestonesController } from './modules/milestones/milestones.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://noman567n:ta5LlgtMVKxMRXun@data.2ha9nes.mongodb.net/?retryWrites=true&w=majority&appName=data'),
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema
        }
      ]
    ),
    UserModule,
    MilestoneModule,
    TaskModule,
    ProjectModule,
    BusinessModule,
    AppConfigModule,
    DatabaseModule,
    UserUtilsModule
  ],
  controllers: [],
  providers: [AppConfigService, UserUtilsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        BusinessController,
        ProjectsController,
        TasksController,
        MilestonesController,
        '/api/v1/users/delete-user/:id',
        '/api/v1/users/update-user/:id',
        '/api/v1/users/get-user/:id'
      );
  }
}
