import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AddStuff, Stuffs } from '../models/shop';
import { AdminHttpService } from '../admin-http.service';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { UIList } from './enum';
import { fade, menu } from 'src/app/shared/animations/animations';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.scss'],
  animations: [menu, fade],
})
export class AdminShopComponent extends GridDirective implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    adminHttp: AdminHttpService,
    private storage: AngularFireStorage,
    http: ApiService,
    _snackBar: MatSnackBar,

    private router: Router,
  ) {


    super(http, adminHttp, _snackBar)
  }


  seasons: string[] = ['stuffs','courses'];

  shopForm: FormGroup;
  courseForm: FormGroup;

  subscribtion = new Subscription()



  UIList = UIList;
  viewMode: string;

  selectedStuff: unknown;
  stuffURL: unknown;

  isLoading:boolean=false

  onItemValChange(e: any) {

  }



  ngOnInit(): void {


    this.initShopForm()
    this.initCourseForm()
    this.viewMode = 'shopForm';


  }



  shopView() {
    this.viewMode = this.UIList.shopForm;
    sessionStorage.setItem('mode', this.viewMode);
  };
  courseView() {
    this.viewMode = this.UIList.coursesForm;
    sessionStorage.setItem('mode', this.viewMode)
  };



  paginGenerator() {
    const isRight = this.viewMode === 'shopForm' ? true : false
    return isRight ? 'arrow_right' : 'arrow_left'
  }





  miniNavigate() {
    this.viewMode = this.viewMode === 'shopForm' ? 'coursesForm' : 'shopForm';
  }




  initShopForm() {
    this.shopForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      prise: new FormControl(null, [Validators.required]),
      img: new FormControl(null),
      productType: new FormControl(null)
    } as { [key in keyof AddStuff]: FormControlOptions })
  }


  initCourseForm() {
    this.courseForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      prise: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required]),
    } as { [key in keyof AddStuff]: FormControlOptions })
  }



  onNewStuffAdd() {


    if (this.shopForm.invalid) {
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: {
          message: 'შევსება სავალდებულოა!',
          type: 'error'
        }
      })
      return

    } else {
      const params = this.shopForm.value

      params.img = this.reqStuffImg

      console.log(params)

      this.adminHttp.addNewStuff(params).subscribe(() => {
        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'წარმატებით დაემატა!',
            type: 'success'
          }
        })
      })
    }
  }


  onNewCourseAdd() {
    if (this.courseForm.invalid) {
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: {
          message: 'შევსება სავალდებულოა!',
          type: 'error'
        }
      })
      return

    } else {
      const params = this.courseForm.value

      params.img =this.reqCourseImg

      this.adminHttp.addNewCourse(params).subscribe(() => {
        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'წარმატებით დაემატა!',
            type: 'success'
          }
        })
      })
    }
  }



  imgURL: unknown;
  selectedImage: unknown;


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


  get sf(): any {
    return this.shopForm.controls;
  }

  reqStuffImg: string
  reqCourseImg: string
  addFile(selectedFile: any) {

    this.isLoading=true
    var filePath = `${selectedFile.name}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, selectedFile).snapshotChanges().pipe(
      finalize(() => {
        //url ში გვაქვს ახალი ატვირთული სურათი
        let service = localStorage.getItem('service');
        fileRef.getDownloadURL().subscribe((url: any) => {
          if (url) {
            this.reqStuffImg = url
            this.reqCourseImg=url

            this.isLoading=false
            // this.httpAdmin.insertMenu(obj)


          }
        })
      })
    ).subscribe(() => { })
  };




  ngOnDestroy(): void {
    super.destroy()
  }
}





