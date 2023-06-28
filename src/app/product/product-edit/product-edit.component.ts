import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../data-access/service/product.service';
import { Product } from '../data-access/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit{
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}


  //quando o component iniciar captura o id da rota e chama metodo getProductById

  ngOnInit(){
    const getProductById: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductById(getProductById)
  }

  form = new FormGroup({
    sku: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(10)]} ),
    id: new FormControl({value:'', disabled: true},
    {nonNullable: true, validators: [Validators.required]}),
    stock: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl ('', {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    value: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  product!: Product;

  //Recebe productId e chama metodo do servico passando productId subscribe na observable e guarda valor recebido na variavel product, em caso de erro da um console.lo(error)

  getProductById(productId: string | null ) {
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        this.product = product;

        //faz um patch nos controles do form passando os valores do produto
        this.form.patchValue({
          sku: this.product.sku,
          id: this.product.id,
          stock: this.product.stock,
          name: this.product.name,
          description: this.product.description,
          value: this.product.value
        })
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  submit(){
    const newProduct = this.form.getRawValue()
    this.productService.updateProduct(this.product.id, newProduct).subscribe({
      next: () => {
        this.router.navigate([`product`])
      },

      error: (error) => {
        console.log(error);
      }
    })
    // console.log(this.form)
  }

  // getProductBySku(productSku: string | null){
  //   this.productService.getProduct(productSku).subscribe({
  //     next: (product) => {
  //       this.product = product;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }
}
