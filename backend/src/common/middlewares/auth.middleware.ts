import { Inject, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserUtilsService } from "../utils/users/user.utils.service";
import { AppConfigService } from "src/config/config.service";

export class AuthMiddleware implements NestMiddleware {
    constructor(@Inject(UserUtilsService) private userUtilsService: UserUtilsService, @Inject(AppConfigService) private appConfigService: AppConfigService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.cookie?.slice(6);
        if (!token) {
            console.log("Token Not Found!")
            res.redirect('/login')
        } else {
            const decodedToken: any = verify(token, this.appConfigService.jwtSecret);
            console.log({
                _id: decodedToken._id,
                email: decodedToken.email
            });

            const user = await this.userUtilsService.getUserByEmail(decodedToken.email);

            if (user !== undefined) {
                next();
            }
        }
    }
}