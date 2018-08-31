import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};

  constructor(categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).take(1).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}
