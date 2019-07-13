CREATE TABLE member (
    id VARCHAR(20) NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(20),
    manager VARCHAR(255),
    PRIMARY KEY (id)
);