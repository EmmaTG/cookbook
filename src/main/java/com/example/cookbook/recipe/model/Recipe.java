package com.example.cookbook.recipe.model;

import com.example.cookbook.tag.model.Tag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table(name="recipes")
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = "tags")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="recipeId")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="location")
    private String location;

    @Column(name="cookTime")
    private String cookTime;

    @Column(name="lastMade")
    private Timestamp dateLastMade;

    @Column(name="created")
    private Timestamp dateCreated;

    @Column(name="notes")
    private String  notes;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name="recipe_tag",
            joinColumns = @JoinColumn(name="recipe_id", referencedColumnName = "recipeId"),
            inverseJoinColumns = @JoinColumn(name="tag_id", referencedColumnName = "tagId"))
    @Column(name="tags")
    private List<Tag> tags = new ArrayList<>();

}
