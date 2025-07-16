import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from 'src/services/tasks/tasks.service';

@Controller('api/v1/tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    @Post('create-task')
    @HttpCode(200)
    async createTask(@Body() body, @Res() response: Response) {
        const { title, description, project, milestone } = body;
        const task = await this.taskService.createTask(title, project, milestone, description)
        response.json(task);
    }

    @Get('get-tasks/:id')
    async getTasksOfMilestone(@Body() body, @Res() response: Response, @Param() params) {
        const { id } = params;
        const { milestone } = body;
        const task = await this.taskService.getTasksOfMilestoneOfProject(milestone, id);
        response.json(task);
    }

    @Get('get-task/:id')
    async getTaskOfMilestone(@Res() response: Response, @Param() params) {
        const { id } = params;
        const milestone = await this.taskService.getTaskById(id);
        response.json(milestone);
    }

    @Patch('update-task/:id')
    async updateMilestoneById(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { description, status, progress, startDate, endDate } = body;
        const milestone = await this.taskService.updateTask(id, description, status, progress, startDate, endDate);
        response.json(milestone);
    }

    @Delete('delete-task/:id')
    async deleteMilestoneById(@Param() params, @Res() response: Response) {
        const { id } = params;
        const milestone = await this.taskService.deleteTask(id);
        response.json(milestone);
    }
}
