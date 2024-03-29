import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { NewRecipeRoutingModule } from './new-recipe-routing.module';
import { NewRecipeComponent } from './new-recipe.component';

import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [NewRecipeComponent],
  imports: [
    FormsModule,
    CommonModule,
    NewRecipeRoutingModule,
    InputMaskModule,
    InputMaskModule,
    InputTextareaModule,
    DialogModule,
    ButtonModule,
    ChipsModule,
    MultiSelectModule,
    AutoCompleteModule,
    CheckboxModule
  ],
  exports: [NewRecipeComponent]
})

export class NewRecipeModule { }
