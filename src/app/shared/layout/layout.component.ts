import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, concatMap, forkJoin, from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { IsAdminCheck } from 'src/app/auth/models/authModel';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { AuthBtnModesService } from 'src/app/core/services/auth-btn-modes.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { authActionModes, IActionType } from 'src/app/shared/layout/models/authModel';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})


export class LayoutComponent implements OnInit {


  isAdmin: IsAdminCheck;
  prise: number = 15

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,

    public authService: AuthService,
    private autBtnService: AuthBtnModesService,
    public languageService: LanguageService



  ) {
    this.pageName = this.route.snapshot.data['pageName'];


    this.localStorageService.getToken().subscribe((res) => {
      this.authBtnInit(res);
    })

  }

  pageName: string;
  lang: string;

  authActions: authActionModes[] = [];
  adminBtns: Array<any> = []

  selectedLang: string;


  ngOnInit(): void {

    this.languageService.setLanguage();

    this.selectedLang = this.languageService.defaultLang;


  }



  authBtnInit(storedAdmin: boolean) {

    combineLatest({
      token: this.localStorageService.isTokenEvent$,
      admin: this.authService.isAdminEvent$,
    }).subscribe((res) => {

      this.autBtnService.getAuthBtnMode(this.authActions, res.token, storedAdmin ? storedAdmin : res.admin).subscribe((res) => {
        this.authActions = res
      })
      this.autBtnService.getAdminBtns(this.adminBtns, res.token, storedAdmin ? storedAdmin : res.admin).subscribe((res) => {
        this.adminBtns = res
      })
    });
  }



  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
  };




  initAuthActions(type: IActionType) {



    if (type === 'logOut') {
      this.authService.logOut();
      this.localStorageService.getToken().subscribe((res) => { })
      return
    }


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




}


