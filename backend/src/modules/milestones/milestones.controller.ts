import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MilestonesService } from './milestones.service';

@Controller('api/v1/milestones')
export class MilestonesController {
    constructor(private milestoneService: MilestonesService) { }
    @Post('create-milestone')
    @HttpCode(200)
    async createMilestone(@Body() body, @Res() response: Response) {
        const { title, description, project } = body;
        const milestone = await this.milestoneService.createMilestone(title, project, description);
        response.json(milestone);
    }

    @Get('get-milestones')
    async getAllMilestones(@Res() response: Response) {
        const milestone = await this.milestoneService.getMilestones()
        response.json(milestone);
    }

    @Get('get-milestone/:id')
    async getMilestoneOfProject(@Res() response: Response, @Param() params) {
        const { id } = params;
        const milestone = await this.milestoneService.getMilestoneById(id)

        response.json(milestone);
    }

    @Get('get-milestone-of-project/:project')
    async getMilestoneOfAProject(@Res() response: Response, @Param() params) {
        const { project } = params;
        const milestone = await this.milestoneService.getMilestonesOfProject(project);

        response.json(milestone);
    }

    @Patch('update-milestone/:id')
    async updateMilestoneById(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { description, status } = body;
        const milestone = await this.milestoneService.updateMilestone(id, description, status);
        response.json(milestone);
    }

    @Get('update-milestone-progress/:id/:project')
    async updateMilestoneStatus(@Param() params, @Res() response: Response) {
        const { id, project } = params;
        const milestone = await this.milestoneService.updateMilestoneStatus(id, project);
        response.json(milestone);
    }

    @Delete('delete-milestone/:id')
    async deleteMilestoneById(@Param() params, @Res() response: Response) {
        const { id } = params;
        const milestone = await this.milestoneService.deleteMilestone(id);
        response.json(milestone);
    }
}
