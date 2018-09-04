import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category: string;
  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });
      this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {

  }

}
