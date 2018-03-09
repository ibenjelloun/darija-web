import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class LayoutModule {}
