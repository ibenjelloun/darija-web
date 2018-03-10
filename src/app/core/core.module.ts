import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthenticationGuard } from './guards/authentication-guard';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, AuthenticationGuard, CookieService],
  exports: [],
  bootstrap: []
})
export class CoreModule {}
