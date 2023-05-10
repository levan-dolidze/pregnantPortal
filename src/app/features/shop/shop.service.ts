import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Stuffs } from 'src/app/admin/models/shop';
import { ApiService } from 'src/app/shared/services/api.service';

const addNewStuff = '/AddNewStuff.json'

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
}
