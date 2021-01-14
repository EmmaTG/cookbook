import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../../@api/models/recipe';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnChanges {

    @Input() recipe: Recipe;

    made: boolean = false;
    buttonStyle: string = "p-button-outlined"

    constructor(private confirmationService: ConfirmationService) { }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target:event.target,
            message: "Are you sure you want to make this today?",
            icon: 'pi pi-question-circle',
            accept: ()=> {
                console.log('accepted, run update to lastmade field indatabase')
                this.made = true;
                this.changeButtonStyle();
            },
            reject: () => {
                console.log('rejected')
                this.made = false;
                this.changeButtonStyle();
            }
        })
    }

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
