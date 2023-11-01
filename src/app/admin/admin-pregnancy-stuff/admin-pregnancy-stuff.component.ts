import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminHttpService } from '../admin-http.service';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AddStuff, Stuffs } from '../models/shop';
import { Subscription } from 'rxjs';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/features/shop/shop.service';
import { IOrder } from 'src/app/features/shop/model';

@Component({
  selector: 'app-admin-pregnancy-stuff',
  templateUrl: './admin-pregnancy-stuff.component.html',
  styleUrls: ['./admin-pregnancy-stuff.component.scss']
})
export class AdminPregnancyStuffComponent extends GridDirective implements OnInit,OnDestroy{



  constructor(
    
    http: ApiService,
    _snackBar: MatSnackBar,
    adminHttp: AdminHttpService,
    private fb: FormBuilder,
    private router:Router,
    private shopService:ShopService

  ){

    super(http, adminHttp,_snackBar)

  }


  form: FormGroup;
  stuffs: any[];

  subscribtion = new Subscription()
  ngOnInit(): void {
    this.initForm()

    this.initData()

    this.getStuff()


  }


  initData() {
    this.initGet(this.shopService, 'getOrderedStuff', null)
  }
  displayedColumns: GridConfig[]

  override getData(data: any): void {
    this.stuffs = data

    console.log(this.stuffs)

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
        getData: this.stuffs.map(x => x.stuff.title),
      },
      {
        title: 'აღწერა',
        label: 'uhuhds',
        onClick: true,
        getData: this.stuffs.map(x => x.stuff.description),

        actions: ['edit']

      },
      {
        title: 'ფასი',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.stuff.prise),
      },
      {
        title: 'პროდუქტის ტიპი',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.stuff.productType),
      },
      // {
      //   title: 'ფოტო',
      //   label: 'label',
      //   onClick: true,
      //   getData: this.stuffs.map(x => x.img),
      // },

    ];

  }



  initForm() {
    this.form = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      prise: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
    } as { [key in keyof AddStuff]: FormControlOptions })

  }


 

  getStuff() {
    this.subscribtion = this.adminHttp.getStuffs().subscribe({
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
