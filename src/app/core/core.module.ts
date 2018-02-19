import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthenticationGuard } from './guards/authentication-guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, AuthenticationGuard],
  exports: [],
  bootstrap: []
})
export class CoreModule {}
