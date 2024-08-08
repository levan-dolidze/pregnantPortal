import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  Observable,
  Subscription,
  forkJoin,
  shareReplay,
} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { IsAdminCheck } from 'src/app/auth/models/authModel';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import {
  authActionModes,
  IActionType,
} from 'src/app/shared/layout/models/authModel';
import { LanguageService } from '../services/language.service';
import { OrderedFullCourse } from 'src/app/admin/models/shop';
import { ShopService } from 'src/app/features/shop/shop.service';
import { AdminHttpService } from 'src/app/admin/admin-http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isAdmin: IsAdminCheck;
  prise: number = 15;
  subscriobtion$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private translate: TranslateService,

    public authService: AuthService,
    public languageService: LanguageService,
    private shopService: ShopService,
    private adminHttp: AdminHttpService
  ) {
    this.pageName = this.route.snapshot.data['pageName'];

    // this.localStorageService.getToken().subscribe((res) => {
    //   this.authBtnInit(res);
    // });
  }
  userState = this.authService.userState;
  isUserLoggedInState = this.authService.isUserLoggedInState;
  pageName: string;
  lang: string;

  authActions: authActionModes[] = [];
  adminBtns: Array<any> = [];
  userWorldBtns: Array<any> = [];

  selectedLang: string;

  ngOnInit(): void {
    this.languageService.setLanguage();
    this.selectedLang = this.languageService.defaultLang;
    this.returnNotifications();
  }

  observable$: Observable<any>;

  orderedCourses: OrderedFullCourse[];
  orderedItems: Array<any>;
  contact: Array<any>;

  returnNotifications() {
    this.observable$ = forkJoin({
      orderedCourses: this.shopService.getOrderedCourse(),
      orderedItems: this.shopService.getOrderedStuff(),
      contact: this.adminHttp.getQuestions(),
      // messages: this.httpAdmin.getOnlineOrders(),
    }).pipe(shareReplay());
    this.subscriobtion$ = this.observable$.subscribe((notifications) => {
      console.log(notifications);

      this.orderedCourses = notifications.orderedCourses;
      this.orderedItems = notifications.orderedItems;
      this.contact = notifications.contact;

      this.commonNotifications(notifications);
    });
  }

  generalNotification: number;

  commonNotifications(i: any) {
    let arr = [];
    let notifications: Array<Array<object>> = [
      i.orderedCourses,
      i.orderedItems,
      i.contact,
    ];
    for (const n of notifications) {
      for (const i of n) {
        arr.push(i);
      }
      this.generalNotification = arr?.length;
    }
  }

  notificationObs$: Observable<any>;

  ngOnDestroy(): void {
    this.subscriobtion$.unsubscribe();
  }

  onLogOut(){

    this.authService.logOut();

  }

  // authBtnInit(storedAdmin: boolean) {
  //   combineLatest({
  //     token: this.localStorageService.isTokenEvent$,
  //     admin: this.authService.isAdminEvent$,
  //   }).subscribe((res) => {
  //     this.autBtnService
  //       .getAuthBtnMode(
  //         this.authActions,
  //         res.token,
  //         storedAdmin ? storedAdmin : res.admin
  //       )
  //       .subscribe((res) => {
  //         this.authActions = res;
  //       });
  //     this.autBtnService
  //       .getAdminBtns(
  //         this.adminBtns,
  //         res.token,
  //         storedAdmin ? storedAdmin : res.admin
  //       )
  //       .subscribe((res) => {
  //         this.adminBtns = res;
  //       });
  //     this.autBtnService
  //       .getMyWorldBtns(
  //         this.adminBtns,
  //         res.token,
  //         storedAdmin ? storedAdmin : res.admin
  //       )
  //       .subscribe((res) => {
  //         this.userWorldBtns = res;
  //       });
  //   });
  // }

  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
  }

  loginSignUp(type: IActionType) {
    // if (type === 'logOut') {
    //   this.authService.logOut();
    //   this.localStorageService.getToken().subscribe((res) => {});
    //   return;
    // }

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
