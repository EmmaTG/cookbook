import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('src/app/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path:'recipes',
    loadChildren: () => import('src/app/recipe-list/recipe-list.module').then(m => m.RecipeListModule)
  },
  {
    path:'', redirectTo: 'home', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
