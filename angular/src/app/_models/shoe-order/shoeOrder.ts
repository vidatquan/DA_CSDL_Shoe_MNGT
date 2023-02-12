import { Moment } from "moment";

export class ShoeOrder {
    Id : number;
    OrderUser: string;
    OrderNo: string;
    OrderDate: Moment | null;
    OrderStatus : number;
    ShopId : number;
    SupplierName : string;
  }
