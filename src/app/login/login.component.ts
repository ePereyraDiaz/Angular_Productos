import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { AuthorizationService } from '../shared/services/authorization.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  public disabled = false;
  public CorreoUsuario = "";
  public formUser: FormGroup;
  public ProductoSubscription:   Subscription | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private authService: AuthorizationService,
    private swalService: AlertService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.disabled = false;
    this.reactiveForm();
    this.authService.loadToken(null);
    
    this.route.queryParams.subscribe((params) => {
      if(params['returnUrl']) {
        this.authService.RedireccionUrl = params['returnUrl'];
      } else {
        this.authService.RedireccionUrl = '/inicio';
      }
      if (
        localStorage['UrlRedirect'] != undefined &&
        localStorage['UrlRedirect'] != '/' &&
        localStorage['UrlRedirect'] != ' ' &&
        localStorage['UrlRedirect'] != ''
      ) {
        this.authService.RedireccionUrl = params['returnUrl'];
      } else {
        this.authService.RedireccionUrl = '/inicio';
      }
    });
  }
  
  login() {
    if(this.CorreoUsuario == "")
    {
      return;
    }

    this.disabled = true;
    this.loginService.getAutenticacion(this.CorreoUsuario).subscribe(
          (data: any) => {
            if (data.bitResultado) {
              localStorage.setItem('emailUsuario',  data.vchCorreo.toUpperCase());
              localStorage['idUsuario'] = data.Id;
              localStorage['usuario'] = data.vchNombre;
              this.authService.saveToken(data.token)
              .then(() => {
                this.router.navigate([this.authService.RedireccionUrl]);
              });
            } else {
              this.swalService.Alert('error', 'INICIO DE SESIÓN', data.vchMensaje)
              .then(() => {
                this.logout();
              });
            }
          },
          (err) => {
            if ( err.error ) {
              this.swalService.Alert('error', 'INICIO DE SESIÓN', err.error)
              .then(() => {
                this.logout();
              });
            } else {
              this.swalService.Alert('error', 'INICIO DE SESIÓN', err.error.message)
              .then(() => {
                this.logout();
              });
            }
          });
  }

  reactiveForm() {
    this.formUser = this.formBuilder.group({
      usuario: ['', [Validators.required]],
    });
  }

  logout() {
    this.authService.loadToken(null);
    this.authService.logout();
    this.disabled = false;
  }
}
