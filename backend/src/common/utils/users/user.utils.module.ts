import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/modules/users/user.models";
import { UserUtilsService } from "./user.utils.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: User.name,
                    schema: UserSchema
                }
            ]
        )
    ],
    providers: [UserUtilsService]
})

export class UserUtilsModule { }