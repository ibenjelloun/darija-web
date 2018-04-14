import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfAuthorizedDirective } from './directives/if-auth.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfAuthorizedDirective],
  exports: [IfAuthorizedDirective]
})
export class SharedModule {}
