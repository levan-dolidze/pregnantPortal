import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, map, switchMap } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from '../auth.service';
import { IsAdminCheck, LogIn } from '../models/authModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { promoCodeDetails: any },
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private alert: AlertService,
    private fb: FormBuilder,
    private router: Router

  ) { }


  isAdmin: IsAdminCheck;

  form: FormGroup

  ngOnInit(): void {

    this.initForm()


  }


  initForm() {

    this.form = this.fb.group({
      userName: new FormControl(null),
      password: new FormControl(null),
    } as { [key in keyof LogIn]: FormControlOptions }

    )

  }



  async onSubmit() {


    if (this.form.invalid) {
      return
    }
    else {
      const params: LogIn = this.form.value

      await this.authService.signIn(params.userName, params.password).then(res => {

        const username = this.form.get('userName')?.value
        forkJoin({
          token: this.localStorageService.getToken(),
          isAdmin: this.authService.isAdmin(username)
        }).subscribe((res) => {

          this.dialogRef.close();
          this.router.navigate([''])

          // this.alert.success('success')


          // this.isAdmin = res
          // this.authService.isAdminEvent$.next(this.isAdmin.isAdmin)
          // this.localStorageService.isTokenEvent$.next(this.isAdmin.token)
        })


      })

    }

  }



}
