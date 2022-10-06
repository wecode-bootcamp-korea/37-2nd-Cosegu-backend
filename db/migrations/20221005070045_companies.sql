-- migrate:up
CREATE TABLE companies(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE companies;
