import { Component, OnInit, inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {



  ngOnInit(): void {
    this.initForm()
  }

  fb = inject(FormBuilder)
   storage = inject(AngularFireStorage) 



  initForm() {
    this.form = this.fb.group({
      htmlContent: new FormControl(null),
      img:new FormControl(null)
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

  isLoading:boolean=false

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




  onAddBlog(){
    console.log(this.form.value)
  }
}
