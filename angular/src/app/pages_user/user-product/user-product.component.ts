import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Cart } from 'src/app/_models/shoe-info/Cart';
import { Shoes } from 'src/app/_models/shoe-info/shoes';
import { ShoesService } from 'src/app/_services/shoes.service';
declare let alertify: any;

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})
export class UserProductComponent implements OnInit {
  product;
  gender;
  size;
  genderList: any[] = [
    // { label: "Tất cả", value: -1 },
    { label: "Men", value: 0, checked: false },
    { label: "Women", value: 1, checked: false },
    { label: "Unisex", value: 2, checked: false },
    { label: "Child", value: 3, checked: false },
  ];
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
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _shoesService: ShoesService) {

   }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const shoes = new Shoes();
    shoes.Id = parseInt(id);
    this._shoesService.getShoesInfoById(shoes).subscribe((res:any) => {
      if(res){
        this.product = res ?? new Shoes();
        this.product.url = ('data:image/jpeg;base64,' + res.ImageString ?? "assets/img/userIcon.jpg");
        this.gender = this.genderList.find(e => e.value == res.Gender)?.label ?? '';
        this.size = this.sizeList.find(e => e.value == res.ShoeSize)?.label ?? -1;

      }
      })
  }

  addToCart(param){
    const cart = new Cart();
    const cus = JSON.parse(localStorage.getItem('customer'));
    if(!cus) return alertify.error('Chưa đăng nhập!');
    cart.CusId = cus.Id;
    cart.ShoeId = this.product.Id;
    this._shoesService.createCartInfo(cart).subscribe((res) => {
      console.log(res);
      alertify.success('Đã thêm vào giỏ hàng!');
    })
  }

  shopNow(param){
    const cart = new Cart();
    const cus = JSON.parse(localStorage.getItem('customer'));
    if(!cus) return alertify.error('Chưa đăng nhập!');
    cart.CusId = cus.Id;
    cart.ShoeId = this.product.Id;
    this._shoesService.createCartInfo(cart).pipe(finalize(() => {
      this.router.navigateByUrl('/view/cart');
    })).subscribe((res) => {
      alertify.success('Đã thêm vào giỏ hàng!');
    })

  }

}
