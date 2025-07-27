import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Milestone } from './milestone.models';
import { Project } from '../projects/project.models';

@Injectable()
export class MilestonesService {
    constructor(@InjectModel(Milestone.name) private milestoneModel: Model<Milestone>, @InjectModel(Project.name) private projectModel: Model<Project>) { }

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
                title,
                project
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

            await this.projectModel.findByIdAndUpdate(project, {
                $addToSet: {
                    milestones: createdMilestone._id
                }
            })

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

    async getMilestonesOfProject(project: string) {
        const milestones = await this.milestoneModel.find({
            project: project
        });
        if (!milestones.length) {
            throw new NotFoundException(
                {
                    message: 'Milestones Not Found!'
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

    async updateMilestone(id: string, description?: string, status?: string) {
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
                status
            });
            return {
                message: 'Milestone Updated Successfully!',
                data: updatedMilestone
            }
        }
    }

    async updateMilestoneStatus(id: string, projectId: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const milestone = await this.milestoneModel.findOne({
            _id: id
        });


        if (!milestone) {
            throw new NotFoundException(
                {
                    message: 'Milestone Not Found!',
                }
            )
        } else {
            await milestone.updateOne({
                status: 'completed'
            });
            const project = await this.projectModel.findOne({
                _id: projectId
            });
            if (!project) {
                throw new NotFoundException(
                    {
                        message: 'Project Not Found!'
                    }
                );
            } else {
                const totalMilestones = await this.milestoneModel.find({
                    _id: {
                        $in: project.milestones
                    },
                });

                const completedMilestones = await this.milestoneModel.find({
                    _id: {
                        $in: project.milestones
                    },
                    status: 'completed'
                });

                const progress = (completedMilestones.length*100)/totalMilestones.length;

                if (progress < 100) {
                    await project.updateOne({
                        progress
                    })
                } else {
                    await project.updateOne({
                        progress,
                        status: 'completed'
                    })
                }


                return {
                    message: 'Milestone Progress Updated Successfully!'
                }
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
