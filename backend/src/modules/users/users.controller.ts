import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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

    @Get('/login-user/:email/:password')
    async loginUser (@Param() params, @Res() response: Response) {
        const { email, password } = params;
        const user = await this.userService.loginUser(email, password, response);
        response.json(user);
    }
}