import { Component, OnInit } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    display: boolean = false;
    tags: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    onSaved(event: any): void {
        this.display=event;
    }

}
