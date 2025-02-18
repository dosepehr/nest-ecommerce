import { Module } from '@nestjs/common';
import { TicketMessagesService } from './ticket_messages.service';
import { TicketMessagesController } from './ticket_messages.controller';

@Module({
  controllers: [TicketMessagesController],
  providers: [TicketMessagesService],
})
export class TicketMessagesModule {}
