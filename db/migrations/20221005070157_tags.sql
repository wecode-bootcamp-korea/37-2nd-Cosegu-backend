-- migrate:up
CREATE TABLE tags(
    id INT NOT NULL AUTO_INCREMENT,
    tag_type_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_type_id) REFERENCES tag_types (id)
);

-- migrate:down
DROP TABLE tags;
