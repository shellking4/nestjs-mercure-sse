import { Body, Controller, Post } from "@nestjs/common";
import { MercureService } from "./mercure.service";
import { IEventPayload } from "./IEventPayload";


@Controller('events')
export class EventsController {

    constructor(
        private mercureService: MercureService
    ) { }

    @Post()
    async notify(@Body() body: IEventPayload) {
        const { topic, data } = body;
        await this.mercureService.publish(data, topic);
        return { success: true };
    }
}