import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProjectService } from './projects.service';

@Controller('api/v1/projects')
export class ProjectsController {
    constructor(private projectService: ProjectService) { }
    @Post('create-project')
    @HttpCode(200)
    async registerProject(@Body() body, @Res() response: Response) {
        const { title, description, owner, status, priority, startDate } = body;
        const project = await this.projectService.createProject(title, description, owner, status, priority, startDate);
        response.json(project);
    }

    @Get('get-projects/:id')
    async getAllProjects(@Res() response: Response, @Param() params) {
        const { id } = params;
        const project = await this.projectService.getProjectsOfBusiness(id);
        response.json(project);
    }

    @Get('get-projects-of-user/:id')
    async getProjectsOfUser(@Res() response: Response, @Param() params) {
        const { id } = params;
        const project = await this.projectService.getProjectsOfUser(id);
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
        const { member, status, priority, progress, startDate, endDate } = body;
        const project = await this.projectService.updateProject(id, member, status, priority, progress, startDate, endDate);
        response.json(project);
    }

    @Patch('add-member/:id')
    async addMembers(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { member } = body;
        const project = await this.projectService.addMembers(id, member);
        response.json(project);
    }

    @Patch('add-member-by-username/:id')
    async addMembersByUsername(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { username } = body;
        const project = await this.projectService.addMemberThroughUsername(id, username);
        response.json(project);
    }

    @Patch('delete-member/:id')
    async deleteMemberById(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { member } = body;
        const project = await this.projectService.deleteMember(id, member);
        response.json(project);
    }

    @Delete('delete-project/:id')
    async deleteProjectById(@Param() params, @Res() response: Response) {
        const { id } = params;
        const project = await this.projectService.deleteProject(id);
        response.json(project);
    }

    @Get('update-project-progress/:id') 
    async getMilestoneOfProject (@Param() params, @Res() response: Response) {
        const { id } = params;
        const project = await this.projectService.updateProjectProgress(id);
        response.json(project);
    }
}
