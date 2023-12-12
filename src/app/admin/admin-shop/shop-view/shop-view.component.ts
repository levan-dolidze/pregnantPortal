import { Component,OnInit } from '@angular/core';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { Stuffs } from '../../models/shop';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminHttpService } from '../../admin-http.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss']
})
export class ShopViewComponent extends GridDirective implements OnInit {

  constructor(private fb: FormBuilder,
    adminHttp: AdminHttpService,

    http: ApiService,
    _snackBar: MatSnackBar,

    private router: Router,
  ) {


    super(http, adminHttp, _snackBar)
  }



  stuffs: Stuffs[];
  displayedColumns: GridConfig[]


  ngOnInit(){
    this.initData()
    this.getStuff()
    
  }
  initData() {
    this.initGet(this.adminHttp, 'getStuffs', null)
  }
  
  override getData(data: any): void {
    this.stuffs = data

    this.displayedColumns = [
      {
        title: 'key',
        label: 'uhuhds',
        onClick: true,
        getData: this.stuffs.map(x => x.key),
      },
      {
        title: 'დასახელება',
        label: 'uhuhds',
        onClick: true,
        getData: this.stuffs.map(x => x.title),
      },
      {
        title: 'აღწერა',
        label: 'uhuhds',
        onClick: true,
        getData: this.stuffs.map(x => x.description),

        actions: ['edit']

      },
      {
        title: 'ფასი',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.prise),


      },
      {
        title: 'ფოტო',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.img),
        isImage:true
      },
      {
        title: 'პროდუქტის ტიპი',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.productType),
      },
    ];
  }

  getStuff() {
    this.adminHttp.getStuffs().subscribe({
      next: (res) => {
        this.stuffs = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  
  onAction(message: GridActionTypes) {

    const findKey = message.data.find((res: any) => {
      return res.title === 'key'

    })
    const key = findKey.getData[message.index];

    switch (message.types) {
      case 'cancel':
        this.initDelete(this.adminHttp, 'deleteStuff', key)
        break;
      case 'detail':
        this.router.navigate([`/admin/admin-shop/${key}/admin-shop-detail`])
        break;
    }



  }

  
  ngOnDestroy(): void {
    super.destroy()
  }

}
