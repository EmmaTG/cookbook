-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: cookbook
-- Source Schemata: cookbook
-- Created: Fri Feb 17 14:38:27 2023
-- Workbench Version: 8.0.32
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema cookbook
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `cookbook` ;
CREATE SCHEMA IF NOT EXISTS `cookbook` ;

-- ----------------------------------------------------------------------------
-- Table cookbook.recipe_tag
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cookbook`.`recipe_tag` (
  `recipe_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  INDEX `recipe_id` (`recipe_id` ASC) VISIBLE,
  INDEX `tag_id` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `recipe_tag_ibfk_1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `cookbook`.`recipes` (`recipe_id`),
  CONSTRAINT `recipe_tag_ibfk_2`
    FOREIGN KEY (`tag_id`)
    REFERENCES `cookbook`.`tag` (`tag_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cookbook.recipes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cookbook`.`recipes` (
  `recipe_id` INT NOT NULL AUTO_INCREMENT,
  `title` CHAR(255) NULL DEFAULT NULL,
  `location` CHAR(255) NULL DEFAULT NULL,
  `cook_time` CHAR(255) NULL DEFAULT NULL,
  `last_made` TIMESTAMP NULL DEFAULT NULL,
  `created` TIMESTAMP NULL DEFAULT NULL,
  `notes` CHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`recipe_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cookbook.tag
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cookbook`.`tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` CHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
