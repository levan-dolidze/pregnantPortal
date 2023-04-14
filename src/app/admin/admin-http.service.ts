import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { AddStuff, Stuffs } from './models/shop';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
const addNewStuff = '/AddNewStuff.json'
const deleteStuff = '/AddNewStuff/'

@Injectable({
  providedIn: 'root'
})

export class AdminHttpService {


  constructor(
    private apiService: ApiService
  ) { }


  //show

  addStuff(newStuff: AddStuff): Observable<AddStuff> {
    return this.apiService.post(addNewStuff, newStuff)
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
  







}
