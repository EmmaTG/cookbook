package com.example.cookbook.tag.repositories;

import com.example.cookbook.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TagRepo extends JpaRepository<Tag, Long> {

    @Query(value = "SELECT * FROM tag WHERE tag_name=?1", nativeQuery = true)
    public Optional<Tag> findByName(String name);
}
