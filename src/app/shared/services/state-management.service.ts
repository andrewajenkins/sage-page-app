import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  private componentStates = new Map<string, any>();

  saveState(componentKey: string, state: any) {
    this.componentStates.set(componentKey, state);
    console.log('set state:', componentKey, this.componentStates);
  }

  getState(componentKey: string): any {
    console.log('get state:', componentKey, this.componentStates);
    return this.componentStates.get(componentKey);
  }
}
