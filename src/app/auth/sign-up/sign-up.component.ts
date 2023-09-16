import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlOptions } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SignUp } from '../models/authModel';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Router } from '@angular/router';
import { regExp } from 'src/app/shared/validations/regex';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { promoCodeDetails: any },
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,


  ) { }

  form: FormGroup;
  signUp: SignUp


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required,Validators.pattern(regExp.email)]],
      password: [null, [Validators.required,Validators.minLength(6)]]
    } as { [key in keyof SignUp]: FormControlOptions })
  }


  async onSignUp() {
    if (this.form.invalid) {
      return
    } else {
      const params = this.form.value
      await this.authservice.signUp(params);
      this.verifyEmail();
      this.dialogRef.close();
      this.router.navigate([''])
      
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 5000,
        data: {
          message: 'თქვენს მეილზე გაგზავნილია ვერიფიკაციის ლინკი, გთხოვთ გახნათ გამოგზავნილი ლინკი!',
          type: 'error'
        }
      })


    }
  };


  verifyEmail() {
    const auth = getAuth();
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeout(() => {
          }, 3000);
        });
    }
  };

}
