import { ShoeShopComponent } from './pages/shoe-shop/shoe-shop.component';
import { HistoryShoeSaleComponent } from './pages/history-shoe-sale/history-shoe-sale.component';
import { ShoeSaleComponent } from './pages/shoe-sale/shoe-sale.component';
import { CreateShoeOrderComponent } from './pages/create-shoe-order/create-shoe-order.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeComponent } from './pages/employee/employee/employee.component';

import { HomeComponent } from './_components/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LogInfoComponent } from './pages/log-info/log-info.component';
import { ShoeOrderComponent } from './pages/shoe-order/shoe-order.component';
import { ShoeInfoComponent } from './pages/shoe-info/shoe-info.component';
import { ShoeReceiveComponent } from './pages/shoe-receive/shoe-receive.component';
import { HistoryReceiveShoeComponent } from './pages/history-receive-shoe/history-receive-shoe.component';
import { TopShoeSaleComponent } from './pages/top-shoe-sale/top-shoe-sale.component';
import { ShoeSupplierComponent } from './pages/shoe-supplier/shoe-supplier.component';
import { UserIntroComponent } from './pages_user/user-intro/user-intro.component';
import { UserCollectionComponent } from './pages_user/user-collection/user-collection.component';
import { UserMainComponent } from './pages_user/user-main/user-main.component';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { UserProductComponent } from './pages_user/user-product/user-product.component';
import { UserCartComponent } from './pages_user/user-cart/user-cart.component';
import { UserLogInComponent } from './pages_user/user-log-in/user-log-in.component';
import { UserRegisterComponent } from './pages_user/user-register/user-register.component';
import { FolllowOrderComponent } from './pages_user/folllow-order/folllow-order.component';
import { OrderDetailComponent } from './pages_user/order-detail/order-detail.component';

const appRoutes: Routes = [

  { path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '',
        children: [
          { path: 'log-info', component: LogInfoComponent, canActivate: [AuthGuard] ,data: { state: 'log-info' } },
          { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] ,data: { state: 'employee' } },
          { path: 'customer',outlet: 'child1', component: CustomerComponent, canActivate: [AuthGuard] ,data: { state: 'customer' } },
          { path: 'shoe-info', component: ShoeInfoComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-info' } },
          { path: 'shoe-order', component: ShoeOrderComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-order' } },
          { path: 'create-shoe-order', component: CreateShoeOrderComponent, canActivate: [AuthGuard] ,data: { state: 'create-shoe-order' } },
          { path: 'shoe-receive', component: ShoeReceiveComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-receive' } },
          { path: 'history-receive-shoe', component: HistoryReceiveShoeComponent, canActivate: [AuthGuard] ,data: { state: 'history-receive-shoe' } },
          { path: 'shoe-sale', component: ShoeSaleComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-sale' } },
          { path: 'history-shoe-sale', component: HistoryShoeSaleComponent, canActivate: [AuthGuard] ,data: { state: 'history-shoe-sale' } },
          { path: 'top-shoe-sale', component: TopShoeSaleComponent, canActivate: [AuthGuard] ,data: { state: 'top-shoe-sale' } },
          { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] ,data: { state: 'customer' } },
          { path: 'login', component: LoginComponent },
          { path: 'shoe-supplier', component: ShoeSupplierComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-supplier' } },
          { path: 'shoe-shop', component: ShoeShopComponent, canActivate: [AuthGuard] ,data: { state: 'shoe-shop' } },
        ]
      },
    ]
  },

  //user-view
  { path: 'view', component: UserMainComponent,
    children: [
      { path: '', component: UserIntroComponent, pathMatch: 'full' },
      { path: '',
        //runGuardsAndResolvers: 'always',
        // canActivate: [AuthGuard],
        children: [
          { path: 'collection', component: UserCollectionComponent },
          { path: 'collection-detail', component: UserProductComponent },
          { path: 'cart', component: UserCartComponent },
          { path: 'log-in', component: UserLogInComponent },
          { path: 'register', component: UserRegisterComponent },
          { path: 'follow-order', component: FolllowOrderComponent },
          { path: 'order-detail', component: OrderDetailComponent },
        ]
      },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'view' },
];

export const routing = RouterModule.forRoot(appRoutes);
