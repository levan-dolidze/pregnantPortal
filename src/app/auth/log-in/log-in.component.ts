import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, map, switchMap } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from '../auth.service';
import { IsAdminCheck } from '../models/authModel';

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
    private alert: AlertService

  ) { }


  isAdmin: IsAdminCheck;

  form: FormGroup

  ngOnInit(): void {

    this.initForm()


  }


  initForm() {
    this.form = new FormGroup({
      userName: new FormControl(null),
      password: new FormControl(null)
    })
  }

  onSubmit() {

    const username = this.form.get('userName')?.value
    forkJoin({
      token: this.localStorageService.getToken(),
      isAdmin: this.authService.isAdmin(username)
    }).subscribe((res) => {

      this.alert.success('success')


      // this.isAdmin = res
      // this.authService.isAdminEvent$.next(this.isAdmin.isAdmin)
      // this.localStorageService.isTokenEvent$.next(this.isAdmin.token)
    })
  }



}
