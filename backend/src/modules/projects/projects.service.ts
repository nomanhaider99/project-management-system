import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Business } from "src/modules/businesses/business.models";
import { Project } from "./project.models";
import { User } from "../users/user.models";
import { Milestone } from "../milestones/milestone.models";

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>, @InjectModel(Business.name) private businessModel: Model<Business>, @InjectModel(User.name) private userModel: Model<User>, @InjectModel(Milestone.name) private milestoneModel: Model<Milestone>) { }

    async createProject(title: string, description: string, owner: Business, status: 'ongoing' | 'completed' | 'expired', priority: 'low' | 'medium' | 'urgent', startDate: string) {
        if (!title || title.length < 6 || title.length > 25) {
            throw new BadRequestException(
                {
                    message: 'Invalid Title!'
                }
            )
        } else if (!description || description.length < 30 || description.length > 100) {
            throw new BadRequestException(
                {
                    message: 'Invalid Description!'
                }
            )
        } else if (!owner) {
            throw new BadRequestException(
                {
                    message: 'Invalid Business!'
                }
            )
        } else if (!status) {
            throw new BadRequestException(
                {
                    message: 'Invalid Status!'
                }
            )
        } else if (!priority) {
            throw new BadRequestException(
                {
                    message: 'Invalid Priority!'
                }
            )
        } else if (!startDate) {
            throw new BadRequestException(
                {
                    message: 'Invalid startDate!'
                }
            )
        }

        const projectExists = await this.projectModel.findOne({
            title,
            description
        });

        if (projectExists) {
            throw new ForbiddenException(
                {
                    message: 'Project with same title or description already exists!',
                    data: projectExists
                }
            )
        } else {
            const createdProject = await this.projectModel.create(
                {
                    title,
                    description,
                    owner,
                    status,
                    priority,
                    startDate,
                    progress: 0
                }
            );

            await this.businessModel.findByIdAndUpdate(owner, {
                $push: {
                    projects: createdProject
                }
            })

            return {
                message: 'Project Created Successfully!',
                data: createdProject
            }
        }
    }

    async getProjectsOfBusiness(id: string) {
        const projects = await this.projectModel.find({ owner: id });
        if (!projects.length) {
            throw new NotFoundException(
                {
                    message: 'Projects Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Projects Found!',
                data: projects
            }
        }
    }

    async getProjectsOfUser(id: string) {
        const projects = await this.projectModel.find({
            members: id
        });
        if (!projects.length) {
            throw new NotFoundException(
                {
                    message: 'Projects Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Projects Found!',
                data: projects
            }
        }
    }

    async getProjectById(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            })
        } else {
            return {
                message: 'Project Found!',
                data: project
            }
        }
    }

    async updateProject(id: string, member?: string, status?: "ongoing" | "completed" | "expired", priority?: "low" | "medium" | "urgent", progress?: number, startDate?: string, endDate?: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        } else if (status != 'completed' && status != 'ongoing' && status != 'expired') {
            throw new BadRequestException(
                {
                    message: 'Invalid Status!',
                }
            )
        } else if (priority != 'low' && priority != 'medium' && priority != 'urgent') {
            throw new BadRequestException(
                {
                    message: 'Invalid Priority!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            })
        } else {
            const updatedProject = await project.updateOne({
                $addToSet: {
                    members: member
                },
                status,
                priority,
                progress,
                startDate,
                endDate
            });
            return {
                message: 'Project Updated Successfully!',
                data: updatedProject
            }
        }
    }

    async addMembers(id: string, member: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            });
        } else {
            const updatedProjectWithAddedMembers = await project.updateOne({
                $addToSet: {
                    members: member
                }
            });
            await this.userModel.findByIdAndUpdate(member, {
                $addToSet: {
                    projects: project._id
                }
            })
            return {
                message: 'Member Added Successfully!',
                data: updatedProjectWithAddedMembers
            }
        }
    }

    async addMemberThroughUsername(id: string, username: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            });
        } else {
            const user = await this.userModel.findOne({
                username
            });

            if (!user) {
                throw new NotFoundException(
                    {
                        message: 'User with this username doesnot exists!'
                    }
                )
            } else {
                const updatedProjectWithAddedMembers = await project.updateOne({
                    $addToSet: {
                        members: user._id
                    }
                });
                await this.userModel.findByIdAndUpdate(user._id, {
                    $addToSet: {
                        projects: project._id
                    }
                })
                return {
                    message: 'Member Added Successfully!',
                    data: updatedProjectWithAddedMembers
                }
            }
        }
    }

    async deleteMember(id: string, member: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id,
                members: member
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            })
        } else {
            const updatedProjectWithDeletedMembers = await project.updateOne({
                $pull: {
                    members: member
                }
            })
            return {
                message: 'Member Deleted Successfully!',
                data: updatedProjectWithDeletedMembers
            }
        }
    }

    async deleteProject(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const project = await this.projectModel.findOne(
            {
                _id: id
            }
        );

        if (!project) {
            throw new NotFoundException({
                message: 'Project Not Found!',
            })
        } else {
            const deletedProject = await project.deleteOne();
            await this.businessModel.findByIdAndUpdate(project.owner, {
                $pull: {
                    projects: project._id
                }
            })
            return {
                message: 'Project Deleted Successfully!',
                data: deletedProject
            }
        }
    }

    async updateProjectProgress(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!'
                }
            )
        }

        const project = await this.projectModel.findOne({
            _id: id
        })

        if (!project) {
            throw new NotFoundException(
                {
                    message: 'Project Not Found!'
                }
            )
        } else {
            const totalMilestones = await this.milestoneModel.find({
                _id: {
                    $in: project.milestones
                },
            });

            const milestones = await this.milestoneModel.find({
                _id: {
                    $in: project.milestones
                },
                status: 'completed'
            });
            if (!totalMilestones.length) {
                throw new NotFoundException(
                    {
                        message: 'Milestone Doesnot Exists In Project!'
                    }
                )
            } else {
                const lengthOfTotalMilestones = totalMilestones.length;
                const progress = (milestones.length*100)/lengthOfTotalMilestones;

                await project.updateOne({
                    progress: progress
                });
                return {
                    message: 'Milestone Progress Updated!',
                    data: progress
                }
            }
        }

        
    }
}