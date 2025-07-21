import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./user.models";
import { hash, compare } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { sign } from 'jsonwebtoken';
import { Response } from "express";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async createUser(username: string, email: string, password: string) {
        if (!username) {
            throw new BadRequestException(
                {
                    message: 'Invalid Username',
                }
            )
        } else if (!email) {
            throw new BadRequestException(
                {
                    message: 'Invalid Email',
                }
            )
        } else if (!password) {
            throw new BadRequestException(
                {
                    message: 'Invalid Password',
                }
            )
        }

        const userExists = await this.userModel.findOne(
            {
                email,
                username
            }
        );

        if (userExists) {
            throw new ForbiddenException(
                {
                    message: 'User Already Exists!',
                    data: userExists
                }
            )
        } else {
            const hashedPassword = await hash(password, 15);
            const createdUser = await this.userModel.create(
                {
                    username,
                    email,
                    password: hashedPassword
                }
            );

            return {
                message: 'User Created Successfully!',
                data: createdUser
            }
        }
    }

    async getUsers() {
        const users = await this.userModel.find();
        if (!users) {
            throw new NotFoundException(
                {
                    message: 'Users Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Users Found!',
                data: users
            }
        }
    }

    async getUserById(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const user = await this.userModel.findOne(
            {
                _id: id
            }
        );

        if (!user) {
            throw new NotFoundException({
                message: 'User Not Found!',
            })
        } else {
            return {
                message: 'User Found!',
                data: user
            }
        }
    }

    async updateUser(id: string, tagline?: string, description?: string, image?: string, skills?: string[]) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const user = await this.userModel.findOne(
            {
                _id: id
            }
        );

        if (!user) {
            throw new NotFoundException({
                message: 'User Not Found!',
            })
        } else {
            const updatedUser = await user.updateOne({
                tagline,
                description,
                image,
                skills
            })
            return {
                message: 'User Updated Successfully!',
                data: updatedUser
            }
        }
    }

    async deleteUser(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const user = await this.userModel.findOne(
            {
                _id: id
            }
        );

        if (!user) {
            throw new NotFoundException({
                message: 'User Not Found!',
            })
        } else {
            const deletedUser = await user.deleteOne();
            return {
                message: 'User Deleted Successfully!',
                data: deletedUser
            }
        }
    }

    async loginUser(email: string, password: string, res: Response) {
        if (!email) {
            throw new BadRequestException(
                {
                    message: 'Invalid Email'
                }
            )
        } else if (!password) {
            throw new BadRequestException(
                {
                    message: 'Invalid Password'
                }
            )
        }

        const userExists = await this.userModel.findOne({
            email
        });

        if (!userExists) {
            throw new NotFoundException(
                {
                    message: 'User Not Found!'
                }
            );
        } else {
            const passwordMatched = await compare(password, userExists.password);

            if (!passwordMatched) {
                throw new UnauthorizedException(
                    {
                        message: 'Password Incorrect!'
                    }
                )
            } else {
                // Generate Token
                const token = sign(
                    {
                        _id: userExists._id,
                        email: userExists.email,
                        username: userExists.username
                    },
                    'myprojectsecret', // TODO: Transfer to env
                );

                res.cookie('token', token);
                
                return {
                    message: 'User LoggedIn Successfully!',
                    data: userExists
                }
            }
        }
    }
    async verifyUser() { } // TODO: Verify Using Email
}