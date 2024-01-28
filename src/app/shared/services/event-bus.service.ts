import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { EventBusEvent } from '../models/event-bus'; // Import your interface

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventBus: Subject<EventBusEvent> = new Subject<EventBusEvent>();

  emit(event: EventBusEvent): void {
    console.log(`Event emitted by: ${event.sender}`);
    this.eventBus.next(event);
  }

  on(): Observable<EventBusEvent> {
    return this.eventBus.asObservable();
  }
}
