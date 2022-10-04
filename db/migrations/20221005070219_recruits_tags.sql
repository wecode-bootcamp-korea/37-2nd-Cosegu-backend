-- migrate:up
CREATE TABLE recruits_tags(
    id INT NOT NULL AUTO_INCREMENT,
    recruit_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (recruit_id) REFERENCES recruits (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id)
);

-- migrate:down
DROP TABLE recruits_tags;
