import { Component, OnInit } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { TagsService } from '../@api/services/tags.service';

interface selectTag {
    name: string,
    code: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    display: boolean = false;
    listTags = false;
    tags: string[] = [];
    availableTags : selectTag[];
    selectedTags : selectTag[];

    constructor(private tagsService: TagsService) {
        this.getPopularTags();
    }

    ngOnInit(): void {
    }

    onSaved(event: any): void {
        this.display=event;
    }

    createTags(event:any):void {
        this.tags = this.selectedTags.map(x=>x.name);
    }

    onListAll(event: any): void {

    }

    getPopularTags(){
        this.tagsService.getAllTags().subscribe(successResponse => {
            this.availableTags = successResponse.map(x => {return {name:x.tagName, code:x.tagName}});
        }, errorResponse => {
            console.log("Error")
        });
    }

}
