import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product'; // Asegúrate de que esta ruta es correcta
import { ProductsServiceService } from '../../services/products/products-service.service'; // Asegúrate de que esta ruta es correcta
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../products/product-form/product-form.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  productList: Product[] = [];
  filteredProductList: Product[] = [];

  constructor(
    private productService: ProductsServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(): void {
    this.productService.getProducst().subscribe((items: Product[]) => {
      this.productList = items;
      this.filteredProductList = items;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(filterValue) ||
      product.price.toString().includes(filterValue) ||
      product.amount.toString().includes(filterValue)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productListMethod();
      }
    });
  }
}
