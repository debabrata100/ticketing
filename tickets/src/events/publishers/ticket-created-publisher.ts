import { Publisher, Subjects, TicketCreatedEvent } from '@deb-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
