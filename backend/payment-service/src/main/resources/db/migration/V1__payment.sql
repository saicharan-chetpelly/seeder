CREATE TABLE IF NOT EXISTS `seeder`.`payment` (
    `id` INT NOT NULL,
     `due_date` DATETIME NULL,
      `status` ENUM("Upcoming") NULL,
    `expected_amount` DECIMAL NULL,
    `outstanding_amount` DECIMAL NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`, `user_id`),
    INDEX `fk_payment_user_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_payment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `seeder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;