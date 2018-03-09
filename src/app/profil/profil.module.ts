import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilService } from './services/profil.service';

@NgModule({
  imports: [
    CommonModule, ProfilRoutingModule
  ],
  declarations: [ProfilComponent],
  providers: [ProfilService]
})
export class ProfilModule { }
