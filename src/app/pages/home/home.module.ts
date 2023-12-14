import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NotePopupComponent } from 'src/app/components/note-popup/note-popup.component';
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, NoteCardComponent, NotePopupComponent]
})
export class HomePageModule {}
