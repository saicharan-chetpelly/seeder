CREATE TABLE IF NOT EXISTS `seeder`.`user` (
   `id` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `seeder`.`userFundDashboard` (
    `id` INT NOT NULL,
     `available_credit` DECIMAL NULL,
     `max_interest_rate` DECIMAL NULL,
      `term_length` INT NULL,
     `user_id` INT NOT NULL,
    PRIMARY KEY (`id`, `user_id`),
    INDEX `fk_userFundDashboard_user1_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_userFundDashboard_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `seeder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;