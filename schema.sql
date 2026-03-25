-- Создание таблиц справочников
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbr VARCHAR(20) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_id INT,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

-- Таблица сотрудников с данными для анализа квалификации
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth DATE,
    employed DATE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Таблица варки (Keitto)
CREATE TABLE boiling (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_id INT,
    volume DECIMAL(10, 2),
    duration INT, -- в минутах
    temperature DECIMAL(5, 2),
    employee_id INT,
    notes TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Таблица упаковки (Pakkaamo)
CREATE TABLE packaging (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_id INT,
    count INT,
    line INT,
    weight INT, -- в граммах или кг
    employee_id INT,
    notes TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Таблица сепарирования (Separointi)
CREATE TABLE separation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_id INT, -- сырье/продукт
    volume DECIMAL(10, 2),
    fat DECIMAL(5, 2),
    temperature DECIMAL(5, 2),
    equipment_id INT, -- номер сепаратора
    employee_id INT,
    notes TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);