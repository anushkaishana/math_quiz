USE quiz_app;

-- addition quiz
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(1, 'What is 3 + 3?', '["5", "6", "7", "8"]', 1),
(1, 'What is 4 + 5?', '["6", "7", "8", "9"]', 3),
(1, 'What is 10 + 12?', '["20", "21", "22", "23"]', 2),
(1, 'What is 7 + 8?', '["14", "15", "16", "17"]', 1),
(1, 'What is 15 + 20?', '["30", "35", "40", "45"]', 1),
(1, 'What is 25 + 30?', '["50", "55", "60", "65"]', 1),
(1, 'What is 13 + 17?', '["28", "30", "32", "35"]', 1),
(1, 'What is 40 + 25?', '["60", "65", "70", "75"]', 1);

-- subtraction
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(2, 'What is 10 - 3?', '["5", "6", "7", "8"]', 2),
(2, 'What is 20 - 7?', '["12", "13", "14", "15"]', 1),
(2, 'What is 50 - 25?', '["20", "22", "24", "25"]', 3),
(2, 'What is 100 - 45?', '["50", "55", "60", "65"]', 1),
(2, 'What is 80 - 30?', '["45", "50", "55", "60"]', 1),
(2, 'What is 60 - 25?', '["30", "35", "40", "45"]', 1),
(2, 'What is 90 - 50?', '["40", "45", "50", "55"]', 0),
(2, 'What is 30 - 15?', '["10", "15", "14", "16"]', 1);

-- multipilication
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(3, 'What is 4 * 4?', '["12", "14", "16", "18"]', 2),
(3, 'What is 3 * 5?', '["10", "12", "15", "18"]', 2),
(3, 'What is 7 * 6?', '["42", "44", "46", "48"]', 0),
(3, 'What is 9 * 8?', '["72", "74", "76", "78"]', 0),
(3, 'What is 12 * 12?', '["120", "122", "144", "164"]', 2),
(3, 'What is 6 * 7?', '["38", "42", "45", "48"]', 1),
(3, 'What is 8 * 9?', '["72", "76", "80", "84"]', 0),
(3, 'What is 5 * 15?', '["50", "60", "70", "75"]', 3);

-- division
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(4, 'What is 20 / 4?', '["3", "4", "5", "6"]', 2),
(4, 'What is 18 / 3?', '["5", "6", "7", "8"]', 1),
(4, 'What is 50 / 5?', '["9", "10", "11", "12"]', 1),
(4, 'What is 100 / 25?', '["2", "3", "4", "5"]', 2),
(4, 'What is 45 / 9?', '["3", "4", "5", "6"]', 2),
(4, 'What is 60 / 6?', '["9", "10", "11", "12"]', 1),
(4, 'What is 72 / 8?', '["8", "9", "10", "11"]', 1),
(4, 'What is 30 / 5?', '["5", "6", "7", "8"]', 1);

-- geometry quiz
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(5, 'What is the perimeter of a square with side length 4?', '["8", "12", "16", "20"]', 2),
(5, 'What is the area of a rectangle with length 6 and width 3?', '["12", "15", "18", "20"]', 2),
(5, 'What is the area of a circle with radius 5?', '["25π", "10π", "15π", "20π"]', 0),
(5, 'What is the volume of a cube with side length 4?', '["16", "24", "36", "64"]', 3),
(5, 'What is the circumference of a circle with radius 7?', '["14π", "21π", "28π", "35π"]', 0),
(5, 'What is the area of a triangle with base 6 and height 4?', '["12", "15", "18", "24"]', 0),
(5, 'What is the surface area of a sphere with radius 3?', '["36π", "27π", "18π", "9π"]', 0),
(5, 'What is the area of a parallelogram with base 5 and height 6?', '["30", "35", "40", "45"]', 0);

-- time quiz
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(6, 'How many seconds are in 2 minutes?', '["30", "60", "120", "180"]', 2),
(6, 'How many hours are in 3 days?', '["48", "60", "72", "96"]', 2),
(6, 'How many minutes are in 4 hours?', '["120", "150", "180", "240"]', 3),
(6, 'How many seconds are in 1 hour?', '["3600", "5400", "7200", "10800"]', 0),
(6, 'How many days are in 2 weeks?', '["7", "10", "14", "20"]', 2),
(6, 'What is the next minute after 59 minutes?', '["1 minute", "60 minutes", "60 seconds", "1 hour"]', 3),
(6, 'How many weeks are in a year?', '["52", "53", "54", "56"]', 0),
(6, 'What is the total number of hours in 3 weeks?', '["336", "300", "350", "400"]', 0);

-- algebra quiz level 1
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(7, 'What is x if 2x = 10?', '["2", "3", "5", "7"]', 2),
(7, 'What is x if x + 5 = 10?', '["3", "4", "5", "6"]', 1),
(7, 'What is the value of x in 3x - 4 = 11?', '["4", "5", "6", "7"]', 2),
(7, 'Solve for x: 5x + 2 = 17', '["3", "4", "5", "6"]', 0),
(7, 'What is the value of x in 2x + 3 = 11?', '["3", "4", "5", "6"]', 0),
(7, 'What is the solution to 4x + 8 = 24?', '["4", "5", "6", "7"]', 2),
(7, 'If x + y = 10 and x = 4, what is y?', '["4", "5", "6", "7"]', 2),
(7, 'Solve for x: 6x = 36', '["5", "6", "7", "8"]', 1);

-- algebra quiz level 2
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(8, 'What is the value of x in 5x + 3 = 23?', '["3", "4s", "5", "6"]', 2),
(8, 'Solve for x: 2x - 5 = 13', '["8", "9", "7", "6"]', 3),
(8, 'What is the solution to 3x + 4 = 19?', '["4", "5", "6", "7"]', 2),
(8, 'Solve for x: 4x - 7 = 9', '["4", "5", "3", "2"]', 0),
(8, 'If 3x + 5 = 17, what is x?', '["3", "4", "5", "6"]', 1),
(8, 'Solve for x: 2x + 6 = 18', '["5", "6", "7", "8"]', 1),
(8, 'What is x if 4x + 5 = 21?', '["4", "5", "6", "7"]', 2),
(8, 'Solve for x: 2(x + 3) = 16', '["5", "6", "4", "7"]', 2);
