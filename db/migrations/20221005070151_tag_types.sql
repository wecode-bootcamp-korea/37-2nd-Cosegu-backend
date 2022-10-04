-- migrate:up
CREATE TABLE tag_types(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE tag_types;
