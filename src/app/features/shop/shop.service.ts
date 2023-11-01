import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderedFullCourse, Stuffs } from 'src/app/admin/models/shop';
import { ApiService } from 'src/app/shared/services/api.service';
import { IOrder } from './model';

const addNewStuff = '/AddNewStuff.json';
const addNewCourse = '/AddNewCourse.json';
const orderBaseCourse = '/CourseOrder.json';
const orderBaseStuff = '/StuffOrder.json';

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
          const stuff:any = []
          for (const key in res) {
            stuff.push({ ...res[key], key: key })
          }
          return stuff

        } else {
          return []
        }

      })
    )
  }

  buyCourse(params: IOrder): Observable<IOrder> {
    return this.apiService.post(orderBaseCourse, params)
  }
  buyStuff(params: IOrder): Observable<IOrder> {
    return this.apiService.post(orderBaseStuff, params)
  }
  getOrderedCourse(): Observable<OrderedFullCourse[]> {
    return this.apiService.get(orderBaseCourse).pipe(

      map((res) => {
        if (res) {
          const courses = []
          for (const key in res) {
            courses.push({ ...res[key], key: key })
          }
          return courses

        } else {
          return []
        }

      })
    )
  }
  getOrderedStuff(): Observable<OrderedFullCourse[]> {
    return this.apiService.get(orderBaseStuff).pipe(

      map((res) => {
        if (res) {
          const stuff = []
          for (const key in res) {
            stuff.push({ ...res[key], key: key })
          }
          return stuff

        } else {
          return []
        }
      })
    )
  }
};
