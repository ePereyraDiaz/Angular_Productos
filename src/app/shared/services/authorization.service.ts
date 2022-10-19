import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public _token:  any;
  public _idUser: any;
  public RedireccionUrl: string | undefined;

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  isTokenValid(): boolean { //verificar que si sea valido
    this._token = null;
    this._idUser = null;
    var isValid = false;
    // this._token = this.cookieService.get('tokenAccess');
    this._token = localStorage['tokenAccess']
    this._idUser = localStorage['idUsuario'];
    if( !!this.loadToken(this._token) ) isValid = true;
    return isValid;
  }

  loadToken(value: any) {
    if (value == null || value == undefined) {
        // this.cookieService.delete('tokenAccess');
        this.cookieService.deleteAll('../');
        localStorage.clear();
        localStorage.clear();
        this.cookieService.deleteAll();
    }
    return value;
  }

  saveToken(token: any) {  // guardar Token
    return new Promise((resolve, reject) => {
      localStorage['tokenAccess'] = token;
      //this.cookieService.set('tokenAccess', token, { secure: true });
      resolve(true);
    });
  }

  logout() {
    this.cookieService.deleteAll('../');
    localStorage.clear();
    this.cookieService.deleteAll();
    this.loadToken(null);
    this.router.navigate(['/login']);
    // this.msalService.instance.logoutPopup();
  }
}
