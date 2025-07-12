import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Business } from "src/models/business.models";
import { Project } from "src/models/project.models";
import { User } from "src/models/user.models";

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

            await this.businessModel.findOne({
                _id: owner
            }).updateMany({
                projects: createdProject
            });

            return {
                message: 'Project Created Successfully!',
                data: createdProject
            }
        }
    }

    async getProjects() {
        const projects = await this.projectModel.find();
        if (!projects) {
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

    async updateProject(id: string, members?: User[], status?: "ongoing" | "completed" | "expired", priority?: "low" | "medium" | "urgent", progress?: number, startDate?: Date, endDate?: Date) {
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
            const updatedProject = await this.projectModel.updateOne({
                members,
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

    async addMembers(id: string, members: User[]) {
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
            const updatedProject = await this.projectModel.updateOne({
                members,
            });
            return {
                message: 'Members Added Successfully!',
                data: updatedProject
            }
        }
    }

    async deleteMembers(id: string, members: User[]) {
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
            const filteredMembers = project.members?.filter((value) => members.forEach((member) => value !== member));
            return {
                message: 'Members Deleted Successfully!',
                data: filteredMembers
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
            return {
                message: 'Project Deleted Successfully!',
                data: deletedProject
            }
        }
    }
}