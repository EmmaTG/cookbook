import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Recipe } from '../@api/models/recipe';
import { Tag } from '../@api/models/Tag';
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
    fullTags: Tag[] = [];
    updateList: boolean = false;

    display: boolean = false;

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

    selected(event: any): void {
        this.selectedRecipe = event;
    }


    updateQueryParameters(event: any){
        this.router.navigate([], { relativeTo: this.route,
                                   queryParams: { tags: this.tags },
                                  });
    }


    onSaved(event: any): void {
        this.updateList = true;
        this.display=event;
        this.getPopularTags();
    }


    getPopularTags(){
        this.tagsService.getAllTags().subscribe(successResponse => {
            this.availableTags = successResponse.map(x => {
                this.fullTags.push(x);
                return x.tagName
            });
            this.updateList = false;
        }, errorResponse => {
            console.log("Error")
        });
    }

}
