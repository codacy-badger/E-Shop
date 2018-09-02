import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { DataTableResource } from '../../../../node_modules/angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filtredProducts: any[];
  subscription: Subscription;
  tableRessource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filtredProducts = this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableRessource = new DataTableResource(products);
    this.tableRessource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableRessource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableRessource) { return; }
    this.tableRessource.query(params)
      .then(items => this.items = items);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filtredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
      this.initializeTable( this.filtredProducts);
  }


}
