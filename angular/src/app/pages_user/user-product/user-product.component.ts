import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})
export class UserProductComponent implements OnInit {
  product;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(param){

  }

  shopNow(){
    this.router.navigateByUrl('/view/collection-detail');
  }

}
