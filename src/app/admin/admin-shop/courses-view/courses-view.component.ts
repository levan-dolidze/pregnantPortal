import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { AdminHttpService } from '../../admin-http.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { Stuffs } from '../../models/shop';
import { GridConfig } from 'src/app/shared/components/grid-config';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss']
})
export class CoursesViewComponent  extends GridDirective implements OnInit  {


  constructor(private fb: FormBuilder,
    adminHttp: AdminHttpService,

    http: ApiService,
    _snackBar: MatSnackBar,

    private router: Router,
  ) {


    super(http, adminHttp, _snackBar)
  }


  courses: Stuffs[];
  displayedColumns: GridConfig[]

  ngOnInit(){
    this.initData()
    this.getCourses()
    
  }

  initData() {
    this.initGet(this.adminHttp, 'getCourses', null)
  }
  
  override getData(data: any): void {
    this.courses = data

    this.displayedColumns = [
      {
        title: 'key',
        label: 'uhuhds',
        onClick: true,
        getData: this.courses.map(x => x.key),
      },
      {
        title: 'დასახელება',
        label: 'uhuhds',
        onClick: true,
        getData: this.courses.map(x => x.title),
      },
      {
        title: 'აღწერა',
        label: 'uhuhds',
        onClick: true,
        getData: this.courses.map(x => x.description),

        actions: ['edit']

      },
      {
        title: 'ფასი',
        label: 'label',
        onClick: true,
        getData: this.courses.map(x => x.prise),


      },
      {
        title: 'ფოტო',
        label: 'label',
        onClick: true,
        getData: this.courses.map(x => x.img),
      }
   
    ];
  }

  getCourses() {
    this.adminHttp.getCourses().subscribe({
      next: (res) => {
        this.courses = res
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
