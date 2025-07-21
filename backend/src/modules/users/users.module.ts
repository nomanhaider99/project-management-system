import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppConfigService } from "src/config/config.service";
import { User, UserSchema } from "./user.models";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: User.name,
                    schema: UserSchema
                }
            ]
        ),
    ],
    providers: [UserService],
    exports: [],
    controllers: [UsersController]
})

export class UserModule {}