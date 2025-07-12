import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/user.models";
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
    providers: [],
    exports: []
})

export class userModule {}