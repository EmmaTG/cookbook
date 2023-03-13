package com.example.cookbook.recipe.repositories;

import com.example.cookbook.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {

    @Query(value = "SELECT r.recipe_id FROM recipe_tag AS rt\n" +
            " INNER JOIN tag AS t ON rt.tag_id=t.tag_id\n" +
            " INNER JOIN recipes AS r ON rt.recipe_id=r.recipe_id\n" +
            " WHERE tag_name LIKE %?1%", nativeQuery = true)
    List<Long> getRecipeByTagName(String tag);


    @Query(value = "SELECT count(*) FROM recipe_tag AS rt\n" +
            " INNER JOIN tag AS t ON rt.tag_id=t.tag_id\n" +
            " INNER JOIN recipes AS r ON rt.recipe_id=r.recipe_id\n" +
            " WHERE t.tag_id = ?1", nativeQuery = true)
    Long countRecipeByTagName(Long tag);


    @Query(value = "delete from recipe_tag where recipe_id=?1", nativeQuery = true)
    Long deleteRecipeFromJoinTable(Long recipeId);

    @Query(value = "delete from recipe where recipe_id=?1", nativeQuery = true)
    Long deleteRecipeFromRecipes(Long recipeId);
}
