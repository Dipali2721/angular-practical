import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get('http://localhost:3000/products').pipe(map(data => {
      console.log('data',data);
      return  data;
    }))
  }


}
