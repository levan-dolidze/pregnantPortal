import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Stuffs } from 'src/app/admin/models/shop';
import { ApiService } from 'src/app/shared/services/api.service';
import { IOrder } from './model';

const addNewStuff = '/AddNewStuff.json';
const addNewCourse = '/AddNewCourse.json';
const orderBase = '/OrderShop.json';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private apiService: ApiService

  ) { }






  getStuffs(): Observable<Stuffs[]> {
    return this.apiService.get(addNewStuff).pipe(

      map((res) => {
        if (res) {
          const stuffs = []
          for (const key in res) {
            stuffs.push({ ...res[key], key: key })
          }
          return stuffs

        } else {
          return []
        }

      })
    )
  }
  getCourses(): Observable<Stuffs[]> {
    return this.apiService.get(addNewCourse).pipe(

      map((res) => {
        if (res) {
          const stuffs = []
          for (const key in res) {
            stuffs.push({ ...res[key], key: key })
          }
          return stuffs

        } else {
          return []
        }

      })
    )
  }

  addOrder(params: IOrder): Observable<IOrder> {
    return this.apiService.post(orderBase, params)
  }
}
