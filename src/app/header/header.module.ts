import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '../login/login.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    LoginModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
