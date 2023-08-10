import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/features/shop/shop.service';
import { FullCourse, Stuffs } from '../models/shop';
import { AdminHttpService } from '../admin-http.service';

@Component({
  selector: 'app-admin-uploaded-full-courses',
  templateUrl: './admin-uploaded-full-courses.component.html',
  styleUrls: ['./admin-uploaded-full-courses.component.scss']
})
export class AdminUploadedFullCoursesComponent implements OnInit {

  constructor(private route: ActivatedRoute,

    public _snackBar: MatSnackBar,
    private adminService: AdminHttpService,

  ) {
    this.key = this.route.snapshot.paramMap.get('key')

  }

  key: string

  fullCourses: FullCourse[]
  ngOnInit() {

    this.getFullCourses()

  }


  getFullCourses() {
    this.adminService.getFullCourses().subscribe({
      next: ((res) => {
       this.fullCourses=res
       console.log(this.fullCourses)

      }),
      error: ((res) => {

      })

    })
  }



}
