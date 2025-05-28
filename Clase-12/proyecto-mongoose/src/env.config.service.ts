import { Injectable } from "@nestjs/common";
import { EnvironmentVariables } from "./environment.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvConfigService {

    constructor(private configService: ConfigService){}

    get mongoUrl() : string{
        return this.configService.get<string>('MONGO_URL');
    }

    get environment(): EnvironmentVariables{
        return this.configService.get<EnvironmentVariables>();
    }

}