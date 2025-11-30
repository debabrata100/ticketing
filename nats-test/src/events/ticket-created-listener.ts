import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './sujects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);
    console.log('Event data', data.id);
    console.log('Event data', data.title);
    console.log('Event data', data.price);

    msg.ack();
  }
}
