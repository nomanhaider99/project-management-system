import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor (@Inject() private configService: ConfigService) {}
    
    get port (): number {
        return this.configService.get<number>('PORT') as number;
    }

    get databaseUrl (): string {
        return this.configService.get<string>('MONGODB_URI') as string;
    }
}