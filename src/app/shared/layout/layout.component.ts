import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, forkJoin, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { IsAdminCheck } from 'src/app/auth/models/authModel';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { authActionModes, IActionType } from 'src/app/shared/layout/models/authModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})


export class LayoutComponent implements OnInit {


  isAdmin: IsAdminCheck;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    public authService: AuthService


  ) {
    this.pageName = this.route.snapshot.data['pageName'];

    translate.use('en');

    const lang = localStorage.getItem('lang');
    if (lang) {
      translate.use(lang)
    } else {
      translate.setDefaultLang('ka');
    }

    this.authActions.push(
      {
        text: 'logIn',
        type: 'logIn',
        icon: "update",
        permission: "user",
      },
      {
        text: 'admin',
        type: 'admin',
        icon: "edit",
        permission: "admin",
      },

    )





    combineLatest({
      token: this.localStorageService.isTokenEvent$,
      admin: this.authService.isAdminEvent$
    }).subscribe((res) => {


      if (res.token&&res.admin) {
        this.authActions = []
        this.authActions.push(
          {
            text: 'logOut',
            type: 'logOut',
            icon: "update",
            permission: "user",
          },
          {
            text: 'admin',
            type: 'admin',
            icon: "edit",
            permission: "admin",
          },

        )

      } 
      else if(res.token&&!res.admin) {
        this.authActions = []
        this.authActions = []
        this.authActions.push(
          {
            text: 'logOut',
            type: 'logOut',
            icon: "update",
            permission: "user",
          },
        )

      }

      else if(!res.token) {
        this.authActions = []
        this.authActions = []
        this.authActions.push(
          {
            text: 'logIn',
            type: 'logIn',
            icon: "update",
            permission: "user",
          },
          {
            text: 'signUp',
            type: 'signUp',
            icon: "update",
            permission: "user",
          },
        )

      }






    });











  }

  test: boolean
  pageName: string;
  lang: string;

  authActions: authActionModes[] = []


  ngOnInit(): void {

    this.buttonInit()
  }





  buttonInit() {



  }





  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
  };




  initAuthActions(type: IActionType) {



    const popups: any = {
      logIn: {
        component: LogInComponent,
        width: '500px',
      },

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

  openLogin() {

  }

  openLogOut() {

  }
  openSignUp() {

  }


}


