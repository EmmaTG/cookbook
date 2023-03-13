import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Recipe } from '../@api/models/recipe';
import { RecipesService } from '../@api/services/recipes.service';
import { TagsService } from '../@api/services/tags.service';

import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    tags: string[] = [];
    availableTags : String[] = [];
    filteredTags : String[] = [];
    recipes: Recipe[];
    selectedRecipe: Recipe;

    display: boolean = false;
    update: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private recipesService: RecipesService,
                private tagsService: TagsService) { }

    ngOnInit(): void {
        this.getQueryParams();
        this.getPopularTags();
    }

    getQueryParams(): void {
        this.route.queryParams.subscribe(successResponse => {
            if (typeof successResponse.tags =='string'){
                this.tags = [];
                this.tags.push(successResponse.tags);
            } else {
                this.tags = successResponse.tags;
            }
            if (this.tags){
                this.tags = this.tags.map(tag => tag.toLowerCase());
            }
        }, errorResponse => {
            console.log("error");
        });
    }


    search(event) {
            let filtered : any[] = [];
            let query = event.query;

            for(let i = 0; i < this.availableTags.length; i++) {
                let tag = this.availableTags[i];
                if (tag.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(tag);
                }
            }
            this.filteredTags = filtered;

        }

    onUpdateList(event: Event){
        this.update=true;
    }

    selected(event: any): void {
        this.selectedRecipe = event;
    }

//     onAdd(){
//         this.updateQueryParameters();
//     }
//
//     onRemove(){
//         this.updateQueryParameters();
//     }


    updateQueryParameters(){
//         this.update=false;
        this.router.navigate([], { relativeTo: this.route,
                                   queryParams: { tags: this.tags },
                                  });
    }


    onSaved(event: any): void {
        this.display=event;
//         this.update=true;
    }


    getPopularTags(){
        this.tagsService.getAllTags().subscribe(successResponse => {
            this.availableTags = successResponse.map(x => {return x.tagName});
        }, errorResponse => {
            console.log("Error")
        });
    }

}
