CREATE TABLE reserve (
    id INT AUTO_INCREMENT,
    cafeteria VARCHAR(20) NOT NULL,
    menu VARCHAR(20) NOT NULL,
    time VARCHAR(100),
    complete VARCHAR(20),
    user_id VARCHAR(20),
    price VARCHAR(20),
    image_src VARCHAR(255),
    PRIMARY KEY (id)
);