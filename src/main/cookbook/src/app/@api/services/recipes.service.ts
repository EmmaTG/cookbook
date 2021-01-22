import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../models/recipe';
import {Tag} from '../models/tag';
import {Observable} from 'rxjs';

import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

    rootURL: string = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.rootURL + '/recipes');
    }

    saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.rootURL+'/recipes', recipe);
    }

    getRecipeByTags(tags: string[]): Observable<Recipe[]> {
    let params = tags.join(",");
    const options = tags? {params: new HttpParams().set('tagsString', params)} : {};
    return this.http.get<Recipe[]>(this.rootURL + '/recipes/tags', options);
    }

    updateRecipe(recipeToUpdate: Recipe): Observable<Recipe>{
    return this.http.put<Recipe>(this.rootURL + '/recipes/' + recipeToUpdate.id,recipeToUpdate)
    }

    updateLastMadeDate(madeRecipeId: number): Observable<Recipe>{
    return this.http.put<Recipe>(this.rootURL + '/recipes/made/' + madeRecipeId, null)
    }

    deleteRecipe(recipeToDeleteId: number): void{
        this.http.delete(this.rootURL+'/recipes/' + recipeToDeleteId)
    }
}
