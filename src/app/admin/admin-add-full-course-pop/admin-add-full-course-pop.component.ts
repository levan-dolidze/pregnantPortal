import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stuffs } from '../models/shop';

@Component({
  selector: 'app-admin-add-full-course-pop',
  templateUrl: './admin-add-full-course-pop.component.html',
  styleUrls: ['./admin-add-full-course-pop.component.scss']
})
export class AdminAddFullCoursePopComponent {


  constructor(
    @Optional() public dialogRef: MatDialogRef<AdminAddFullCoursePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string },

  ) {

  }
}
