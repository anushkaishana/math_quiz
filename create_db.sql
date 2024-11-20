CREATE DATABASE IF NOT EXISTS quiz_app;

USE quiz_app;

CREATE TABLE IF NOT EXISTS questions (
    -- auto incrementing unique id
    id INT AUTO_INCREMENT PRIMARY KEY, 
    -- quiz id, based on quiz type
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,            
    options JSON NOT NULL,             
    answer INT NOT NULL               
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level INT DEFAULT 1,
    -- deletes it if parent row is deleted
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'quiz_app_user'@'localhost' IDENTIFIED BY 'localpassword12';
GRANT ALL PRIVILEGES ON quiz_app.* TO 'quiz_app_user'@'localhost';
FLUSH PRIVILEGES;



-- References
-- https://www.geeksforgeeks.org/mysql-deleting-rows-when-there-is-a-foreign-key/ : for deleting when foregin keys 