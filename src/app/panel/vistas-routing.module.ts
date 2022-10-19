import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from '../shared/guards/authorize.guard';
import { ProductosComponent } from './productos/page/productos.component';
import { PanelComponent } from './panel.component';
import { InicioComponent } from './inicio/inicio.component';
import { FoodTruckComponent } from './food-truck/page/food-truck.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
     {path: '', redirectTo: '/inicio/home', pathMatch: 'full'},
      {
        path: 'home',
        component: InicioComponent,
        canActivate:[AuthorizeGuard]
      },
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate:[AuthorizeGuard]
      },
      {
        path: 'FoodTruck',
        component: FoodTruckComponent,
        canActivate:[AuthorizeGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistasRoutingModule { }
