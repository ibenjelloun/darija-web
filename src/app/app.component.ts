import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'dar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostBinding('class') componentCssClass;

  constructor(private _overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.onSetTheme(true);
  }

  public onSetTheme(theme: boolean) {
    let newTheme, oldTheme;
    if (theme) {
      newTheme = 'light-theme';
      oldTheme = 'dark-theme';
    } else {
      newTheme = 'dark-theme';
      oldTheme = 'light-theme';
    }
    this._overlayContainer.getContainerElement().classList.remove(oldTheme);
    this._overlayContainer.getContainerElement().classList.add(newTheme);
    this.componentCssClass = newTheme;
  }
}
