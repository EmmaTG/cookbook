import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Recipe } from '../@api/models/recipe';
import { RecipesService } from '../@api/services/recipes.service';

import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


    tags: string[] = [];
    recipes: Recipe[];
    selectedRecipe: Recipe;
    display: boolean = false;

    update: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private recipesService: RecipesService) { }

    ngOnInit(): void {
        this.getQueryParams();
    }

    getQueryParams(): void {
        this.route.queryParams.subscribe(successResponse => {
            if (typeof successResponse.tags =='string'){
                this.tags = [];
                this.tags.push(successResponse.tags);
            } else {
                this.tags = successResponse.tags;
            }
        }, errorResponse => {
            console.log("error");
        });
    }

    selected(event: any): void {
        this.selectedRecipe= event;
    }

    onAdd(){
        this.updateQueryParameters();
    }

    onRemove(){
        this.updateQueryParameters();
    }


    updateQueryParameters(){
        this.update=false;
        this.router.navigate([], { relativeTo: this.route,
                                   queryParams: { tags: this.tags },
                                  });
    }


    onSaved(event: any): void {
        this.display=event;
        this.update=true;
    }

}
