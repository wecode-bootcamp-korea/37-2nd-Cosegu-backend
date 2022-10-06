-- migrate:up
CREATE TABLE applyment_forms(
    id INT NOT NULL AUTO_INCREMENT,
    applyment_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    value VARCHAR(2000) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (applyment_id) REFERENCES applyments (id)
);

-- migrate:down
DROP TABLE applyment_forms;
