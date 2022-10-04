-- migrate:up
CREATE TABLE applyments(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    recruit_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (recruit_id) REFERENCES recruits (id)
);

-- migrate:down
DROP TABLE applyments;
