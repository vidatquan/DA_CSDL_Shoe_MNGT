import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss']
})
export class UserCollectionComponent implements OnInit {
  layout: string = 'list';

  products: any[];
  productsPagination: any[];


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

  test={} ;

  selectedShopId;
  selectedTypeList = [];
  selectedSizeList = [];
  selectedGenderList = [];
  selectedColorList = [];
  fromMoney:any;
  toMoney:any;



  constructor(private router: Router) { }

  ngOnInit() {

    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accessories',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Game Controller',
        description: 'Product Description',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Gaming Set',
        description: 'Product Description',
        image: 'gaming-set.jpg',
        price: 299,
        category: 'Electronics',
        quantity: 63,
        inventoryStatus: 'INSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1010',
        code: 'plb34234v',
        name: 'Gold Phone Case',
        description: 'Product Description',
        image: 'gold-phone-case.jpg',
        price: 24,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1011',
        code: '4920nnc2d',
        name: 'Green Earbuds',
        description: 'Product Description',
        image: 'green-earbuds.jpg',
        price: 89,
        category: 'Electronics',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1012',
        code: '250vm23cc',
        name: 'Green T-Shirt',
        description: 'Product Description',
        image: 'green-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 74,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1013',
        code: 'fldsmn31b',
        name: 'Grey T-Shirt',
        description: 'Product Description',
        image: 'grey-t-shirt.jpg',
        price: 48,
        category: 'Clothing',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1014',
        code: 'waas1x2as',
        name: 'Headphones',
        description: 'Product Description',
        image: 'headphones.jpg',
        price: 175,
        category: 'Electronics',
        quantity: 8,
        inventoryStatus: 'LOWSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1015',
        code: 'vb34btbg5',
        name: 'Light Green T-Shirt',
        description: 'Product Description',
        image: 'light-green-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 34,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1016',
        code: 'k8l6j58jl',
        name: 'Lime Band',
        description: 'Product Description',
        image: 'lime-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 12,
        inventoryStatus: 'INSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1017',
        code: 'v435nn85n',
        name: 'Mini Speakers',
        description: 'Product Description',
        image: 'mini-speakers.jpg',
        price: 85,
        category: 'Clothing',
        quantity: 42,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1018',
        code: '09zx9c0zc',
        name: 'Painted Phone Case',
        description: 'Product Description',
        image: 'painted-phone-case.jpg',
        price: 56,
        category: 'Accessories',
        quantity: 41,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1019',
        code: 'mnb5mb2m5',
        name: 'Pink Band',
        description: 'Product Description',
        image: 'pink-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 63,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1020',
        code: 'r23fwf2w3',
        name: 'Pink Purse',
        description: 'Product Description',
        image: 'pink-purse.jpg',
        price: 110,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1021',
        code: 'pxpzczo23',
        name: 'Purple Band',
        description: 'Product Description',
        image: 'purple-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 6,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1022',
        code: '2c42cb5cb',
        name: 'Purple Gemstone Necklace',
        description: 'Product Description',
        image: 'purple-gemstone-necklace.jpg',
        price: 45,
        category: 'Accessories',
        quantity: 62,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1023',
        code: '5k43kkk23',
        name: 'Purple T-Shirt',
        description: 'Product Description',
        image: 'purple-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1024',
        code: 'lm2tny2k4',
        name: 'Shoes',
        description: 'Product Description',
        image: 'shoes.jpg',
        price: 64,
        category: 'Clothing',
        quantity: 0,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1025',
        code: 'nbm5mv45n',
        name: 'Sneakers',
        description: 'Product Description',
        image: 'sneakers.jpg',
        price: 78,
        category: 'Clothing',
        quantity: 52,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        checked: false
      },
      {
        id: '1026',
        code: 'zx23zc42c',
        name: 'Teal T-Shirt',
        description: 'Product Description',
        image: 'teal-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 3,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1027',
        code: 'acvx872gc',
        name: 'Yellow Earbuds',
        description: 'Product Description',
        image: 'yellow-earbuds.jpg',
        price: 89,
        category: 'Electronics',
        quantity: 35,
        inventoryStatus: 'INSTOCK',
        rating: 3,
        checked: false
      },
      {
        id: '1028',
        code: 'tx125ck42',
        name: 'Yoga Mat',
        description: 'Product Description',
        image: 'yoga-mat.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 15,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        checked: false
      },
      {
        id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 8,
        checked: false
      }
    ];

    // this.productsPagination = this.products.slice(this.first, (this.page + 1) * this.rows);
    this.productsPagination = this.products.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }


  showDetail(param){
    this.router.navigateByUrl('view/collection-detail');
  }

  getProduct(param){

    this.resetPage();
  }

  resetPage(){
    this.pageIndex = 0;
    this.productsPagination = this.products.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
   }


  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.productsPagination = this.products.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  keyup(){
    console.log(this.fromMoney);
    this.fromMoney = this.fromMoney.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onChangeType(param,type){
    console.log(param);
   // this.selectedShop = param;
    console.log(type);
  }

  reset(){
    this.selectedShopId = 0;
    this.typeList.map(e => e.checked = false);
    this.genderList.map(e => e.checked = false);
    this.sizeList.map(e => e.checked = false);
    this.colorList.map(e => e.checked = false);
    this.fromMoney = undefined;
    this.toMoney = undefined;
    // this.
  }

  search(){
    console.log(this.typeList);
    console.log(this.sizeList);
    console.log(this.genderList);
    console.log(this.colorList);
  }


}
