package com.example.cookbook.tag.controllers;

import com.example.cookbook.tag.model.Tag;
import com.example.cookbook.tag.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class TagController {

    @Autowired
    TagService tagService;

    //Get all tags
    @GetMapping("/tags")
    public List<Tag> getAllTags(){
        return tagService.getTags();
    }
}
