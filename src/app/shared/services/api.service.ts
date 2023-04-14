import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,


  ) {



  }

  


  get(path: string): Observable<any> {
    let httpParams = new HttpParams();
    return this.http.get(`${environment.apiUrl}${path}`, { params: httpParams })

  }
  post(path: string, params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, params)
  }
  put(path: string, params: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}${path}`, params)
  }
  delete(path: string, key: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}/${key}.json`)
  }


}
