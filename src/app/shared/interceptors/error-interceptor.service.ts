import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthorizationService } from '../services/authorization.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { DataSessionService } from '../services/data-session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  private reqClone: any;

  constructor(
    private authService: AuthorizationService,
    private swalService: AlertService,
    private localStorage: DataSessionService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if(req.url.includes('microsoftonline') || req.url.includes('/Login/Autenticacion')){ // para que ignore estos endpoint
      return next.handle(req);
    }

   if (!this.authService.isTokenValid()) {  //si no encuentra el token en la cookie
     this.reqClone = '';
     this.swalService.Alert('error', 'ERROR EN LA SESIÓN','Por seguridad la sesión cerrará, es necesario acceder nuevamente.')
      .then(() => {
        this.authService.logout();
      });
     return next.handle(req);
     //Dirigir al login
   } else { //si el token es valido continua.
    var token = this.authService._token;
    var userId = this.authService._idUser;
    const headers = new HttpHeaders({  //para guardar el token
      'Authorization': 'Bearer '+token,
      'userId':userId,
      'userEmail': localStorage['emailUsuario']
      });
      this.reqClone = req.clone({   // se clona para enviar este paramatros de headers
        headers
      });

    return next.handle(this.reqClone).pipe(
      catchError((error: any) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status != 400 && error.status != 401 ) {
            // SI SON LOS OTROS TIPOS DE ERRORES MANDAN GUARDAR LOS LOGS
            if (!error.error.includes('SQL')) {
              if (!error.message.includes('api/logs/addlog')) {
                var info: any  = {
                  iIdusuario: this.localStorage.getId(),
                  vchCorreo: this.localStorage.getCorreo(),
                  vchMensajeError: 'ERROR: '+ error.status + '-'+ '\n'+'DESCRIPCIÓN:'+error.error,
                  vchEndPoint: error.url
                }
              } else {
                this.swalService.showToasterLog("Error de Log", "Hubo un problema al guardar el Log.");
              }
            } else {
              this.swalService.showToasterLog("Error de VPN", "Hubo un problema con la conexión a la base de datos.");
            }
          }

          switch (error.status) {
            case 401:
              this.swalService.Alert('warning', 'SESIÓN CADUCADA','Por seguridad la sesión ha caducado, es necesario acceder nuevamente.')
              .then(() => { this.authService.logout(); });
              break;

              case 400:
                this.swalService.Alert('error', 'ERROR','Se presentó un error al enviar la petición, intente nuevamente.'+'\n'+error.error)
                .then(() => {});
                break;

              case 500:
                this.swalService.Alert('error', 'ERROR 500', error.error)
                .then(() => {
                  this.router.navigateByUrl('/inicio');
                });
                break;

              case 503:
                this.swalService.Alert('warning', 'ERROR','El servicio se encuentra inaccesible, intente nuevamente.')
                .then(() => {});
                break;

              default:
                this.swalService.Alert('error', 'ERROR','Se presentó un error al enviar la petición anterior, intente nuevamente.'+'\n'+error.error)
                .then(() => {});
                break;
          }
        }
        else {
          console.error("Other Errors");
        }
        return throwError(() => new Error('Error'))
      })
    );
   }
  }
}
