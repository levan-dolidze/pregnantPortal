import { Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { GridConfig } from '../grid-config';
import { AdminHttpService } from 'src/app/admin/admin-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';

@Directive({
  selector: '[appGrid]'
})
export class GridDirective {

  constructor(private http: ApiService,
    public adminHttp: AdminHttpService,
     public _snackBar: MatSnackBar


  ) {




  }

  columnConfig: { [key: string]: GridConfig };


  initGet(service: any, method: string, params: any) {


    
    service[method](params).subscribe({

      next: ((res: Array<unknown>) => {
        this.getData(res)
      }),
    })


  }


  getData(data: unknown[]) {

  }

  initDelete(service: any, method: string, key: any) {
  this.subscription= service[method](key).subscribe({
      next: ((res: Array<unknown>) => {
        this.adminHttp.dataSubject.subscribe((res) => {

          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'წარმატებით წაიშალა!',
              type:'success'
            }
          })
          this.getData(res)
        })
      }),
    })

  }



  subscription = new Subscription
  destroy() {
    this.subscription.unsubscribe();
  }





}
