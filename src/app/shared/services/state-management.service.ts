import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  private componentStates = new Map<string, any>();

  saveState(componentKey: string, state: any) {
    this.componentStates.set(componentKey, state);
    console.log('set state:', this.componentStates);
  }

  getState(componentKey: string): any {
    console.log('get state:', this.componentStates)
    return this.componentStates.get(componentKey);
  }

  // Optionally, a method to clear state
  clearState(componentKey: string) {
    this.componentStates.delete(componentKey);
  }
}
