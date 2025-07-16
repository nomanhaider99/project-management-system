import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/models/task.models';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async createTask(title: string, project: string, milestone: string, description?: string) {
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
        } else if (!milestone) {
            throw new BadRequestException(
                {
                    message: 'Invalid Milestone Id!',
                }
            )
        }

        const taskExists = await this.taskModel.findOne(
            {
                title
            }
        );

        if (taskExists) {
            throw new ForbiddenException(
                {
                    message: 'Task Already Exists!',
                    data: taskExists
                }
            )
        } else {
            const createdTask = await this.taskModel.create(
                {
                    title,
                    description,
                    project,
                    milestone
                }
            );

            return {
                message: 'Task Created Successfully!',
                data: createdTask
            }
        }
    }

    async getTasksOfMilestoneOfProject(milestone: string, project: string) {
        const tasks = await this.taskModel.find({
            milestone,
            project
        });
        if (!tasks.length) {
            throw new NotFoundException(
                {
                    message: 'Tasks Not Found!',
                    data: null
                }
            )
        } else {
            return {
                message: 'Tasks Found!',
                data: tasks
            }
        }
    }

    async getTaskById(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }

        const task = await this.taskModel.findOne(
            {
                _id: id
            }
        );

        if (!task) {
            throw new NotFoundException({
                message: 'Task Not Found!',
            })
        } else {
            return {
                message: 'Task Found!',
                data: task
            }
        }
    }

    async updateTask(id: string, description?: string, status?: string, progress?: number, startDate?: string, endDate?: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            )
        }  

        const task = await this.taskModel.findOne(
            {
                _id: id
            }
        );

        if (!task) {
            throw new NotFoundException({
                message: 'Task Not Found!',
            })
        } else {
            const updatedTask = await task.updateOne({
                description,
                status,
                progress,
                startDate,
                endDate
            });
            return {
                message: 'Task Updated Successfully!',
                data: updatedTask
            }
        }
    }

    async deleteTask(id: string) {
        if (!id) {
            throw new BadRequestException(
                {
                    message: 'Invalid Id!',
                }
            );
        }

        const task = await this.taskModel.findOne(
            {
                _id: id
            }
        );

        if (!task) {
            throw new NotFoundException({
                message: 'Task Not Found!',
            });
        } else {
            const deletedTask = await task.deleteOne();
            return {
                message: 'Task Deleted Successfully!',
                data: deletedTask
            }
        }
    }
}
