import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProjectService } from 'src/services/projects/projects.service';

@Controller('api/v1/projects')
export class ProjectsController {
    constructor(private projectService: ProjectService) { }
    @Post('create-project')
    @HttpCode(200)
    async registerProject(@Body() body, @Res() response: Response) {
        const { title, description, owner } = body;
        const project = await this.projectService.createProject(title, description, owner);
        response.json(project);
    }

    @Get('get-projects')
    async getAllProjects(@Res() response: Response) {
        const project = await this.projectService.getProjects();
        response.json(project);
    }

    @Get('get-project/:id')
    async getProject(@Res() response: Response, @Param() params) {
        const { id } = params;
        const project = await this.projectService.getProjectById(id);
        response.json(project);
    }

    @Patch('update-project/:id')
    async updateProjectById(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { members, status, priority, progress, startDate, endDate } = body;
        const project = await this.projectService.updateProject(id, members, status, priority, progress, startDate, endDate);
        response.json(project);
    }

    @Delete('delete-project/:id')
    async deleteProjectById(@Param() params, @Res() response: Response) {
        const { id } = params;
        const project = await this.projectService.deleteProject(id);
        response.json(project);
    }
}
