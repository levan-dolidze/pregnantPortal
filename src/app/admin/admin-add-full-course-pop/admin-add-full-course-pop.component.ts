import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStuff, Stuffs } from '../models/shop';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminHttpService } from '../admin-http.service';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { fade, menu } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-admin-add-full-course-pop',
  templateUrl: './admin-add-full-course-pop.component.html',
  styleUrls: ['./admin-add-full-course-pop.component.scss'],
  animations: [menu, fade],

})
export class AdminAddFullCoursePopComponent extends GridDirective implements OnInit {


  constructor(
    @Optional() public dialogRef: MatDialogRef<AdminAddFullCoursePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string },
    private fb: FormBuilder,
    _snackBar: MatSnackBar,
    http: ApiService,
    adminHttp: AdminHttpService,
    private storage: AngularFireStorage,





  ) {


    super(http, adminHttp, _snackBar)


  }


  ngOnInit(): void {

    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      prise: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required]),
    } as { [key in keyof AddStuff]: FormControlOptions })
  }

  reqCourseImg: string


  form: FormGroup

  seasons: string[] = ['stuffs', 'courses'];

  onNewCourseAdd() {
    if (this.form.invalid) {
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: {
          message: 'შევსება სავალდებულოა!',
          type: 'error'
        }
      })
      return

    } else {
      const params = this.form.value

      params.img = this.reqCourseImg

      this.adminHttp.addNewFullCourse(params).subscribe(() => {
        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'წარმატებით დაემატა!',
            type: 'success'
          }
        })

        this.dialogRef.close()

      })
    }
  }

  imgURL: unknown;
  selectedImage: unknown;

  selectedStuff: unknown;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;

      reader.readAsDataURL(event.target.files[0])
      this.selectedStuff = event.target.files[0];

      this.addFile(this.selectedStuff)

    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      this.selectedStuff = null;
    }
  };


  isLoading: boolean = false

  addFile(selectedFile: any) {

    this.isLoading = true
    var filePath = `${selectedFile.name}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, selectedFile).snapshotChanges().pipe(
      finalize(() => {
        //url ში გვაქვს ახალი ატვირთული სურათი
        let service = localStorage.getItem('service');
        fileRef.getDownloadURL().subscribe((url: any) => {
          if (url) {
            this.reqCourseImg = url

            this.isLoading = false
            console.log(this.reqCourseImg)
            // this.httpAdmin.insertMenu(obj)


          }
        })
      })
    ).subscribe(() => { })
  };

}
