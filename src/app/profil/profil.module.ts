import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilService } from './services/profil.service';
import { MaterialModule } from '../material/material.module';
import { ProfilDetailsComponent } from './profil/profil-details.component';

@NgModule({
  imports: [
    CommonModule, ProfilRoutingModule, MaterialModule
  ],
  declarations: [ProfilDetailsComponent, ProfilComponent]
})
export class ProfilModule { }
