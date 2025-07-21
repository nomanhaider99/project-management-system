import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/users/user.models";

@Injectable()
export class UserUtilsService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getUserById(id: string) {
        const user = await this.userModel.findOne({ _id: id });

        if (!user) {
            return undefined;
        } else {
            return user
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return undefined;
        } else {
            return user;
        }
    }
}