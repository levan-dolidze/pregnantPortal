import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminHttpService } from 'src/app/admin/admin-http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { ApiService } from 'src/app/shared/services/api.service';
import { Question } from './model';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends GridDirective implements OnInit {

  constructor(private fb: FormBuilder,
    adminHttp: AdminHttpService,
    http: ApiService,
    _snackBar: MatSnackBar,
    private localStorage: LocalStorageService,



  ) {

    super(http, adminHttp, _snackBar)

  }
  form: FormGroup;



  get uid(): any {
    return this.localStorage.getTokenResult
  }


  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      question: new FormControl(null, [Validators.required])
    })
  }

  buildParams() {
    return {
      ...this.form.value,
      uid: this.uid.uid
    } as Question
  }

  onSubmit() {

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

      const params = this.buildParams()


      this.adminHttp.askQuestion(params).subscribe({
        next: (() => {

          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'შეკითხვა გაიგზავნა!',
              type: 'success'
            }
          })

        }),
        error: (() => {
          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'გაგზავნა ვერ მოხდა!',
              type: 'error'
            }
          })


        })
      })

    }

  }

}
