import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from '../auth.service';
import { IsAdminCheck, LogIn } from '../models/authModel';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { IActionType } from 'src/app/shared/layout/models/authModel';
import { FieldModeControl } from 'src/app/shared/functions/sharedFunctions';
import { regExp } from 'src/app/shared/validations/regex';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(
    @Optional() public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { promoCodeDetails: any },
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  isAdmin: IsAdminCheck;

  form: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      userName: [null, [Validators.required, Validators.pattern(regExp.email)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    } as { [key in keyof LogIn]: FormControlOptions });
  }

  async onSubmit() {
    if (this.form.invalid) {
      FieldModeControl.formFieldsModeControl('markAsDirty',this.form)
      return;
    } else {
      const params: LogIn = this.form.value;

      await this.authService
        .signIn(params.userName, params.password)
        .then((res) => {
          console.log(res)
            this.dialogRef.close();
            this.router.navigate(['']);
        });
    }
  }

  signUp(type: IActionType) {
    this.dialogRef.close();
    const popups: any = {
      signUp: {
        component: SignUpComponent,
        width: '500px',
      },
    };

    const dialogRef = this.dialog.open(popups[type]['component'], {
      width: '500px',
      panelClass: 'border-16',
      // data: {
      //   packageDetailsData: this.package
      // },
    });
  }
}
