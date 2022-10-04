-- migrate:up
CREATE TABLE frequently_asked_questions(
    id INT NOT NULL AUTO_INCREMENT,
    question VARCHAR(2000) NOT NULL,
    answer VARCHAR(3000) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE frequently_asked_questions;
