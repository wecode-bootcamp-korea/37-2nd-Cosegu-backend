-- migrate:up
ALTER TABLE recruits
ADD COLUMN division VARCHAR(100) NOT NULL,
ADD COLUMN region VARCHAR(100) NOT NULL,
ADD COLUMN employment_type VARCHAR(100) NOT NULL

-- migrate:down
DROP TABLE recruits
