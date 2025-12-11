import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@deb-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
