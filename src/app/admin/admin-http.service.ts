import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { AddStuff, Stuffs } from './models/shop';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'

const addNewStuff = '/AddNewStuff.json'
const addNewCourse = '/AddNewCourse.json'
const deleteStuff = '/AddNewStuff/'

@Injectable({
  providedIn: 'root'
})

export class AdminHttpService {


  constructor(
    private apiService: ApiService,
    private firebase: AngularFireDatabase

  ) { }


  //show

  addNewStuff(newStuff: AddStuff): Observable<AddStuff> {
    return this.apiService.post(addNewStuff, newStuff)
  }
  addNewCourse(newCourse: AddStuff): Observable<AddStuff> {
    return this.apiService.post(addNewCourse, newCourse)
  }

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

  public dataSubject = new BehaviorSubject<any>(null);

  deleteStuff(key: any) {
    return this.apiService.delete(deleteStuff, key).pipe(
      switchMap(() => {
        return this.getStuffs().pipe(
          map((res) => {
            this.dataSubject.next(res);
            return res;
          })
        );
      })
    );
  };


  stuffList: AngularFireList<any>;


  insertStuff(imageDetails: any) {
    this.stuffList.push(imageDetails)
  }
  getStuffList() {
    this.stuffList = this.firebase.list('stuff')
  };





}
