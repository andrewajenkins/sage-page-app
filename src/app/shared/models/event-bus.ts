import { ActionEvent } from '../../sage-app/shared/models/actionEvent';

export interface EventBusEvent {
  sender: string;
  action: ActionEvent;
  value: any;
}
