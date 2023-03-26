import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertTypes } from 'src/app/shared/layout/models/alertTypes';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  private defaultId = 'default-alert'
  private subject = new Subject<Alert>();


  success(message: string, options?: any) {

    this.alert(new Alert({ ...options, type: AlertTypes.Success, message }));

  }
  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertTypes.Error, message }));
  }
  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertTypes.Info, message }));
  }
  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertTypes.Warning, message }));
  }


  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    this.subject.next(alert);
  }


}
