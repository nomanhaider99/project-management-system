import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Business } from "src/models/business.models";
import { Project } from "src/models/project.models";
import { User } from "src/models/user.models";
import moment from 'moment';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>, @InjectModel(Business.name) private businessModel: Model<Business>) { }

    async createProject(title: string, description: string, owner: Business) {
        if (!title) {
            throw new BadRequestException(
                {
                    message: 'Invalid Title!'
                }
            )
        } else if (!description) {
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
                    owner
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
            })
            return {
                message: 'Member Added Successfully!',
                data: updatedProjectWithAddedMembers
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
}