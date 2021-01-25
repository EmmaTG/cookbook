import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { RecipesService } from '../@api/services/recipes.service';

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

    display: boolean = false;

    stringTags: string[];

    recipe: Recipe;

    constructor( private recipesService: RecipesService) { }

    ngOnInit(): void {
        this.newRecipe()
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

        this.stringTags= []
    }

    onSubmit() {
        console.log("Form submitted");
        for (var tag of this.stringTags){
            let newTag: Tag = { tagId: null, tagName: ""}
            newTag.tagName = tag.toLowerCase();
            this.recipe.tags.push(newTag);
            }
        this.recipesService.saveRecipe(this.recipe).subscribe(successResponse => {
            this.saved.emit(false)
            this.newRecipe();
        }, errorResponse => {
            console.log("error");
        });
    }

  updateName() {
//     this.title.setValue("Title Changed")
  }
}

