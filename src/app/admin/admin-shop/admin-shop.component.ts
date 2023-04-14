import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AddStuff, Stuffs } from '../models/shop';
import { AdminHttpService } from '../admin-http.service';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.scss']
})
export class AdminShopComponent extends GridDirective implements OnInit {

  constructor(private fb: FormBuilder,
     adminHttp: AdminHttpService,

    http: ApiService,
    private router: Router
  ) {


    super(http,adminHttp)
  }


  form: FormGroup;
  stuffs: Stuffs[];






  initData() {
    this.initGet(this.adminHttp, 'getStuffs', null)
  }


  ngOnInit(): void {


    this.initForm()

    this.initData()

    this.getStuff()


  }

  displayedColumns: GridConfig[]

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


      },

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


  onAdd() {

    if (this.form.invalid) {
      return
    } else {
      const params = this.form.value

      this.adminHttp.addStuff(params).subscribe(() => {

        this.initData()
      })


    }

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
}





