import { ceil } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { GetShoeInfoInput } from 'src/app/_models/shoe-info/GetShoeInfoInput';
import { ShoeShopService } from 'src/app/_services/shoe-shop.service';
declare let alertify: any;
@Component({
  selector: 'app-shoe-shop',
  templateUrl: './shoe-shop.component.html',
  styleUrls: ['./shoe-shop.component.scss']
})
export class ShoeShopComponent implements OnInit {
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  selectedData;
  // cusName: string;
  // cusEmail: string;
  // cusTel: string;
  // cusType(price){
  //   if(price >=0 && price < 15000000) return 'KH thành viên';
  //   if(price >=15000000 && price < 35000000) return 'KH đồng hành';
  //   if(price >=35000000 && price < 60000000) return 'KH thân thiết';
  //   if(price >=60000000) return 'KH VIP';
  //   return '';
  // }
  constructor(private _shoehShopService: ShoeShopService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        cellRenderer: (params) => (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize + params.rowIndex + 1,
      },
      {
        headerName: 'Tên Cửa hàng',
        field: 'ShopName',
      },
      {
        headerName: 'Trạng thái',
        field: 'IsDeleted',
        valueGetter: (param) => param.data && param.data.IsDeleted == 0 ? 'Đang hoạt động' : 'Dừng hoạt động'
      },
    ];

    this.defaultColDef = {
      flex: 1,
      resizable: true,
      suppressMenu: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      textFormatter: function (r) {
        if (r == null) return null;
        return r.toLowerCase();
      },
    };
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
  }

  onSearch(paginationParams: PaginationParamsModel) {
    this.selectedData = undefined;
    this.paginationParams = paginationParams;
    var cus = new GetShoeInfoInput();
    // cus.CusName = this.cusName ?? '';
    // cus.CusTel = this.cusTel ?? '';
    this._shoehShopService.getShoeShop(cus).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData =
        this.rowData.length > 0
          ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.rowData.length;
      this.paginationParams.totalPage = ceil(
        this.rowData.length / this.paginationParams.pageSize
      );
    });
  }

  callBackEvent(event) {
    this.params = event;
    this.onGridReady(this.paginationParams);
  }

  onGridReady(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.pageNum = 1;
    this.paginationParams.skipCount = ((paginationParams.pageNum ?? 1) - 1) * (paginationParams.pageSize ?? 10);
    this.onSearch(paginationParams);
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount = ((paginationParams.pageNum ?? 1) - 1) * (paginationParams.pageSize ?? 10);
    this.onSearch(this.paginationParams);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = Object.assign({},selectedData[0]);
  }

  exportExcel() {
    this.params.api.exportDataAsCsv();
  }

  //  deleteShoe() {
  //   alertify.confirm('Bạn có chắc chắn muốn xoá không ?', (confirmed) => {
  //     if(confirmed)
  //     this._customerService
  //     .deleteCustomer(this.selectedData)
  //     .subscribe(
  //       (res) => {
  //         alertify.success('Xóa KH thành công');
  //         this.callBackEvent(this.params);
  //       },
  //       (err) => console.log(err)
  //     );
  //   });

  // }
}

