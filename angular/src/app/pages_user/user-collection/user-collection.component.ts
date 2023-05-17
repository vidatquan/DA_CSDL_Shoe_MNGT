import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GetShoeInfoByCusInput } from 'src/app/_models/shoe-info/GetShoeInfoByCusInput';
import { GetShoeInfoInput } from 'src/app/_models/shoe-info/GetShoeInfoInput';
import { ShoeShopService } from 'src/app/_services/shoe-shop.service';
import { ShoesService } from 'src/app/_services/shoes.service';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss']
})
export class UserCollectionComponent implements OnInit {
  products: any[];
  productsPagination: any[];

  shopList: any[] = [];
  colorList: any[] = [
    // { label: "Tất cả", value: "Tất cả" },
    { label: "Đen", value: "Đen", checked: false },
    { label: "Đỏ", value: "Đỏ", checked: false },
    { label: "Xám", value: "Xám", checked: false },
    { label: "Hồng", value: "Hồng", checked: false },
    { label: "Trắng", value: "Trắng", checked: false },
    { label: "Xanh da trời", value: "Xanh da trời", checked: false },
    { label: "Xanh rêu", value: "Xanh rêu", checked: false },
    { label: "Phối màu", value: "Phối màu", checked: false },
  ];

  statusList: any[] = [
    // { label: "Tất cả", value: -1 },
    { label: "Hoạt động", value: 0 },
    { label: "Không hoạt động", value: 1 },
  ];

  genderList: any[] = [
    // { label: "Tất cả", value: -1 },
    { label: "Nam", value: 0, checked: false },
    { label: "Nữ", value: 1, checked: false },
    { label: "Unisex", value: 2, checked: false },
    { label: "Trẻ em", value: 3, checked: false },
  ];

  typeList: any[] = [
    // { label: "Tất cả", value: -1 },
    { label: "UltraBoost", value: 0, checked: false },
    { label: "Yeezy", value: 1, checked: false },
    { label: "StanSmith", value: 2, checked: false },
    { label: "NMD", value: 3, checked: false },
    { label: "Alphabounce", value: 4, checked: false },
    { label: "EQT", value: 5, checked: false },
    { label: "PulseBoost", value: 6, checked: false },
    { label: "SuperStar", value: 7, checked: false }
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


  pageSize = 12;
  pageIndex = 0;

  selectedShopId;
  selectedTypeList = [];
  selectedSizeList = [];
  selectedGenderList = [];
  selectedColorList = [];
  fromMoney:any;
  toMoney:any;



  constructor(private router: Router,
    private _shoeShopService: ShoeShopService,
    private _shoesService: ShoesService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getDealer();

  }

  getDealer(){
    var cus = new GetShoeInfoInput();
    this._shoeShopService.getShoeShop(cus).pipe(finalize(() => {
      this.search();
    })).subscribe((res) => {
      res.forEach((e,i) => {
        if(i == 0) this.selectedShopId = e.Id;
        this.shopList.push({
          value: e.Id,
          label: e.ShopName
        });
      })

    });
  }

  showDetail(param){
    this.router.navigate(['view/collection-detail'], {queryParams: {id: param.Id}});
  }

  resetPage(){
    this.pageIndex = 0;
    this.productsPagination = this.products?.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
   }


  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.productsPagination = this.products?.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  keyup(){
    // console.log(this.fromMoney);
    // this.fromMoney = this.fromMoney.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onChangeType(param,type){
    console.log(param);
   // this.selectedShop = param;
    console.log(type);
  }

  reset(){
    this.selectedShopId = this.shopList[0]?.value ?? -1;
    this.typeList.map(e => e.checked = false);
    this.genderList.map(e => e.checked = false);
    this.sizeList.map(e => e.checked = false);
    this.colorList.map(e => e.checked = false);
    this.fromMoney = undefined;
    this.toMoney = undefined;
    // this.
  }

  search(){
    var input = new GetShoeInfoByCusInput();
    input.ShopId = this.selectedShopId;
    input.ShoeType = this.typeList.filter(e => e.checked == true).map(e => e.value).join(',');
    input.Size = this.sizeList.filter(e => e.checked == true).map(e => e.value).join(',');
    input.Gender = this.genderList.filter(e => e.checked == true).map(e => e.value).join(',');
    input.Color = this.colorList.filter(e => e.checked == true).map(e => e.value).join(',');
    input.FromPrice = this.fromMoney ?? undefined;
    input.ToPrice = this.toMoney ?? undefined;

    this.resetPage();

    this._shoesService.getShoesInfoByCustomer(input).subscribe((res) => {
      this.products = res;
      this.products.forEach(e => {
       // e.url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + e.ImageString ?? "assets/img/userIcon.jpg"));
         e.url = ('data:image/jpeg;base64,' + e.ImageString ?? "assets/img/userIcon.jpg")
      })

      this.resetPage();
      //this.productsPagination = this.products.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
    })
  }


}
