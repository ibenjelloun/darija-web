import {
  Component,
  HostBinding,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CookieService } from 'ngx-cookie-service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  nightMode: boolean;
  mobileQuery: MediaQueryList;
  user$;
  private _mobileQueryListener: () => void;

  constructor(
    private _overlayContainer: OverlayContainer,
    private _cookieService: CookieService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    iconRegistry.addSvgIcon(
      'darija',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/darija.svg'
      )
    );
    this.user$ = this._authService.getUser();
  }

  ngOnInit() {
    this.nightMode = this._cookieService.get('nightMode') === 'true';
    this.onSetNightMode(this.nightMode);
  }

  public onSetNightMode(nightMode: boolean) {
    let newTheme, oldTheme;
    if (!nightMode) {
      newTheme = 'light-theme';
      oldTheme = 'dark-theme';
    } else {
      newTheme = 'dark-theme';
      oldTheme = 'light-theme';
    }
    this._overlayContainer.getContainerElement().classList.remove(oldTheme);
    this._overlayContainer.getContainerElement().classList.add(newTheme);
    this.componentCssClass = newTheme;
    this._cookieService.set('nightMode', '' + nightMode);
  }

  login() {
    this._authService.loginWithGoogle();
  }

  logout() {
    this._authService.logout();
  }
}
