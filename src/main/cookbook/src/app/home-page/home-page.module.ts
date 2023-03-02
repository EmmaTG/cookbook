import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { NewRecipeModule } from '../new-recipe/new-recipe.module';

import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {ChipsModule} from 'primeng/chips';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputMaskModule,
    ChipsModule,
    NewRecipeModule,
    InputSwitchModule,
    MultiSelectModule
  ]
})
export class HomePageModule { }
