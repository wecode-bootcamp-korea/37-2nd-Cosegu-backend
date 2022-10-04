-- migrate:up
CREATE TABLE supports(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE supports;
