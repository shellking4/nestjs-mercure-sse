import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import * as jwt from 'jsonwebtoken';
import { firstValueFrom } from "rxjs";


@Injectable()
export class MercureService {
    private hubUrl: string;
    private jwtKey: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
        this.hubUrl = this.configService.get('MERCURE_URL');
        this.jwtKey = this.configService.get('MERCURE_JWT_KEY');
    }

    async publish(data: any, topic?: string) {
        const token = jwt.sign({
            "mercure": {
                "publish": ["*"]
            }
        }, this.jwtKey, {
            algorithm: 'HS256',
            expiresIn: '1h',
            subject: 'mercure.publish',
        });
        let eventTopic = "";
        eventTopic = `/${topic.replaceAll("/", "")}`;
        const mercureCallObservable = this.httpService.post(`${this.hubUrl}`, {
            topic: eventTopic,
            data: JSON.stringify(data),
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        let response: any;
        try {
            const { data } = await firstValueFrom(mercureCallObservable);
            response = data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new BadRequestException(`An error occured ${axiosError}`)
        }
        return response;
    }
}