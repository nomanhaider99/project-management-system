import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './users.service';

@Controller('/api/v1/users')
export class UsersController {
    constructor (private userService: UserService) {}
    @Post('create-user')
    @HttpCode(200)
    async registerUser (@Body() body, @Res() response: Response) {
        const { username, email, password } = body;
        const user = await this.userService.createUser(username, email, password)
        response.json(user);
    }

    @Get('get-users')
    async getAllUsers (@Res() response: Response) {
        const user = await this.userService.getUsers()
        response.json(user);
    }

    @Get('get-user/:id')
    async getUser (@Res() response: Response, @Param() params) {
        const { id } = params;
        const user = await this.userService.getUserById(id)
        
        response.json(user);
    }

    @Post('get-users-by-ids')
    async getUsersByIds (@Res() response: Response, @Body() body) {
        const { ids } = body;
        const user = await this.userService.getUsersByIds(ids)
        
        response.json(user);
    }

    @Patch('update-user/:id')
    async updateUserById (@Body() body, @Param() params, @Res() response: Response) {
        const { id } = params;
        const { tagline, description, image, skills } = body;
        const user = await this.userService.updateUser(id, tagline, description, image, skills);
        response.json(user);
    }

    @Delete('delete-user/:id')
    async deleteUserById (@Param() params, @Res() response: Response) {
        const { id } = params;
        const user = await this.userService.deleteUser(id);
        response.json(user);
    }

    @Post('/login-user')
    async loginUser (@Body() body, @Res() response: Response) {
        const { email, password } = body;
        const user = await this.userService.loginUser(email, password, response);
        response.json(user);
    }

    @Get('/get-loggedin-user')
    async getLoggedInUser (@Req() request: Request, @Res() response: Response) {
        const user = await this.userService.getLoggedInUser(request);
        response.json(user);
    }

    @Get('/logout-user')
    async logoutUser (@Req() request: Request, @Res() response: Response) {
        const user = await this.userService.logoutUser(request, response);
        response.json(user);
    }

    @Get('/is-loggedin')
    async isLoggedIn (@Req() request: Request, @Res() response: Response) {
        const user = await this.userService.isLoggedIn(request);
        response.json(user);
    }
}