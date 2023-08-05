import { Component,Optional,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/features/shop/shop.service';
import { Stuffs } from '../models/shop';

@Component({
  selector: 'app-admin-uploaded-full-courses',
  templateUrl: './admin-uploaded-full-courses.component.html',
  styleUrls: ['./admin-uploaded-full-courses.component.scss']
})
export class AdminUploadedFullCoursesComponent {

  constructor(private route: ActivatedRoute,
    

    public _snackBar: MatSnackBar
    ) {
    this.key = this.route.snapshot.paramMap.get('key')

  }


  key: string

}
