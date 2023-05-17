import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/_models/customer';
import { Cart } from 'src/app/_models/shoe-info/Cart';
import { GetShoeInfoInput } from 'src/app/_models/shoe-info/GetShoeInfoInput';
import { ShoesService } from 'src/app/_services/shoes.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  //product;

  paymentMethods = "cod";
  products;
  deliveryTime = "in";
  isConfirmCart = false;
  customer= new Customer();
  tempPrice:number = 0;

  sizeList: any[] = [
    // { label: "Tất cả", value: -1 },
    { label: "3", value: 3, checked: false },
    { label: "4", value: 4, checked: false },
    { label: "5", value: 5, checked: false },
    { label: "6", value: 6, checked: false },
    { label: "7", value: 7, checked: false },
    { label: "8", value: 8, checked: false },
    { label: "9", value: 9, checked: false },
    { label: "10", value: 10, checked: false },
    { label: "11", value: 11, checked: false },
    { label: "24", value: 24, checked: false },
    { label: "28", value: 28, checked: false },
    { label: "30", value: 30, checked: false },
    { label: "36", value: 36, checked: false },
    { label: "36 1/2", value: 3612, checked: false },
    { label: "37", value: 37, checked: false },
    { label: "37 1/2", value: 3712, checked: false },
    { label: "38", value: 38, checked: false },
    { label: "38 1/2", value: 3812, checked: false },
    { label: "39", value: 39, checked: false },
    { label: "39 1/2", value: 3912, checked: false },
    { label: "40", value: 40, checked: false },
    { label: "40 1/2", value: 4012, checked: false },
    { label: "41", value: 41, checked: false },
    { label: "41 1/2", value: 4112, checked: false },
    { label: "42", value: 41, checked: false },
    { label: "42 1/2", value: 4212, checked: false },
    { label: "43", value: 41, checked: false },
    { label: "43 1/2", value: 4312, checked: false },
  ];

  constructor(private _shoesService: ShoesService,
    private router: Router) { };

  ngOnInit() {
    const cus = JSON.parse(localStorage.getItem('customer'));
    if(cus) this.customer = cus;

    this.getCart();
  }

  getCart(){
    const input = new GetShoeInfoInput();
    this._shoesService.getCartInfo(input).subscribe((res:any) => {
      this.products = res;
      this.products.forEach(e => {
          e.url = ('data:image/jpeg;base64,' + e.ImageString ?? "assets/img/userIcon.jpg");
          e.size = this.sizeList.find(m => m.value == e.ShoeSize)?.label ?? -1;
       })
    })
  }

  addToCart(param){

  }

  paymentMethod(param){
    this.paymentMethods = param;
  }

  // changeQuantity(param){
  //   // if(param.quantity < 1) param.quantity = 1;
  //   // console.log(param);
  // }

  onValueChange(param, product){
   // let check = parseInt(param);
    if(isNaN(param) || param < 1) product.QuantityOrder = 1;
    else product.QuantityOrder = param;
      const cart = new Cart();
      cart.Id = product.CartId;
      cart.Quantity = product.QuantityOrder;
      this._shoesService.updateCartInfo(cart).subscribe();
   // }
    console.log(param);
  }


  deleteCart(product){
    const cart = new Cart();
    cart.Id = product.CartId;
    this._shoesService.deleteCartInfo(cart).pipe(finalize(() => {
      this.getCart();
    })).subscribe();

  }

  confirmCart(){
    this.isConfirmCart = true;

    //
    this.tempPrice = 0;
    this.products.forEach(e => {
      this.tempPrice += (e.SellPrice* e.QuantityOrder);
    });
  }

  continueShopping(){
    this.router.navigateByUrl('/view/collection');
  }

  orderCart(){

  }

  loadMore(){
    var elementHtml = document.querySelectorAll('.content-product[style*="display:none"]');
    debugger;
  }
}
