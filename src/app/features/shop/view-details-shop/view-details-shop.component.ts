import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Stuffs } from 'src/app/admin/models/shop';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { BuyNowActions, Cart } from '../model';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { BuyNowComponent } from '../buy-now/buy-now.component';

@Component({
  selector: 'app-view-details-shop',
  templateUrl: './view-details-shop.component.html',
  styleUrls: ['./view-details-shop.component.scss']
})
export class ViewDetailsShopComponent implements OnInit {

  constructor(
    public languageService: LanguageService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,




  ) {

    this.key = this.route.snapshot.paramMap.get('key')
  }


  key: string;

  stuffDetails$: Observable<Stuffs>;

  ngOnInit(): void {
    this.getStuffDetails()

  }

  buyProductNow(stuff:Stuffs) {

    this.localStorageService.getToken().subscribe((res) => {
      const mode: BuyNowActions = res ? 'isLoggedIn' : 'isLoggedOut';

      const popups: any = {
        isLoggedIn: {
          component: BuyNowComponent,
          width: '500px',
        },

        isLoggedOut: {
          component: LogInComponent,
          width: '500px',
        },
      };

      const dialogRef = this.dialog.open(popups[mode]['component'], {
        width: '500px',
        panelClass: 'border-16',
        data: {
          stuffDetails: stuff
        },
      });
    });
  }

  countItemInCart(stuffList: Cart[], stuff: Stuffs) {

    const itemInCart = stuffList.filter((obj: Cart) => obj.key === stuff.key).length + 1;
    return itemInCart

  }

  addProductInCart(stuff: Stuffs) {
    this.localStorageService.getToken().subscribe((token) => {

      let list = localStorage.getItem('stuffInCart');
      if (list) {

        let stuffList = JSON.parse(list);
        const count = this.countItemInCart(stuffList, stuff)
        const cart = {
          ...stuff,
          uid: token.uid,
          inCart: count
        }
        stuffList.push(cart);
        localStorage.setItem('stuffInCart', JSON.stringify(stuffList));
      }
      else {
        let newStuff = [];

        const cart = {
          ...stuff,
          uid: token.uid,
          inCart: 1
        }
        newStuff.push(cart)
        localStorage.setItem('stuffInCart', JSON.stringify(newStuff));
      }
    })

  }


  getStuffDetails() {
    this.stuffDetails$ = this.localStorageService.getStuffsDetails(this.key)
  }



}
