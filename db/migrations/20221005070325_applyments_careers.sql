-- migrate:up
CREATE TABLE applyments_careers(
    id INT NOT NULL AUTO_INCREMENT,
    career_id INT NOT NULL,
    applyment_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (career_id) REFERENCES careers (id),
    FOREIGN KEY (applyment_id) REFERENCES applyments (id)
);

-- migrate:down
DROP TABLE applyments_careers;
