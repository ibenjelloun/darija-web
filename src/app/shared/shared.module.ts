import { NgModule } from '@angular/core';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthentificationComponent],
  exports: [AuthentificationComponent]
})
export class SharedModule {}
