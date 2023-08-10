import { Component,OnInit,OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminHttpService } from '../admin-http.service';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { AddStuff, Stuffs } from '../models/shop';
import { Subscription } from 'rxjs';
import { GridConfig } from 'src/app/shared/components/grid-config';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent extends GridDirective implements OnInit,OnDestroy {

  
  constructor(
    
    http: ApiService,
    _snackBar: MatSnackBar,
    adminHttp: AdminHttpService,
    private fb: FormBuilder,
    private router:Router

  ){

    super(http, adminHttp,_snackBar)

  }

  form: FormGroup;
  stuffs: Stuffs[];

  subscribtion = new Subscription()
  ngOnInit(): void {
    this.initForm()

    this.initData()

    this.getCourses()


  }


  initData() {
    this.initGet(this.adminHttp, 'getCourses', null)
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
      // {
      //   title: 'ფოტო',
      //   label: 'label',
      //   onClick: true,
      //   getData: this.stuffs.map(x => x.img),
      // },
      {
        title: 'პროდუქტის ტიპი',
        label: 'label',
        onClick: true,
        getData: this.stuffs.map(x => x.productType),
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


 

  getCourses() {
    this.subscribtion = this.adminHttp.getCourses().subscribe({
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
      case 'confirm':
        //should share video data into users my courses page
        console.log(123)
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
