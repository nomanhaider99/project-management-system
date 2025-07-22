import { Injectable, signal, WritableSignal } from '@angular/core';
import { ProductType } from 'src/data/products';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService {
  data = signal<ProductType[]>([]);
  id: WritableSignal<number> = signal(1);

  setId() {
    return this.id.update(val => val + 1);
  }

  putData(data: ProductType | any) {
    data = { ...data, id: this.id() }
    this.setId();
    this.data.mutate((value) => value?.push(data))
  }

  disableProduct(id: number) {
    this.data.update((product: any) => product?.filter((a: any) => a.id !== id));
  }

  getData(): ProductType[] | null {
    return this.data();
  }
  

  editData(serialno: string, productname: string, quantity: number, category: string, id: number) {
    var updatedProducts: any;
    this.data.update((product) => product.map((item) => {
      if (item.id == id) {
        item = {...item, category, productname, quantity, serialno };
        // console.log("ITEM", item);
        return item;
      } else {
        return item;
      }
    }));
    // console.log("GOT DATA SIGNAL VALUE AFTER EDIT: ", this.data());

    return updatedProducts;
  }

  constructor() {
    // console.log("DATA IN SIGNAL: ", this.data());
  }
}
