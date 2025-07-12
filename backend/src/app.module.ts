import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users/users.controller';
import { ProjectsController } from './controllers/projects/projects.controller';
import { userModule } from './services/users/users.module';
import { UserService } from './services/users/users.service';
import { User, UserSchema } from './models/user.models';
import { ConfigModule } from '@nestjs/config';
import { BusinessController } from './controllers/business/business.controller';
import { BusinessService } from './services/business/business.service';
import { Business, BusinessSchema } from './models/business.models';
import { Project, ProjectSchema } from './models/project.models';
import { ProjectService } from './services/projects/projects.service';

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
        }
      ]
    ),
    userModule
  ],
  controllers: [UsersController, ProjectsController, BusinessController],
  providers: [UserService, BusinessService, ProjectService],
})
export class AppModule {}
