-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 30, 2026 at 07:31 AM
-- Server version: 10.5.29-MariaDB
-- PHP Version: 8.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pourmilk`
--
CREATE DATABASE IF NOT EXISTS `pourmilk` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pourmilk`;

-- --------------------------------------------------------

--
-- Table structure for table `boiling`
--

CREATE TABLE `boiling` (
  `id` int(11) NOT NULL,
  `datetime` datetime DEFAULT current_timestamp(),
  `product_id` int(11) DEFAULT NULL,
  `volume` decimal(10,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Boiling'),
(2, 'Packaging'),
(3, 'Separation'),
(4, 'Administration');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birth` date DEFAULT NULL,
  `employed` date DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `birth`, `employed`, `department_id`) VALUES
(1, 'Matti Virtanen', '1985-05-12', '2010-03-01', 1),
(2, 'Antti Korhonen', '1992-11-20', '2018-06-15', 1),
(3, 'Eeva Laitinen', '1998-02-05', '2024-01-10', 1),
(4, 'Pekka Nieminen', '1978-08-30', '2005-10-20', 2),
(5, 'Sari Mäkinen', '1990-04-14', '2015-09-01', 2),
(6, 'Jarkko Peltonen', '2001-12-25', '2023-05-20', 2),
(7, 'Heikki Koskinen', '1982-03-22', '2012-11-15', 3),
(8, 'Liisa Heikkinen', '1995-07-08', '2020-02-01', 3),
(9, 'Ville Järvinen', '1988-01-17', '2014-08-12', 3),
(10, 'Ihmiskunnan Keisari', '2000-01-01', '2000-01-01', 4);

-- --------------------------------------------------------

--
-- Table structure for table `packaging`
--

CREATE TABLE `packaging` (
  `id` int(11) NOT NULL,
  `datetime` datetime DEFAULT current_timestamp(),
  `product_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `line` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `unit_id`) VALUES
(1, 'Raw Milk', 1),
(2, 'Skimmed Milk', 1),
(3, 'Cream 35%', 1),
(4, 'Strawberry Yogurt', 1),
(5, 'Natural Yogurt', 1),
(6, 'Quark', 2),
(7, 'Butter', 2),
(8, 'Yogurt 200g Cup', 3),
(9, 'Milk 1L Carton', 3),
(10, 'Whey', 1);

-- --------------------------------------------------------

--
-- Table structure for table `separation`
--

CREATE TABLE `separation` (
  `id` int(11) NOT NULL,
  `datetime` datetime DEFAULT current_timestamp(),
  `product_id` int(11) DEFAULT NULL,
  `volume` decimal(10,2) DEFAULT NULL,
  `fat` decimal(5,2) DEFAULT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `abbr` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `abbr`) VALUES
(1, 'Liter', 'l'),
(2, 'Kilogram', 'kg'),
(3, 'Piece', 'pcs'),
(4, 'Percentage', '%'),
(5, 'Celsius', '°C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boiling`
--
ALTER TABLE `boiling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `packaging`
--
ALTER TABLE `packaging`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `separation`
--
ALTER TABLE `separation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boiling`
--
ALTER TABLE `boiling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `packaging`
--
ALTER TABLE `packaging`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `separation`
--
ALTER TABLE `separation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boiling`
--
ALTER TABLE `boiling`
  ADD CONSTRAINT `boiling_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `boiling_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `packaging`
--
ALTER TABLE `packaging`
  ADD CONSTRAINT `packaging_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `packaging_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

--
-- Constraints for table `separation`
--
ALTER TABLE `separation`
  ADD CONSTRAINT `separation_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `separation_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
