import { Publisher, Subjects, TicketUpdatedEvent } from '@deb-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
