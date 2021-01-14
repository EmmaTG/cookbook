import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {ChipsModule} from 'primeng/chips';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';

import { RecipeListRoutingModule } from './recipe-list-routing.module';
import { ListComponent } from './list/list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list.component';
import { NewRecipeModule } from '../new-recipe/new-recipe.module';


@NgModule({
    declarations: [ListComponent, RecipeComponent, RecipeListComponent],
    imports: [
            CommonModule,
            RecipeListRoutingModule,
            NewRecipeModule,
            InputTextModule,
            InputTextareaModule,
            InputMaskModule,
            ChipsModule,
            DialogModule,
            ButtonModule,
            TableModule,
            SelectButtonModule,
            DropdownModule,
            ConfirmPopupModule,
            FormsModule,
        ],
    providers: [ConfirmationService]
})
export class RecipeListModule { }
