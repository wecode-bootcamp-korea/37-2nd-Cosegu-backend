-- migrate:up
CREATE TABLE talent_pools(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    attachment varchar(2000) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE talent_pools;
