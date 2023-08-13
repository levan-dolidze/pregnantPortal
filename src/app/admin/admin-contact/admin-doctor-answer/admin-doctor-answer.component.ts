import { Component, OnInit, Optional, Inject, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorAnswer } from '../models';
import { AdminHttpService } from '../../admin-http.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-doctor-answer',
  templateUrl: './admin-doctor-answer.component.html',
  styleUrls: ['./admin-doctor-answer.component.scss']
})


export class AdminDoctorAnswerComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private adminHttp: AdminHttpService,
    @Optional() public dialogRef: MatDialogRef<AdminDoctorAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, question: string,uid:string },


  ) {


  }

  form: FormGroup

  buildParams() {
    return {
      ...this.form.value,
      uid:this.data.uid,
      questionKey:this.data.key,
      question: this.data.question,
    } as DoctorAnswer
  }


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      answer: new FormControl(null, [Validators.required])
    })
  }


  onAnswer() {

    if (this.form.invalid) {
      return
    }
    else {


      const params = this.buildParams()

      this.adminHttp.doctorAnswer(params).subscribe({
        next: (() => {

          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'პასუხი გაიგზავნა!',
              type: 'success'
            }
          })

          this.dialogRef.close()
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
