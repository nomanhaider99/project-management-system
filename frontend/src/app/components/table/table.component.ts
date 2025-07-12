import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { ProductType } from 'src/data/products';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  data: ProductType[] = [];
  productService = inject(GetproductsService);
  EditComponent: boolean = false;
  disabled: boolean = true;
  cellId = signal<number | undefined>(undefined);
  @ViewChild('table') table!: ElementRef<HTMLTableElement>
  @ViewChild('id') id!: ElementRef<HTMLTableCellElement>
  @ViewChild('quantity') quantity!: ElementRef<HTMLTableCellElement>
  @ViewChild('serialno') serialno!: ElementRef<HTMLTableCellElement>
  @ViewChild('category') category!: ElementRef<HTMLTableCellElement>
  @ViewChild('productname') productname!: ElementRef<HTMLTableCellElement>
  row: any;

  enableEdit(row: any) {
    this.row = row;
    this.EditComponent = true;
    this.disabled = false
  }

  disableEdit(row: any) {
    this.row = row;
    this.EditComponent = false;
    this.disabled = true
  }

  onDisableData(id: number): any {
    this.productService.disableProduct(id);
    this.productService.getData();
  }

  getProductBySerialNumber(serialno: string) {
    return this.data.find((value) => value.serialno === serialno);
  }

  editData(row: any) {
    this.data = this.productService.editData(this.row.serialno, this.row.productname, this.row.quantity, this.row.cateogory, Number(this.id.nativeElement.textContent!));
    // console.log((row.serialno, row.productname, row.quantity, row.cateogory, Number(this.id.nativeElement.textContent!)))
    console.log("ROW: ",this.row);
    this.disableEdit(row);
  }


  constructor() {
    effect(() => {
      this.data = this.productService.getData() as any;
    })
    // console.log("DATA: ",this.data)
  }
} 