-- migrate:up
CREATE TABLE recruits(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(2000) NULL,
    main_business VARCHAR(2000) NULL,
    qualification VARCHAR(2000) NULL,
    preferential_treatment VARCHAR(2000) NULL,
    category_id INT NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (company_id) REFERENCES companies (id)
);

-- migrate:down
DROP TABLE recruits;
