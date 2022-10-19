import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthTokenGuard } from './shared/guards/auth-token.guard';
import { AuthorizeGuard } from './shared/guards/authorize.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
    //, canActivate:[AuthTokenGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./panel/vistas.module').then(m => m.VistasModule), canActivate:[AuthorizeGuard]  //Se cambio por MaslGuard
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
