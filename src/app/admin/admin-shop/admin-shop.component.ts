import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AddStuff, Stuffs } from '../models/shop';
import { AdminHttpService } from '../admin-http.service';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';


@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.scss']
})
export class AdminShopComponent extends GridDirective implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    adminHttp: AdminHttpService,

    http: ApiService,
    _snackBar: MatSnackBar,

    private router: Router,
  ) {


    super(http, adminHttp,_snackBar)
  }


  form: FormGroup;
  stuffs: Stuffs[];

  subscribtion = new Subscription()







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
        this._snackBar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: {
          message: 'შევსება სავალდებულოა!',
          type:'error'
        }
      })
      return

    } else {
      const params = this.form.value

      this.adminHttp.addStuff(params).subscribe(() => {
        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'წარმატებით დაემატა!',
            type:'success'
          }
        })
        this.initData()
      })


    }

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


  imgURL: unknown;
  selectedImage: unknown;


  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;

      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];

    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      this.selectedImage = null;

    }
  };


  // addFile(selectedFile: any, obj: any) {
  //   var filePath = `${selectedFile.name}_${new Date().getTime()}`
  //   const fileRef = this.storage.ref(filePath)
  //   this.storage.upload(filePath, selectedFile).snapshotChanges().pipe(
  //     finalize(() => {
  //       //url ში გვაქვს ახალი ატვირთული სურათი
  //       let service = localStorage.getItem('service');
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         if (url) {

  //           obj.file = url

  //               // this.httpAdmin.insertMenu(obj)


  //         }
  //       })
  //     })
  //   ).subscribe(() => { })
  // };













  ngOnDestroy(): void {
    super.destroy()
  }
}





