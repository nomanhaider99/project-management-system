import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { categories } from 'src/data/products';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
})
export class CheckinComponent implements OnInit {
  productService = inject(GetproductsService);
  router = inject(Router);
  categoriesData: any;

  checkinData = new FormGroup({
    serialno: new FormControl("", [Validators.required]),
    productname: new FormControl("", [Validators.required]),
    quantity: new FormControl(1, [Validators.required, Validators.minLength(1)]),
    category: new FormControl("", [Validators.required])
  });

  ngOnInit () {
    this.categoriesData = categories;
  }


  onSubmitData() {
    var { category, productname, quantity, serialno } = this.checkinData.value;
    if (!category || !productname || !quantity || quantity < 1 || !serialno) {
      console.log("Incorrect Value!")
    } else {
      this.productService.putData(this.checkinData.value);
      this.router.navigateByUrl('/dashboard');
    }
  }

}
