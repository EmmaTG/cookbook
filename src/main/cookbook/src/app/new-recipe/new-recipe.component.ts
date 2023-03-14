import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { RecipesService } from '../@api/services/recipes.service';

import {Message} from 'primeng/api';

import { Recipe } from '../@api/models/recipe'
import { Tag } from '../@api/models/tag'
import {SelectTag} from '../@api/models/selectTag';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})

export class NewRecipeComponent implements OnInit{

    @Output() saved: EventEmitter<boolean> = new EventEmitter();
    @Input() fullTags: Tag[];

    display: boolean = false;
    newIngredient: boolean = false;

    stringTags: string[] = [];
    filteredTags : String[] = [];
    selectedTags: Tag[] = [];
    newIngredientMessage: string = "Click to add ingredient not in list"

    recipe: Recipe;

    constructor( private recipesService: RecipesService) {
     }

    ngOnInit(): void {
        this.newRecipe();
    }

    newRecipe(){
        this.recipe = {
                      id: null,
                      title:'',
                      cookTime: '00 hr 00 min',
                      dateCreated: null,
                      dateLastMade: null,
                      location: '',
                      tags: [],
                      notes: '',
                  };
        this.stringTags = []
    }

    onSubmit() {
        console.log("Form submitted");
        for (var tag of this.stringTags){
            let newTag: Tag = { id: null, tagName: ""}
            newTag.tagName = tag.trim().toLowerCase();
            this.recipe.tags.push(newTag);
            }
        for (var sTag of this.selectedTags){
            this.recipe.tags.push(sTag);
        }
        this.recipesService.saveRecipe(this.recipe).subscribe(successResponse => {
            this.saved.emit(false)
            this.newRecipe();
        }, errorResponse => {
            console.log("error");
        });
    }

    tagSelected(event: any) {
        if (event.tagName === this.newIngredientMessage){
            this.newIngredient = true;
        }
        this.selectedTags = this.selectedTags.filter(x => { return(x.tagName !== this.newIngredientMessage)});
    }

    search(event) {
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.fullTags.length; i++) {
            let tag = this.fullTags[i];
            if (tag.tagName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(tag);
                console.log(tag);
            }
        }
        filtered.push({id:0, tagName: this.newIngredientMessage})
        this.filteredTags = filtered;
    }

  updateName() {
//     this.title.setValue("Title Changed")
  }
}

