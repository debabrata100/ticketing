import { Publisher, OrderCreatedEvent, Subjects } from '@deb-ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
