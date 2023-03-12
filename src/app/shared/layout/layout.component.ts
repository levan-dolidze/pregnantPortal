import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { authActionModes, IActionType } from 'src/app/models/authModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})


export class LayoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialog: MatDialog,


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
        icon: "check_circle",
        permission: "user",
      },
      {
        text: 'logOut',
        type: 'logOut',
        icon: "update",
        permission: "user",
      },
      {
        text: 'signUp',
        type: 'signUp',
        icon: "edit",
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


  pageName: string;
  lang: string;

  authActions: authActionModes[] = []


  ngOnInit(): void {

  }

  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
  };




  initAuthActions(type: IActionType) {


    
    const popups:any = {
      logIn: {
        component: LogInComponent,
        width: '500px',
      },

      signUp: {
        component: SignUpComponent,
        width: '500px',
      },
    };

    console.log(popups[type])

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


