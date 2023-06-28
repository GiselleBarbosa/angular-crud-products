import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { NewProduct, Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //Buscar produtos do Banco de dados
  getProducts() {
    return this.http.get<Product[]>(`${environment.PRODUCT_API}/products`)
  }


  // metodo para buscar somente o product por id
  getProduct(productId: string | null) {
    return this.http.get<Product>(`${environment.PRODUCT_API}/products/${productId}`)
  }

  //
  updateProduct(productId: string | null, product: Product){
    return this.http.patch<Product>(`${environment.PRODUCT_API}/products/${productId}`,
    product
    )
  }

  postProduct(product: NewProduct){
    return this.http.post<NewProduct>(`${environment.PRODUCT_API}/products`,
    product
    )
  }

  removeProduct(productId: string | null){
    return this.http.delete<Product>(`${environment.PRODUCT_API}/products/${productId}`)
  }



  //metodo para buscar somente o product por Sku
  // getProduct(productSku: string | null) {
  //   return this.http.get<Product>(`${environment.PRODUCT_API}/products/${productSku}`)
  // }

}
