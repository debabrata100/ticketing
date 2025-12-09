import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@deb-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
