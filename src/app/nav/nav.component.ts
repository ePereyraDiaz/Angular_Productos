import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataSessionService } from '../shared/services/data-session.service';
import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthorizationService,
    private sessionService: DataSessionService) {
    }

    logout() {
      this.authService.loadToken(null);
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    getNombre() {
      return this.sessionService.getNombre()
    }

    getCorreo() {
      return this.sessionService.getCorreo();
    }
}
