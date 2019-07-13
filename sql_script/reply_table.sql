CREATE TABLE reply (
    id INT AUTO_INCREMENT,
    cafeteria VARCHAR(20) NOT NULL,
    menu VARCHAR(20) NOT NULL,
    nickname VARCHAR(20),
    content VARCHAR(255),
    star VARCHAR(20),
    PRIMARY KEY (id)
);