import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlOptions,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SignUp } from '../models/authModel';
import {
  getAuth,
  sendEmailVerification,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { regExp } from 'src/app/shared/validations/regex';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    @Optional() public dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { promoCodeDetails: any },
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,

  ) {}

  form: FormGroup;
  signUp: SignUp;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regExp.email)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    } as { [key in keyof SignUp]: FormControlOptions });
  }

  async onSignUp() {
    if (this.form.invalid) {
      return;
    } else {
      const params = this.form.value;
      await this.authservice.signUp(params);
      this.verifyEmail();
    }
  }


  // updateProfile (auth:any){
  //   updateProfile(auth.currentUser, {
  //     displayName: 'admin', 
  //     photoURL: null 
  //   }).then(() => {
  //     console.log('User profile updated successfully');
  //   }).catch((error) => {
  //     console.error('Error updating profile:', error);
  //   });
  // }

  
  verifyEmail() {
    const auth = getAuth();

  
    console.log(auth.currentUser)
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        // this.authservice.storeNewUser()
        this.dialogRef.close();
        this.router.navigate(['']);

        const params ={
          isAdmin:true,
          uid:auth.currentUser.uid
        }

        this.afAuth.user.subscribe((user) => {
          if (user && user.emailVerified) {
            this.db.object(`users/${user.uid}/verified`).set(true);
            this.db.object(`users/${user.uid}/isAdmin`).set(false);
          }
        });
        // this.authservice.storeNewUser(params).subscribe()
      
        this._snackBar.openFromComponent(AlertComponent, {
          duration: 5000,
          data: {
            message:
              'თქვენს მეილზე გაგზავნილია ვერიფიკაციის ლინკი, გთხოვთ გახნათ გამოგზავნილი ლინკი!',
            type: 'error',
          },
        });
      });
    }
  }
}
