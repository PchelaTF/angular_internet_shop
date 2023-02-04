import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IObjectKeys, IProduct } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    type = 'phone'
    cartProducts: IProduct[] = []

  constructor(private http: HttpClient) { }

  create(product: any) {
    return this.http.post(`${environment.fbDbUrl}/product.json`, product)
      .pipe(map((res: any) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll() {
    return this.http.get<IObjectKeys>(`${environment.fbDbUrl}/product.json`)
      .pipe(map(res => {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      }))
  }

  getById(id: string) {
    return this.http.get<IProduct>(`${environment.fbDbUrl}/product/${id}.json`)
      .pipe(map(res => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/product/${id}.json`)
  }

  update(product: IProduct) {
    return this.http.patch(`${environment.fbDbUrl}/product/${product.id}.json`, product)
  }

  setType(type: string) {
        this.type = type
  }

  addProduct(product: IProduct) {
        this.cartProducts.push(product)
  }
}

