import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from '../businesses/business.models';
import { Milestone } from './milestone.models';

@Injectable()
export class MilestonesService {
    constructor(@InjectModel(Milestone.name) private milestoneModel: Model<Milestone>) { }

    async createMilestone(title: string, project: string, description?: string) {
        if (!title) {
            throw new BadRequestException(
                {
                    message: 'Invalid Title!',
                }
            )
        } else if (!project) {
            throw new BadRequestException(
                {
                    message: 'Invalid Project Id!',
                }
            )
        }

        const milestoneExists = await this.milestoneModel.findOne(
            {
                title
            }
        );

        if (milestoneExists) {
            throw new ForbiddenException(
                {
                    message: 'Milestone Already Exists!',
                    data: milestoneExists
                }
            )
        } else {
            const createdMilestone = await this.milestoneModel.create(
                {
                    title,
                    description,
                    project
                }
            );

            return {
                message: 'Milestone Created Successfully!',
                data: createdMilestone
            }
        }
    }

    async getMilestones() {
        const milestones = await this.milestoneModel.find();
        if (!milestones.length) {
            throw new NotFoundException(
                {
                    message: 'Milestones Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Milestones Found!',
                data: milestones
            }
        }
    }

    async getMilestoneById(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const milestone = await this.milestoneModel.findOne(
            {
                _id: id
            }
        );

        if (!milestone) {
            throw new NotFoundException({
                message: 'Milestone Not Found!',
            })
        } else {
            return {
                message: 'Milestone Found!',
                data: milestone
            }
        }
    }

    async updateMilestone(id: string, description?: string, status?: string, progress?: number, startDate?: string, endDate?: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }  

        const milestone = await this.milestoneModel.findOne(
            {
                _id: id
            }
        );

        if (!milestone) {
            throw new NotFoundException({
                message: 'Milestone Not Found!',
            })
        } else {
            const updatedMilestone = await milestone.updateOne({
                description,
                status,
                progress,
                startDate,
                endDate
            });
            return {
                message: 'Milestone Updated Successfully!',
                data: updatedMilestone
            }
        }
    }

    async deleteMilestone(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            );
        }

        const milestone = await this.milestoneModel.findOne(
            {
                _id: id
            }
        );

        if (!milestone) {
            throw new NotFoundException({
                message: 'Milestone Not Found!',
            });
        } else {
            const deletedMilestone = await milestone.deleteOne();
            return {
                message: 'Milestone Deleted Successfully!',
                data: deletedMilestone
            }
        }
    }
}
