import { Component, OnInit } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { TagsService } from '../@api/services/tags.service';
import {Tag} from '../@api/models/tag';
import {SelectTag} from '../@api/models/selectTag';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    display: boolean = false;
    listTags = false;
    availableTags : String[] = [];
    filteredTags : String[] = [];
    selectedTags : String[] = [];
    fullTags: Tag[] = [];

    constructor(private tagsService: TagsService) {
        this.getPopularTags();
    }

    ngOnInit(): void {
    }

    onSaved(event: any): void {
        this.display=event;
        this.getPopularTags();
    }

    search(event) {
            let filtered : any[] = [];
            let query = event.query;

            for(let i = 0; i < this.availableTags.length; i++) {
                let tag = this.availableTags[i];
                if (tag.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(tag);
                }
            }
            this.filteredTags = filtered;

        }

    getPopularTags(){
        this.tagsService.getAllTags().subscribe(successResponse => {
            this.availableTags = successResponse.map(x => {
            this.fullTags.push(x);
            return x.tagName});
        }, errorResponse => {
            console.log("Error")
        });
    }

}
