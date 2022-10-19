import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenGuard implements CanActivate {

  constructor(
    private router: Router,
    public auth: AuthorizationService, 
    public swalAlert: AlertService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isTokenValid()) {
        this.swalAlert.Alert('info','ERROR EN LA SESIÓN','Token no válido.')
        .then(() => {
          this.router.navigateByUrl('/login');
        });
        return false;
      }
      else{
        return true;
      }
  }

}
