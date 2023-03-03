import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { RecipesService } from '../@api/services/recipes.service';
import {selectTag} from '../@api/models/selectTag';

import {Message} from 'primeng/api';

import { Recipe } from '../@api/models/recipe'
import { Tag } from '../@api/models/tag'


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})

export class NewRecipeComponent implements OnInit{

    @Output() saved: EventEmitter<boolean> = new EventEmitter();
    @Input() availableTags: selectTag[];

    display: boolean = false;
    newIngredient: boolean = false;

    stringTags: string[];
    selectedTags : selectTag[];

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
                      cookTime: '',
                      dateCreated: null,
                      dateLastMade: null,
                      location: '',
                      tags: [],
                      notes: '',
                  };
        this.stringTags = []
        this.selectedTags = [];
    }

    onSubmit() {
        console.log("Form submitted");
        for (var tag of this.stringTags){
            let newTag: Tag = { tagId: null, tagName: ""}
            newTag.tagName = tag.trim().toLowerCase();
            this.recipe.tags.push(newTag);
            }
        for (var sTag of this.selectedTags){
            let newTag: Tag = {tagId: sTag.code, tagName: sTag.name.toLowerCase()}
            this.recipe.tags.push(newTag);
        }
        this.recipesService.saveRecipe(this.recipe).subscribe(successResponse => {
            this.saved.emit(false)
            this.newRecipe();
        }, errorResponse => {
            console.log("error");
        });
    }

    tagSelected(event:any){
    }

  updateName() {
//     this.title.setValue("Title Changed")
  }
}

