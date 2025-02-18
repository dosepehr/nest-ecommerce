import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketMessageDto } from './create-ticket_message.dto';

export class UpdateTicketMessageDto extends PartialType(CreateTicketMessageDto) {}
