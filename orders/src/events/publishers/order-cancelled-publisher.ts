import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@deb-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
