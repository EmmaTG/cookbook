import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../@api/models/recipe';
import { RecipesService } from '../../@api/services/recipes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

    @Input() tags: string[];
//     @Input() update: boolean;

    @Output() recipe: EventEmitter<Recipe> = new EventEmitter();

    selectedRecipe: Recipe;
    recipes: Recipe[]=[];

    sortBy: string = "tagName";
    sortByOptions: {label: string, value: string}[] = [
        { label: "Relevance", value: "tagName"},
        { label: "Cooking time", value: "cookTime"},
        { label: "Date last made", value: "dateLastMade"},
        { label: "Title", value: "title"},
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
                            this.getRecipeFromTags();
                        return;
                        }
//                         case 'update': {
//                         if (this.update){
//                             console.log("this.update");
//                             this.getRecipeFromTags();
//                             }
//                         return;
//                         }
                    }
                } else {
                    if(propName==='tags'){
                        if(this.tags == undefined) {
                            this.tags = [];
                        }
                    }
                }
            }
        }
    }

    deleteRecipeFromList(event) {
        this.recipes = this.recipes.filter(x => (x.id !== event));
    }

    updateRecipeInList(event) {
        const id: number = event.id;
        this.recipes = this.recipes.map(x => {
            if (x.id === id) {
                return event;
            }
            return x;
        });
    }

    sortByOption(): void {
        this.recipes.sort((a,b) => {
                    if (this.sortBy=="tagName"){
                        let aTagNumber = a.tags.filter(val => this.tags.includes(val.tagName.toLowerCase())).length;
                        let bTagNumber = b.tags.filter(val => this.tags.includes(val.tagName.toLowerCase())).length;
                        return bTagNumber-aTagNumber;
                        }
                   return a[this.sortBy].localeCompare(b[this.sortBy]);
            });
    }

    onRowSelect(event: any){
        this.recipe.emit(event.data);
    }
    onRowUnselect(event:any){
        this.recipe.emit(null);
    }

    getRecipeFromTags(): void {
        this.recipesService.getRecipeByTags(this.tags).subscribe(successResponse => {
                this.recipes=successResponse;
                this.sortByOption();
//                 this.selectedRecipe =this.recipes[0];
//                 this.recipe.emit(this.selectedRecipe);
            }, errorResponse => {
                console.log("Error")
            });
    }


}
