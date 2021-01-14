package com.example.cookbook.tag.services;

import com.example.cookbook.tag.model.Tag;
import com.example.cookbook.tag.repositories.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    TagRepo tagRepo;

    public List<Tag> getTags(){
        return tagRepo.findAll();
    }

    public Optional<Tag> getTagById(Long tagId){
        return tagRepo.findById(tagId);
    }

    public Tag saveTag(Tag tag){
        return tagRepo.save(tag);
    }

    public List<Tag> saveListOfTags(List<Tag> tags){
        return tagRepo.saveAll(tags);
    }

    public Tag updateTag(Long tagId, Tag changedTag){
        Tag tagToUpdate = getTagById(tagId)
                .orElseThrow();
        tagToUpdate.setTagName(changedTag.getTagName());
        tagToUpdate.setRecipes(changedTag.getRecipes());
        return tagRepo.save(tagToUpdate);
    }
}
