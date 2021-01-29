package com.example.cookbook.tag.model;

import com.example.cookbook.recipe.model.Recipe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tagId")
    private Long id;

    @Column(name = "tagName")
    private String tagName;

//    @ManyToMany(mappedBy = "tags", cascade = CascadeType.PERSIST, fetch=FetchType.LAZY)
//    @Column(name = "recipes")
//    @JsonIgnore
//    private List<Recipe> recipes;

//    public void addRecipe(Recipe recipe){
//        recipes.add(recipe);
//        recipe.getTags().add(this);
//    }
}
