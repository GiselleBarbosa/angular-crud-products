import { Component, OnInit } from '@angular/core';
import { ProductService } from '../data-access/service/product.service';
import { Product } from '../data-access/models/product.model';
// import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  constructor(private productService: ProductService, private router: Router) {}

  product!: Product;

  form = new FormGroup({
    sku: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
    }),
    stock: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    value: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  create() {
    if (this.form.valid) {
      const newProduct = this.form.getRawValue();
      this.productService.postProduct(newProduct).subscribe({
        next: () => {
          this.router.navigate([`product`]);
        },

        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log(this.form)
    }
  }
  // create() {
  //   const newProduct = this.form.getRawValue();
  //   this.productService.updateProduct(this.product.id, newProduct).subscribe({
  //     next: () => {
  //       this.router.navigate([`product`]);
  //     },

  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
