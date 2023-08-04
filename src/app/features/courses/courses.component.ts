import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { Stuffs } from 'src/app/admin/models/shop';
import { Cart } from '../shop/model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private shopService: ShopService,

    private localStorage: LocalStorageService,
    private router:Router

  ) { }

  stuffs: Stuffs[]


  ngOnInit(): void {
    this.getCourses()

  }


  
  getCourses() {
    this.shopService.getCourses().subscribe({
      next: ((res) => {
       this.stuffs=res

       console.log(this.stuffs)
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
