import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewRecipeComponent} from './new-recipe.component'

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRecipeRoutingModule { }
