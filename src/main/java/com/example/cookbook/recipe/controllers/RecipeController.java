package com.example.cookbook.recipe.controllers;

import com.example.cookbook.recipe.model.Recipe;
import com.example.cookbook.recipe.services.RecipeService;
import com.example.cookbook.tag.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    //Get all recipes
    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes(){
        return recipeService.getRecipes();
    }

    //Get recipe by Id
    @GetMapping("/recipes/{id}")
    public Recipe getRecipeById(@PathVariable(value = "id") Long id){
        return recipeService.getRecipeByID(id).orElse(null);
    }

    //Get recipe by tag Id
    @GetMapping("recipes/tags")
    public List<Recipe> getRecipeByTags(@RequestParam String tagsString){
        if (tagsString.trim().isEmpty()){
            return recipeService.getRecipes();
        }
        String[] tags = tagsString.trim().split(",");
        return new ArrayList<>(recipeService.getRecipesByTags(tags));
    }

    //Add new recipe
    @PostMapping("/recipes")
    public Recipe saveRecipe(@RequestBody @Valid Recipe newRecipe){
        List<Tag> tags = newRecipe.getTags();
        List<Tag> newTags = new ArrayList<>();
        for (Tag tag: tags){
            Tag foundTag = recipeService.getTagByName(tag.getTagName())
                    .orElse(tag);
            foundTag.getRecipes().add(newRecipe);
            newTags.add(foundTag);
        }
        newRecipe.setTags(newTags);
        newRecipe.setDateCreated(new Timestamp(System.currentTimeMillis()));
        return recipeService.saveRecipe(newRecipe);
    }

    //Update recipe details
    @PutMapping("/recipes/{id}")
    public Recipe updateRecipe(@PathVariable(value = "id") Long id, @RequestBody @Valid Recipe newRecipe){
        return recipeService.updateRecipe(id,newRecipe);
    }

    //update recipe LastMade date
    @PutMapping("/recipes/made/{id}")
    public Recipe updateLastMadeDate(@PathVariable(value = "id") Long id){
        return recipeService.updateLastMade(id);
    }

    //Delete recipe
    @DeleteMapping("/recipes/{id}")
    public void deleteRecipe(@PathVariable(value = "id") Long id){
        Recipe recipe = recipeService.getRecipeByID(id).orElseThrow();
        recipe.getTags().forEach(tag -> tag.getRecipes().remove(recipe));
        recipeService.deleteRecipe(id);
    }


}
