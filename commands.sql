Task 13.2

$ heroku run psql -h <host-of-postgres-addon> -p 5432 -U <username> <dbname> -a <app-name>

username=> \d
username=> CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
username=> \d
username=> \d blogs
username=> select * from blogs;
username=> insert into blogs (author, url, title) values ('Aku Ankka', '/ankka', 'Kuinka nukkua sikeasti');
username=> insert into blogs (author, url, title) values ('Mikki Hiiri', '/hiiri', 'Salapoliisin tyokalut');
username=> select * from blogs;

