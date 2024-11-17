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


CREATE USER IF NOT EXISTS 'quiz_app_user'@'localhost' IDENTIFIED BY 'localpassword12';
GRANT ALL PRIVILEGES ON quiz_app.* TO 'quiz_app_user'@'localhost';
FLUSH PRIVILEGES;
