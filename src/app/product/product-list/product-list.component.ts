import { Component, OnInit } from '@angular/core';
import { Product } from '../data-access/models/product.model';
import { ProductService } from '../data-access/service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  products!: Product[];

  loadProduct() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  btnEdit(productsId: string) {
    this.router.navigate([`product/edit/${productsId}`]);
  }

  btnExcluir(productId: string) {
    this.productService.removeProduct(productId).subscribe({
      next: () => {
        location.reload()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  btnCreate() {
    this.router.navigate(['product/create']);
  }
}
