import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MilestonesService } from 'src/services/milestones/milestones.service';

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

    @Patch('update-milestone/:id')
    async updateMilestoneById(@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { description, status, progress, startDate, endDate } = body;
        const milestone = await this.milestoneService.updateMilestone(id, description, status, progress, startDate, endDate);
        response.json(milestone);
    }

    @Delete('delete-milestone/:id')
    async deleteMilestoneById(@Param() params, @Res() response: Response) {
        const { id } = params;
        const milestone = await this.milestoneService.deleteMilestone(id);
        response.json(milestone);
    }
}
