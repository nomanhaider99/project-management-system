import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { User } from "./user.models";
import { hash, compare } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from "express";
import { AppConfigService } from "src/config/config.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, @Inject(AppConfigService) private appConfigService: AppConfigService) { }
    async createUser(username: string, email: string, password: string) {
        if (!username || username.length < 6 || username.length > 24) {
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
        } else if (!password || password.length < 8) {
            throw new BadRequestException(
                {
                    message: 'Invalid Password',
                }
            )
        }

        const userExistsByEmail = await this.userModel.findOne(
            {
                email
            }
        );

        const userExistsByUsername = await this.userModel.findOne(
            {
                username
            }
        );

        if (userExistsByEmail) {
            throw new ForbiddenException(
                {
                    message: 'User Already Exists!'
                }
            )
        } else if (userExistsByUsername) {
            throw new ForbiddenException(
                {
                    message: 'User Already Exists!'
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
                message: 'User Created Successfully!'
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

    async getUsersByIds(ids: string[]) {
        if (!ids) {
            throw new BadRequestException(
                {
                    message: 'Invalid Ids!',
                }
            )
        }

        const user = await this.userModel.find(
            {
                _id: {
                    $in: ids
                }
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

    async isLoggedIn (request: Request) {
        const token = request.cookies.token;
        if (!token) {
            return false;
        } else {
            return true;
        }
    }

    async getLoggedInUser(request: Request) {
        const token = request.cookies.token
        if (token === undefined) {
            throw new BadRequestException(
                {
                    message: 'Token Not Found!'
                }
            )
        }
        const decodedToken: any = verify(token, this.appConfigService.jwtSecret);
        const tokenData = {
            _id: decodedToken._id,
            email: decodedToken.email,
            username: decodedToken.username
        }

        const user = await this.userModel.findOne({
            email: tokenData.email,
            username: tokenData.username,
        });

        if (!user) {
            throw new NotFoundException(
                {
                    message: 'User Not Found!'
                }
            )
        } else {
            return { data: user };
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
        } else if (!password || password.length < 8) {
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
                const token = sign(
                    {
                        _id: userExists._id,
                        email: userExists.email,
                        username: userExists.username,
                        type: 'user'
                    },
                    this.appConfigService.jwtSecret
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60 * 24
                });

                return {
                    message: 'User LoggedIn Successfully!',
                    data: userExists
                }
            }
        }
    }

    async logoutUser(request: Request, response: Response) {
        const token = request.cookies.token;
        if (!token) {
            throw new NotFoundException(
                {
                    message: 'Token Not Found!'
                }
            );
        } else {
            response.clearCookie('token');

            return {
                message: 'User Logged Out!'
            }
        }
    } 
}