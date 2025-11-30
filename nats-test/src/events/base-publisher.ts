import { Stan } from 'node-nats-streaming';
import { Subjects } from './sujects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];

  private client;
  constructor(stan: Stan) {
    this.client = stan;
  }
  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        }
        console.log(`Event Publish to subject ${this.subject}`);
        resolve();
      });
    });
  }
}
