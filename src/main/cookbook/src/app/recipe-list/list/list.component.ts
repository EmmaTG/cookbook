import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../@api/models/recipe';
import { RecipesService } from '../../@api/services/recipes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

    @Input() tags: string[];
    @Input() update: boolean;

    @Output() recipe: EventEmitter<Recipe> = new EventEmitter();

    selectedRecipe: Recipe;
    recipes: Recipe[];

    sortBy: string = "";
    sortByOptions: {label: string, value: string}[] = [
        { label: "Cooking time", value: "cookTime"},
        { label: "Date last made", value: "dateLastMade"},
        { label: "Title", value: "title"}
        ]

    constructor(private recipesService: RecipesService,
                private router: Router,) { }

    ngOnInit(): void {
        this.getRecipeFromTags();
    }

    ngOnChanges(changes: SimpleChanges){
        for (const propName in changes){
            if (changes.hasOwnProperty(propName)){
                if (!changes[propName].firstChange){
                    switch(propName){
                        case 'tags': {
                            this.getRecipeFromTags()
                        return;
                        }
                        case 'update': {
                        if (this.update){
                            this.getRecipeFromTags()
                            }
                        return;
                        }
                    }
                } else {
                    if(propName==='tags'){
                        if(this.tags == undefined) {
                            this.tags = []
                        }
                    }
                }
            }
        }
    }

    sortByOption(): void {
        this.recipes.sort((a,b) => a[this.sortBy].localeCompare(b[this.sortBy]));
    }

    onRowSelect(event: any){
        this.recipe.emit(event.data);
    }

    getRecipeFromTags(): void {
        this.recipesService.getRecipeByTags(this.tags).subscribe(successResponse => {
                this.recipes=successResponse.sort((a,b) => a.title.localeCompare(b.title));
            }, errorResponse => {
                console.log("Error")
            });
    }


}
