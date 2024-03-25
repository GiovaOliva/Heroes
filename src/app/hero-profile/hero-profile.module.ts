import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroProfileRoutingModule } from './hero-profile-routing.module';
import { HeroProfileComponent } from './hero-profile.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';


@NgModule({
  declarations: [HeroProfileComponent,
    ModalPollComponent],
  imports: [
    CommonModule,
    HeroProfileRoutingModule
  ]
})
export class HeroProfileModule { }
