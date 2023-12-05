import { Component, OnInit, inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { BlogReq } from 'src/app/shared/models/interfaces';
import { AdminHttpService } from '../admin-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {


  constructor(
    private _snackBar: MatSnackBar,


  ) {

  }

  private httpAdmin = inject(AdminHttpService)


  ngOnInit(): void {
    this.initForm()
  }

  fb = inject(FormBuilder)
  storage = inject(AngularFireStorage)



  initForm() {
    this.form = this.fb.group({
      htmlContent: new FormControl(null, [Validators.required]),
      img: new FormControl(null)
    })
  }

  form: FormGroup;

  get f() {
    return this.form.controls
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    // sanitize: true,
    // toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };


  imgURL: unknown;
  selectedImage: unknown;

  selectedStuff: unknown;

  defaultImage = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;

      reader.readAsDataURL(event.target.files[0])
      this.selectedStuff = event.target.files[0];

      this.addFile(this.selectedStuff)

    } else {
      this.imgURL = this.defaultImage
      this.selectedStuff = null;
    }
  };

  isLoading: boolean = false;

  addBlogLoading: boolean = false

  photoUrl: string
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
            this.photoUrl = url
            this.isLoading = false
            // this.httpAdmin.insertMenu(obj)


          }
        })
      })
    ).subscribe(() => { })
  };




  buildParams(): BlogReq {

    const params = this.form.value
    params.img = this.photoUrl;
    return params
  }

  onAddBlog() {


    if (this.form.invalid) {
      return
    }
    else {
      const params = this.buildParams();


      this.httpAdmin.addBlogPost(params).subscribe({
        next: ((res) => {

          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'წარმატებით დაემატა!',
              type: 'success'
            }
          })
        }),
        error: ((err) => {
          console.error(err)
          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'დამატება ვერ მოხდა!!',
              type: 'error'
            }
          })
        })
      })


      console.log(params)
    }


  }
}
