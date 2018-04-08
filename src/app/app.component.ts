import {
  Component,
  HostBinding,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CookieService } from 'ngx-cookie-service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry, MatSidenav } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snav') snav: MatSidenav;
  @HostBinding('class') componentCssClass;
  nightMode: boolean;
  mobileQuery: MediaQueryList;
  user$;
  lang = 'fr';
  routerSubscription: Subscription;
  private _mobileQueryListener: () => void;

  constructor(
    private _overlayContainer: OverlayContainer,
    private _cookieService: CookieService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _authService: AuthService,
    private _router: Router,
    private translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    iconRegistry.addSvgIcon(
      'darija',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/darija.svg')
    );
    iconRegistry.addSvgIcon(
      'darija-white',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/darija-white.svg')
    );
    this.user$ = this._authService.getUser();
    this.routerSubscription = this._router.events.subscribe(url => this.mobileQuery.matches ? this.snav.close() : undefined);

    translate.setDefaultLang('fr');
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

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
