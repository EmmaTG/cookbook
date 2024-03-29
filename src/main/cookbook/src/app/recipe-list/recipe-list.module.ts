import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {FieldsetModule} from 'primeng/fieldset';
import {ConfirmationService} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { RecipeListRoutingModule } from './recipe-list-routing.module';
import { ListComponent } from './list/list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list.component';
import { NewRecipeModule } from '../new-recipe/new-recipe.module';

import { CapitalFirstLetterPipe } from '../@common/capital-first-letter.pipe';



@NgModule({
    declarations: [ListComponent, RecipeComponent, RecipeListComponent, CapitalFirstLetterPipe],
    imports: [
            CommonModule,
            RecipeListRoutingModule,
            NewRecipeModule,
            InputTextModule,
            InputTextareaModule,
            InputMaskModule,
            ChipsModule,
            ChipModule,
            DialogModule,
            ButtonModule,
            TableModule,
            SelectButtonModule,
            DropdownModule,
            ConfirmPopupModule,
            FieldsetModule,
            FormsModule,
            AutoCompleteModule
        ],
    providers: [ConfirmationService]
})
export class RecipeListModule { }
