-- migrate:up
CREATE TABLE questions(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(2000) NOT NULL,
    content VARCHAR(3000) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE questions;
