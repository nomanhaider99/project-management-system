import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcryptjs";
import { Model } from "mongoose";
import { Business } from "./business.models";

@Injectable()
export class BusinessService {
    constructor(@InjectModel(Business.name) private businessModel: Model<Business>) { }

    async createBusiness(name: string, email: string, password: string) {
        if (!name) {
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
        } else if (!password) {
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
                    message: 'Business Already Exists!',
                    data: businessExists
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
                message: 'Business Created Successfully!',
                data: createdBusiness
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

    async loginBusiness() {} // TODO: Login With Verification Check
    async verifyBusiness() {} // TODO: Verify Using Email
}