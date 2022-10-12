-- migrate:up
CREATE TABLE questions(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(2000) NOT NULL,
    content VARCHAR(3000) NOT NULL,
<<<<<<< HEAD
    file_url VARCHAR(1000), 
    user_id VARCHAR(200) NOT NULL,
=======
    file_url VARCHAR(1000),
    user_id INT NOT NULL,
>>>>>>> b5c5684 ([ADD] recruit 기능 구현)
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE questions;
