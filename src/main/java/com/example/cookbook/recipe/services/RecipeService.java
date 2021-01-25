package com.example.cookbook.recipe.services;

import com.example.cookbook.recipe.model.Recipe;
import com.example.cookbook.recipe.repositories.RecipeRepo;
import com.example.cookbook.tag.model.Tag;
import com.example.cookbook.tag.repositories.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class RecipeService {

    @Autowired
    RecipeRepo recipeRepo;
    @Autowired
    TagRepo tagRepo;

    public List<Recipe> getRecipes(){
        return recipeRepo.findAll();
    }

    public Optional<Recipe> getRecipeByID(Long recipeId){
        return recipeRepo.findById(recipeId);
    }

    public Optional<Tag> getTagByName(String tagName){ return tagRepo.findByName(tagName);}

    public void deleteRecipe(Long recipeId){
        recipeRepo.deleteById(recipeId);
    }

    public Recipe saveRecipe(Recipe newRecipe){
        return recipeRepo.save(newRecipe);
    }

    public Recipe updateRecipe(Long recipeId, Recipe newRecipe) {
        Recipe recipeToUpdate = getRecipeByID(recipeId)
                .orElseThrow();
        recipeToUpdate.setTitle(newRecipe.getTitle());
        recipeToUpdate.setLocation(newRecipe.getLocation());
        recipeToUpdate.setCookTime(newRecipe.getCookTime());
        recipeToUpdate.setDateLastMade(newRecipe.getDateLastMade());
        recipeToUpdate.setTags(newRecipe.getTags());
        return recipeRepo.save(recipeToUpdate);
    }

    public Recipe updateLastMade(Long recipeId) {
        Recipe recipeToUpdate = getRecipeByID(recipeId)
                .orElseThrow();
        recipeToUpdate.setDateLastMade(new Timestamp(System.currentTimeMillis()));
        return recipeRepo.save(recipeToUpdate);

    }

    public Set<Recipe> getRecipesByTags(String[] tagList){
        Set<Recipe> listOfRecipes = new HashSet<>();
        Set<Long> listOfIds = new HashSet<>();
        for (String tagName: tagList) {
            listOfIds.addAll(recipeRepo.getRecipeByTagID(tagName));
        }
        for (Long id: listOfIds){
            Recipe recipe = getRecipeByID(id)
                    .orElseThrow();
            listOfRecipes.add(recipe);
        }
        return listOfRecipes;
    }

}
