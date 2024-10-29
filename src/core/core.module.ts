import { Module } from '@nestjs/common';
import { MercureService } from './mercure.service';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';

@Module({
    imports: [HttpModule],
    controllers: [EventsController],
    providers: [MercureService],
})
export class CoreModule { }
