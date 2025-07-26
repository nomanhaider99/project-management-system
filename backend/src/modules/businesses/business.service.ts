import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcryptjs";
import { Model } from "mongoose";
import { Business } from "./business.models";
import { sign, verify } from 'jsonwebtoken';
import { AppConfigService } from "src/config/config.service";
import { Request, Response } from "express";

@Injectable()
export class BusinessService {
    constructor(@InjectModel(Business.name) private businessModel: Model<Business>, @Inject(AppConfigService) private appConfigService: AppConfigService) { }

    async createBusiness(name: string, email: string, password: string) {
        if (!name || name.length < 2 || name.length > 80) {
            throw new BadRequestException(
                {
                    message: 'Invalid Name!',
                }
            )
        } else if (!email) {
            throw new BadRequestException(
                {
                    message: 'Invalid Email!',
                }
            )
        } else if (!password || password.length < 8) {
            throw new BadRequestException(
                {
                    message: 'Invalid Password!',
                }
            )
        }

        const businessExists = await this.businessModel.findOne(
            {
                email
            }
        );

        if (businessExists) {
            throw new ForbiddenException(
                {
                    message: 'Business Already Exists!'
                }
            )
        } else {
            const hashedPassword = await hash(password, 15);
            const createdBusiness = await this.businessModel.create(
                {
                    name,
                    email,
                    password: hashedPassword
                }
            );

            return {
                message: 'Business Created Successfully!'
            }
        }
    }

    async getBusiness() {
        const businesses = await this.businessModel.find();
        if (!businesses.length) {
            throw new NotFoundException(
                {
                    message: 'Businesses Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Businesses Found!',
                data: businesses
            }
        }
    }

    async getBusinessById(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const business = await this.businessModel.findOne(
            {
                _id: id
            }
        );

        if (!business) {
            throw new NotFoundException({
                message: 'Business Not Found!',
            })
        } else {
            return {
                message: 'Business Found!',
                data: business
            }
        }
    }

    async updateBusiness(id: string, tagline?: string, description?: string, logo?: string, industry?: string, address?: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        } else if (!tagline || tagline.length < 15 || tagline.length > 80) {
            throw new BadRequestException(
                {
                    message: 'Invalid Tagline!',
                }
            )
        } else if (description) {
            if (description.length < 30 || description.length > 600) {
                throw new BadRequestException(
                    {
                        message: 'Invalid Description!',
                    }
                )
            }
        } else if (address) {
            if (address.length < 15 || address.length > 150) {
                throw new BadRequestException(
                    {
                        message: 'Invalid Description!',
                    }
                )
            }
        }

        const business = await this.businessModel.findOne(
            {
                _id: id
            }
        );

        if (!business) {
            throw new NotFoundException({
                message: 'Business Not Found!',
            })
        } else {
            const updatedBusiness = await business.updateOne({
                tagline,
                description,
                logo,
                address,
                industry
            })
            return {
                message: 'Business Updated Successfully!',
                data: updatedBusiness
            }
        }
    }

    async deleteBusiness(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const business = await this.businessModel.findOne(
            {
                _id: id
            }
        );

        if (!business) {
            throw new NotFoundException({
                message: 'Business Not Found!',
            })
        } else {
            const deletedBusiness = await business.deleteOne();
            return {
                message: 'Business Deleted Successfully!',
                data: deletedBusiness
            }
        }
    }

    async isBusinessLoggedIn(request: Request) {
        const token = request.cookies.token;
        if (!token) {
            return false;
        } else {
            return true;
        }
    }

    async getLoggedInBusiness(request: Request) {
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

        const business = await this.businessModel.findOne({
            _id: tokenData._id,
            email: tokenData.email,
        });

        if (!business) {
            throw new NotFoundException(
                {
                    message: 'Business Not Found!'
                }
            )
        } else {
            return { data: business };
        }
    }

    async loginBusiness(email: string, password: string, res: Response) {
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

        const businessExists = await this.businessModel.findOne({
            email
        });

        if (!businessExists) {
            throw new NotFoundException(
                {
                    message: 'Business Not Found!'
                }
            );
        } else {
            const passwordMatched = await compare(password, businessExists.password);

            if (!passwordMatched) {
                throw new UnauthorizedException(
                    {
                        message: 'Password Incorrect!'
                    }
                )
            } else {
                const token = sign(
                    {
                        _id: businessExists._id,
                        email: businessExists.email,
                        name: businessExists.name,
                        type: 'business'
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
                    message: 'Business LoggedIn Successfully!',
                    data: businessExists
                }
            }
        }
    }
    async logoutBusiness(request: Request, response: Response) {
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
                message: 'Business LoggedOut Successfully!'
            }
        }
    } 
}