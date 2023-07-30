import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Stuffs } from 'src/app/admin/models/shop';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Cart } from './model';
import { BehaviorSubject, Observable, filter, find, first, map, of, scan } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private shopService: ShopService,

    private localStorage: LocalStorageService,
    private router:Router

  ) { }



  stuffs: Stuffs[]


  ngOnInit(): void {
    this.getStuff()

  }






  getStuff() {
    this.shopService.getStuffs().subscribe({
      next: ((res) => {
       this.stuffs=res
      }),
      error: ((res) => {

      })

    })


  }





  countItemInCart(stuffList: Cart[], stuff: Stuffs) {

    const itemInCart = stuffList.filter((obj: Cart) => obj.key === stuff.key).length + 1;
    return itemInCart

  }





  addStuffToCart(stuff: Stuffs) {
    this.localStorage.getToken().subscribe((token) => {

      let list = localStorage.getItem('stuff');
      if (list) {

        let stuffList = JSON.parse(list);
        const count = this.countItemInCart(stuffList, stuff)
        const cart = {
          ...stuff,
          uid: token.uid,
          inCart: count
        }
        stuffList.push(cart);
        localStorage.setItem('stuff', JSON.stringify(stuffList));
      }
      else {
        let newStuff = [];

        const cart = {
          ...stuff,
          uid: token.uid,
          inCart: 1
        }
        newStuff.push(cart)
        localStorage.setItem('stuff', JSON.stringify(newStuff));
      }
    })
  };



  viewDetails(key:string){


    this.router.navigate([`shop/view-details-shop/${key}`])

  }

}
