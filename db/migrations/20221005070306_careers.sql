-- migrate:up
CREATE TABLE careers(
    id INT NOT NULL AUTO_INCREMENT,
    company VARCHAR(200) NOT NULL,
    department VARCHAR(200) NOT NULL,
    position VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type VARCHAR(200) NOT NULL,
    work VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE careers;
