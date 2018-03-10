import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'dar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  nightMode: boolean;

  constructor(private _overlayContainer: OverlayContainer, private _cookieService: CookieService) {
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
}
