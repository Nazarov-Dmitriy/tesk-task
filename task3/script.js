CREATE TABLE Test (
    id int IDENTITY (1, 1) PRIMARY KEY,
    city  VARCHAR(100) NOT NULL,
    workshop  INT NOT NULL,
    employees INT NOT NULL,
    FOREIGN KEY (workshop) REFERENCES Workshop (id_workshop)
    FOREIGN KEY (employees) REFERENCES Employees (id_employees)
);

CREATE TABLE Workshop (
    id int IDENTITY(1, 1) NOT NULL,
    id_workshop INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Employees (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    id_employees INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    workshop VARCHAR(255) NOT NULL
);




INSERT INTO  Workshop(id ,id_workshop, name) VALUES (1,1,'Цех 1');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (2,1,'Цех 2');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (3,1,'Цех 3');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (4,2,'Цех 4');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (5,2,'Цех 5');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (6,2,'Цех 6');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (7,3,'Цех 7');
INSERT INTO  Workshop(id ,id_workshop, name) VALUES (8,3,'Цех 8');

INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (1 ,1,'Васильев', 1);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (2 ,1,'Доценко', 2);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (3 ,1,'Бакулин', 3);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (4 ,1,'Камаров', 3);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (5 ,2,'Ерофеев', 4);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (6 ,2,'Жадан', 5);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (7 ,2,'Джонсон', 5);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (8 ,2,'Аксаков', 6);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (9 ,3,'Морозов', 7);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (10 ,3,'Барнс', 7);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (11 ,3,'Калугин', 8);
INSERT INTO  Employees(id, id_employees, name, workshop) VALUES (12 ,3,'Богомолов', 8);


INSERT INTO Test(id , city, workshop, employees ) VALUES (1 ,'Москва', 1 , 1 );
INSERT INTO Test(id , city, workshop, employees ) VALUES (2 ,'Санк Петербург', 2 , 2 );
INSERT INTO Test(id , city, workshop, employees ) VALUES (3 ,'Самара', 3 , 3 );




