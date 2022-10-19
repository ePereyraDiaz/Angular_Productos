import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(public auth: AuthorizationService, public router: Router,public swalAlert: AlertService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.auth.isTokenValid()) {
      this.swalAlert.Alert('info','ERROR EN LA SESIÓN','Por seguridad es necesario acceder nuevamente.')
      .then(() => {
        this.auth.loadToken(null);
        this.router.navigate(['/login']);
      });
      return false;
    }
    return true;
  }
}
