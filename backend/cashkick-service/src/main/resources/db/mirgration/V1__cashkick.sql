CREATE TABLE IF NOT EXISTS `seeder`.`cashkick` (
    `id` INT NOT NULL,
     `name` VARCHAR(45) NULL,
    `maturity_date` DATETIME NULL,
    `total_financed` DECIMAL NULL,
    `status` ENUM("Pending") NULL,
    `total_received` DECIMAL NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`, `user_id`),
    INDEX `fk_cashkick_user1_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_cashkick_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `seeder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `seeder`.`contractCashkickMap` (
      `id` INT NOT NULL,
      `cashkick_id` INT NOT NULL,
      `contract_id` INT NOT NULL,
     PRIMARY KEY (`id`, `cashkick_id`, `contract_id`),
    INDEX `fk_contractCashkickMap_cashkick1_idx` (`cashkick_id` ASC) VISIBLE,
    INDEX `fk_contractCashkickMap_contract1_idx` (`contract_id` ASC) VISIBLE,
    CONSTRAINT `fk_contractCashkickMap_cashkick1`
    FOREIGN KEY (`cashkick_id`)
    REFERENCES `seeder`.`cashkick` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_contractCashkickMap_contract1`
    FOREIGN KEY (`contract_id`)
    REFERENCES `seeder`.`contract` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;
