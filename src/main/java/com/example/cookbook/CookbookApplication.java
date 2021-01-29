package com.example.cookbook;

import com.example.cookbook.recipe.controllers.RecipeController;
import com.example.cookbook.recipe.model.Recipe;
import com.example.cookbook.recipe.services.RecipeService;
import com.example.cookbook.tag.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.LongStream;
import java.util.stream.Stream;

@SpringBootApplication
public class CookbookApplication implements CommandLineRunner {

	@Autowired
	RecipeService recipeService;

	public static void main(String[] args) {
		SpringApplication.run(CookbookApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		List<String> tags = new ArrayList<>();
//		tags.add("Chicken");
//		tags.add("Pasta");
//		Set<Recipe> listOfRecipes = recipeService.getRecipesByTags(tags);
//		listOfRecipes.forEach(x -> System.out.println(x.getTitle()));
//			recipeService.deleteRecipe(29L);
//		Recipe recipe = new Recipe("Test", "TestLoc", "TestCook", "", Arrays.asList("test1","test2"));
//
//		recipeService.saveRecipe(recipe);

//		System.out.println("Getting recipes with ingredient cheese");
//		Set<Recipe> listOfRecipes = recipeService.getRecipesByTags(Stream.of("Cheese","Pasta").collect(Collectors.toList()));
//		listOfRecipes.forEach(x -> System.out.println(x.getTitle()));

	}
}
