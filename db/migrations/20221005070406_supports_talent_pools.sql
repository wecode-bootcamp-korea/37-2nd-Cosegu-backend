-- migrate:up
CREATE TABLE supports_talent_pools(
    id INT NOT NULL AUTO_INCREMENT,
    support_id INT NOT NULL,
    talent_pool_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (support_id) REFERENCES supports (id),
    FOREIGN KEY (talent_pool_id) REFERENCES talent_pools (id)
);

-- migrate:down
DROP TABLE supports_talent_pools;
