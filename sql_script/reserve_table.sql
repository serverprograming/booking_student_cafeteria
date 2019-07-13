CREATE TABLE reserve (
    id INT AUTO_INCREMENT,
    cafeteria VARCHAR(20) NOT NULL,
    menu VARCHAR(20) NOT NULL,
    time VARCHAR(20),
    complete VARCHAR(20),
	user_id VARCHAR(20),
    PRIMARY KEY (id)
);