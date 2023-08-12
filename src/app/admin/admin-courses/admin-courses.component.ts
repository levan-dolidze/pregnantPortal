import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminHttpService } from '../admin-http.service';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { AddStuff, OrderedFullCourse, Stuffs } from '../models/shop';
import { Subscription } from 'rxjs';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { ShopService } from 'src/app/features/shop/shop.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent extends GridDirective implements OnInit, OnDestroy {


  constructor(

    http: ApiService,
    _snackBar: MatSnackBar,
    adminHttp: AdminHttpService,
    private fb: FormBuilder,
    private router: Router,
    private shopService: ShopService,

  ) {

    super(http, adminHttp, _snackBar)

  }

  form: FormGroup;
  orderedCourses: OrderedFullCourse[];

  subscribtion = new Subscription()
  ngOnInit(): void {
    this.initForm()

    this.initData()

    // this.getCourses()


  }


  initData() {
    this.initGet(this.shopService, 'getOrderedCourse', null)
  }
  displayedColumns: GridConfig[]

  override getData(data: any): void {
    this.orderedCourses = data


    console.log(this.orderedCourses)
    this.displayedColumns = [
      {
        title: 'key',
        label: 'uhuhds',
        onClick: true,
        forBackOnly: true,
        getData: this.orderedCourses.map(x => x.key),
      },
      {
        title: 'დასახელება',
        label: 'uhuhds',
        onClick: true,
        getData: this.orderedCourses.map(x => x.stuff.title),
      },
      {
        title: 'აღწერა',
        label: 'uhuhds',
        onClick: true,
        getData: this.orderedCourses.map(x => x.stuff.description),

        actions: ['edit']

      },
      {
        title: 'ფასი',
        label: 'label',
        onClick: true,
        getData: this.orderedCourses.map(x => x.stuff.prise),


      },
      {
        title: 'uid',
        label: 'label',
        onClick: true,
        forBackOnly: true,
        getData: this.orderedCourses.map(x => x.stuff.uid),
      },
      {
        title: 'პროდუქტის ტიპი',
        label: 'label',
        onClick: true,
        getData: this.orderedCourses.map(x => x.stuff.productType),
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




  // getCourses() {
  //   this.subscribtion = this.adminHttp.getCourses().subscribe({
  //     next: (res) => {
  //       this.orderedCourses = res
  //       console.log(this.orderedCourses)
  //     },
  //     error: (err) => {
  //       console.error(err)
  //     }
  //   })
  // }


  confirmFullCourse(data: OrderedFullCourse) {
    this.adminHttp.confirmFullCourse(data).subscribe({
      next: ((res) => {

        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'კურსი დადასტურდა!',
            type: 'success'
          }
        })

      }),
      error: ((err) => {
        console.error(err)

      })
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
      case 'confirm':
        const confirmed = this.orderedCourses[message.index]
        this.confirmFullCourse(confirmed)
        break;
      case 'detail':
        this.router.navigate([`/admin/admin-courses/${key}/admin-shop-detail`])
        break;
    }
  }


  ngOnDestroy(): void {
    super.destroy()
  }


}
