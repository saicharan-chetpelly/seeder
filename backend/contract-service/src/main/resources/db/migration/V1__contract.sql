CREATE TABLE IF NOT EXISTS `seeder`.`contract` (
     `id` INT NOT NULL,
     `name` VARCHAR(45) NULL,
    `type` ENUM("Monthly") NULL,
    `rate_of_interest` DECIMAL NULL,
    `installment` DECIMAL NULL,
    `term_length` INT NULL,
    `total_avilable` DECIMAL NULL,
    `total_financed` DECIMAL NULL,
    `status` ENUM("Available") NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;