USE quiz_app;

-- addition quiz
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(1, 'What is 3 + 3?', '["5", "6", "7", "8"]', 1),
(1, 'What is 4 + 5?', '["6", "7", "8", "9"]', 3),
(1, 'What is 10 + 12?', '["20", "21", "22", "23"]', 2),
(1, 'What is 7 + 8?', '["14", "15", "16", "17"]', 1),
(1, 'What is 15 + 20?', '["30", "35", "40", "45"]', 1);

-- subtraction
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(2, 'What is 10 - 3?', '["5", "6", "7", "8"]', 2),
(2, 'What is 20 - 7?', '["12", "13", "14", "15"]', 1),
(2, 'What is 50 - 25?', '["20", "22", "24", "25"]', 3),
(2, 'What is 100 - 45?', '["50", "55", "60", "65"]', 1),
(2, 'What is 80 - 30?', '["45", "50", "55", "60"]', 3);

-- multipilication
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(3, 'What is 4 * 4?', '["12", "14", "16", "18"]', 2),
(3, 'What is 3 * 5?', '["10", "12", "15", "18"]', 2),
(3, 'What is 7 * 6?', '["42", "44", "46", "48"]', 0),
(3, 'What is 9 * 8?', '["72", "74", "76", "78"]', 0),
(3, 'What is 12 * 12?', '["120", "122", "144", "164"]', 2);

-- division
INSERT INTO questions (quiz_id, question, options, answer) VALUES
(4, 'What is 20 / 4?', '["3", "4", "5", "6"]', 2),
(4, 'What is 18 / 3?', '["5", "6", "7", "8"]', 1),
(4, 'What is 50 / 5?', '["9", "10", "11", "12"]', 1),
(4, 'What is 100 / 25?', '["2", "3", "4", "5"]', 2),
(4, 'What is 45 / 9?', '["3", "4", "5", "6"]', 2);
