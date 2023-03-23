import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SignUp } from '../models/authModel';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Router } from '@angular/router';


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
    private router: Router

  ) { }

  form: FormGroup;
  signUp: SignUp


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
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
