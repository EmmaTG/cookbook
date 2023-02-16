import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../@api/models/recipe';
import { Tag } from '../../@api/models/tag';
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

    made: boolean = false;
    edit: boolean =false;
    location_web: boolean = false;
    buttonStyle: string = "p-button-outlined";
    editingRecipe: Recipe;
    tagStrings: string[];

    constructor(private confirmationService: ConfirmationService,
                private recipesService: RecipesService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes){
            if (changes.hasOwnProperty(propName)){
                switch(propName){
                    case 'recipe': {
                        if(!changes[propName].firstChange){
                            if(changes[propName].currentValue != null){
                                let newDate: Date = new Date();
                                let currentDate: string = this.dateFormat(newDate.toDateString());
                                let madeDate: string = this.recipe.dateLastMade? this.dateFormat(this.recipe.dateLastMade) : "";
                                this.made = currentDate===madeDate? true: false;
                                this.location_web = this.recipe.location.includes("www.");
                                this.changeButtonStyle();
                            }
                        }
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
                        this.made = true;
                        this.changeButtonStyle();
                        this.recipe = successResponse;
//                         this.recipeUpdated.emit(true);
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
                this.editingRecipe.tags = []
                for (var tag of this.tagStrings){
                    let newTag: Tag = { tagId: null, tagName: ""}
                    newTag.tagName = tag.toLowerCase();
                    this.editingRecipe.tags.push(newTag);
                }
                console.log(this.editingRecipe)
                this.recipesService.updateRecipe(this.editingRecipe).subscribe(successResponse => {
                        this.recipe = successResponse;
                        console.log(this.recipe);
                        this.recipeUpdated.emit(true);
                        this.editingRecipe= null;
                        this.tagStrings=[];
                        this.edit = false;
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
        this.tagStrings = this.editingRecipe.tags.map(tag => tag.tagName);
        console.log(this.tagStrings);
    }

    deleteRecipe(recipeToDelete: Recipe){
        this.recipesService.deleteRecipe(recipeToDelete.id).subscribe(() => {
            this.recipeUpdated.emit(true);
            console.log('Success!');
        }, errorResponse => {
            console.log('Error');
        })
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
//     let currentDate: string = this.dateFormat(new Date());
//     let madeDate: string = this.dateFormat(this.recipe.dateLastMade);
//     console.log("Today's date")
//     console.log(currentDate)
//     console.log("Made date")
//     console.log(madeDate)
//     console.log(currentDate===madeDate);
        if (this.made){
            this.buttonStyle = ""
        } else {
            this.buttonStyle="p-button-outlined"
        }
    }


    dateFormat(date: string): string{
        var year = date.substring(0,4);
        var month = date.substring(5,7);
        var day = date.substring(8,10);

        let recipeDate= day + "-" + month + "-" + year

        let dateFormatted = new Date(date);
        return dateFormatted.toDateString();
    }

}
