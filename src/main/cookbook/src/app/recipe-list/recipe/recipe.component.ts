import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../@api/models/recipe';
import { RecipesService } from '../../@api/services/recipes.service';

import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnChanges {

    @Input() recipe: Recipe;
    @Output() recipeUpdated: EventEmitter<boolean> = new EventEmitter();

    made: boolean = false
    edit: boolean =false;
    buttonStyle: string = "p-button-outlined";
    editingRecipe: Recipe;

    constructor(private confirmationService: ConfirmationService,
                private recipesService: RecipesService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes){
            if (changes.hasOwnProperty(propName)){
                switch(propName){
                    case 'recipe': {
                        this.made = false;
                        this.changeButtonStyle();
                    return;
                    }
                }
            }
        }
    }

    confirm(event: Event, recipe: Recipe) {
        this.confirmationService.confirm({
            target:event.target,
            message: "Are you sure you want to make this today?",
            icon: 'pi pi-question-circle',
            accept: ()=> {
                this.recipesService.updateLastMadeDate(recipe.id).subscribe(successResponse => {
                        this.recipe = successResponse;
                        this.made = true;
                        this.changeButtonStyle();
                        this.recipeUpdated.emit(true);
                    }, errorResponse => {
                        console.log('Error!!');
                    });
            },
            reject: () => {
                console.log('rejected');
                this.made = false;
                this.changeButtonStyle();
            }
        })
    }

    onSave(event: Event) {
        this.confirmationService.confirm({
            target: event.target,
            message: "Are you sure you want to edit this recipe?",
            icon: 'pi pi-question-circle',
            accept: ()=> {
                this.recipesService.updateRecipe(this.editingRecipe).subscribe(successResponse => {
                        this.recipe = successResponse;
                        this.recipeUpdated.emit(true);
                        this.edit = false;
                        this.editingRecipe= null;
                    }, errorResponse => {
                        console.log('Error!!');
                    });
            },
            reject: () => {
                console.log('rejected');
            }
        })
    }

    editRecipe(): void{
        this.edit=true;
        this.editingRecipe = {...this.recipe};
    }

    onCancel() {
        this.editingRecipe=null;
        this.edit = false;
    }

    onClick(){
        this.made = !this.made;
        this.changeButtonStyle();
    }

    changeButtonStyle(){
        if (this.made){
            this.buttonStyle = ""
        } else {
            this.buttonStyle="p-button-outlined"
        }
    }

}
