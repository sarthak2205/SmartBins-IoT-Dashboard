-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2023 at 08:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartbins`
--

-- --------------------------------------------------------

--
-- Table structure for table `bagcolors`
--

CREATE TABLE `bagcolors` (
  `Color ID` int(11) NOT NULL,
  `Color Name` varchar(32) NOT NULL,
  `Code` varchar(16) NOT NULL,
  `Hospital_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bagcolors`
--

INSERT INTO `bagcolors` (`Color ID`, `Color Name`, `Code`, `Hospital_ID`) VALUES
(1, 'Yellow', '111', 1),
(2, 'Blue', '112', 1),
(3, 'Red', '113', 1),
(4, 'White', '114', 1),
(5, 'Yellow', '111', 2);

-- --------------------------------------------------------

--
-- Table structure for table `bagdetails`
--

CREATE TABLE `bagdetails` (
  `ID` int(11) NOT NULL,
  `Hospital_ID` int(11) NOT NULL,
  `Color ID` int(11) NOT NULL,
  `Number of Bags` int(3) NOT NULL,
  `Weight of Bags` int(3) NOT NULL,
  `Driver ID` int(16) NOT NULL,
  `Vehicle ID` int(16) NOT NULL,
  `Bags Picked` int(3) DEFAULT NULL,
  `Weight Picked` int(3) DEFAULT NULL,
  `Pick up DateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bagdetails`
--

INSERT INTO `bagdetails` (`ID`, `Hospital_ID`, `Color ID`, `Number of Bags`, `Weight of Bags`, `Driver ID`, `Vehicle ID`, `Bags Picked`, `Weight Picked`, `Pick up DateTime`) VALUES
(5, 1, 1, 6, 9, 1, 2, NULL, NULL, '2023-08-24 19:25:47'),
(6, 1, 2, 7, 7, 1, 2, NULL, NULL, '2023-08-24 19:25:47'),
(7, 1, 3, 4, 15, 1, 2, NULL, NULL, '2023-08-24 19:25:47'),
(8, 1, 4, 9, 9, 1, 2, NULL, NULL, '2023-08-24 19:25:47'),
(9, 2, 1, 8, 10, 1, 2, NULL, NULL, '2023-08-24 19:36:16'),
(10, 2, 2, 7, 11, 1, 2, NULL, NULL, '2023-08-24 19:36:16'),
(11, 2, 3, 6, 18, 1, 2, NULL, NULL, '2023-08-24 19:36:16'),
(12, 2, 4, 5, 6, 1, 2, NULL, NULL, '2023-08-24 19:36:16'),
(13, 2, 1, 6, 11, 1, 1, NULL, NULL, '2023-08-26 21:24:44'),
(14, 2, 2, 11, 12, 1, 1, NULL, NULL, '2023-08-26 21:24:44'),
(15, 2, 3, 8, 24, 1, 1, NULL, NULL, '2023-08-26 21:24:44'),
(16, 2, 4, 4, 10, 1, 1, NULL, NULL, '2023-08-26 21:24:44'),
(17, 1, 1, 8, 8, 1, 1, NULL, NULL, '2023-08-27 14:51:08'),
(18, 1, 2, 5, 5, 1, 1, NULL, NULL, '2023-08-27 14:51:08'),
(19, 1, 3, 9, 22, 1, 1, NULL, NULL, '2023-08-27 14:51:08'),
(20, 1, 4, 8, 9, 1, 1, NULL, NULL, '2023-08-27 14:51:08'),
(21, 1, 1, 8, 12, 1, 1, NULL, NULL, '2023-08-31 15:25:30'),
(22, 1, 2, 6, 8, 1, 1, NULL, NULL, '2023-08-31 15:25:30'),
(23, 1, 3, 8, 24, 1, 1, NULL, NULL, '2023-08-31 15:25:30'),
(24, 1, 4, 5, 10, 1, 1, NULL, NULL, '2023-08-31 15:25:30'),
(25, 1, 1, 6, 24, 1, 1, NULL, NULL, '2023-09-04 18:03:06'),
(26, 1, 2, 5, 13, 1, 1, NULL, NULL, '2023-09-04 18:03:06'),
(27, 1, 3, 8, 31, 1, 1, NULL, NULL, '2023-09-04 18:03:06'),
(28, 1, 4, 6, 20, 1, 1, NULL, NULL, '2023-09-04 18:03:06'),
(29, 1, 1, 11, 21, 2, 1, NULL, NULL, '2023-09-06 00:43:14'),
(30, 1, 2, 7, 15, 2, 1, NULL, NULL, '2023-09-06 00:43:14'),
(31, 1, 3, 9, 27, 2, 1, NULL, NULL, '2023-09-06 00:43:14'),
(32, 1, 4, 7, 14, 2, 1, NULL, NULL, '2023-09-06 00:43:14'),
(33, 1, 1, 3, 8, 1, 1, NULL, NULL, '2023-09-06 01:33:24'),
(34, 1, 2, 8, 7, 1, 1, NULL, NULL, '2023-09-06 01:33:24'),
(35, 1, 3, 5, 13, 1, 1, NULL, NULL, '2023-09-06 01:33:24'),
(36, 1, 4, 7, 7, 1, 1, NULL, NULL, '2023-09-06 01:33:24'),
(37, 1, 1, 9, 3, 1, 1, NULL, NULL, '2023-09-07 00:35:50'),
(38, 1, 2, 8, 10, 1, 1, NULL, NULL, '2023-09-07 00:35:50'),
(39, 1, 3, 9, 21, 1, 1, NULL, NULL, '2023-09-07 00:35:50'),
(40, 1, 4, 9, 9, 1, 1, NULL, NULL, '2023-09-07 00:35:50'),
(41, 1, 1, 9, 16, 2, 2, NULL, NULL, '2023-09-08 09:18:29'),
(42, 1, 2, 7, 8, 2, 2, NULL, NULL, '2023-09-08 09:18:29'),
(43, 1, 3, 9, 20, 2, 2, NULL, NULL, '2023-09-08 09:18:29'),
(44, 1, 4, 5, 6, 2, 2, NULL, NULL, '2023-09-08 09:18:29'),
(45, 1, 1, 6, 20, 1, 2, NULL, NULL, '2023-09-10 16:19:57'),
(46, 1, 2, 11, 22, 1, 2, NULL, NULL, '2023-09-10 16:19:57'),
(47, 1, 3, 20, 30, 1, 2, NULL, NULL, '2023-09-10 16:19:57'),
(48, 1, 4, 10, 23, 1, 2, NULL, NULL, '2023-09-10 16:19:57'),
(49, 1, 1, 6, 24, 2, 1, NULL, NULL, '2023-09-18 12:49:11'),
(50, 1, 2, 8, 18, 2, 1, NULL, NULL, '2023-09-18 12:49:11'),
(51, 1, 3, 12, 25, 2, 1, NULL, NULL, '2023-09-18 12:49:11'),
(52, 1, 4, 7, 8, 2, 1, NULL, NULL, '2023-09-18 12:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `bindetails`
--

CREATE TABLE `bindetails` (
  `Bin ID` int(11) NOT NULL,
  `Device ID` varchar(256) DEFAULT NULL,
  `Hospital_ID` int(11) NOT NULL,
  `Color ID` int(11) DEFAULT NULL,
  `Location` varchar(128) NOT NULL,
  `Sensor 1` tinyint(1) NOT NULL DEFAULT 0,
  `Sensor 2` tinyint(1) NOT NULL DEFAULT 0,
  `Status` tinyint(1) DEFAULT 0,
  `Updated` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bindetails`
--

INSERT INTO `bindetails` (`Bin ID`, `Device ID`, `Hospital_ID`, `Color ID`, `Location`, `Sensor 1`, `Sensor 2`, `Status`, `Updated`) VALUES
(1, '070d01c4-44d7-4a4c-aa6a-2a90188cc758', 1, 1, 'Room 1, Building A, ABC Complex, XYZ Hospital', 0, 0, 0, '16:53:50'),
(6, 'q5DSRV5zhg5HJCvwc36eRm', 1, 3, 'Room 1, Building A, Vidyasagar Hospital.', 0, 0, 0, '09:17:32');

-- --------------------------------------------------------

--
-- Table structure for table `driverbagdetails`
--

CREATE TABLE `driverbagdetails` (
  `ID` int(11) NOT NULL,
  `Hospital ID` int(11) NOT NULL,
  `Color ID` int(3) NOT NULL,
  `Bags Picked` int(11) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Pick up DateTime` date DEFAULT current_timestamp(),
  `Driver ID` int(11) NOT NULL,
  `Vehicle ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driverbagdetails`
--

INSERT INTO `driverbagdetails` (`ID`, `Hospital ID`, `Color ID`, `Bags Picked`, `Weight`, `Pick up DateTime`, `Driver ID`, `Vehicle ID`) VALUES
(1, 1, 1, 10, 20, '2023-09-11', 1, 1),
(2, 1, 1, 10, 50, '2023-09-11', 1, 1),
(3, 2, 2, 5, 30, '2023-09-11', 1, 1),
(4, 1, 3, 8, 40, '2023-09-11', 1, 1),
(5, 2, 4, 3, 20, '2023-09-11', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `driverdetails`
--

CREATE TABLE `driverdetails` (
  `Driver ID` int(11) NOT NULL,
  `Driver Name` varchar(64) NOT NULL,
  `License Number` varchar(32) NOT NULL,
  `Contact Number` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driverdetails`
--

INSERT INTO `driverdetails` (`Driver ID`, `Driver Name`, `License Number`, `Contact Number`) VALUES
(1, 'Anuj Sharma', '65410062', 9685214750),
(2, 'Raj Yadav', 'WB412582202', 7006532448);

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Address` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`ID`, `Name`, `Address`) VALUES
(1, 'Vidyasagar Hospital', '4, Brahmo Samaj Rd, Vidyasagar Park, Behala, Kolkata, West Bengal 700034'),
(2, 'Ruby General Hospital', '576, Anandapur Main Rd, Golpark, Sector I, Kasba, Kolkata, West Bengal 700107');

-- --------------------------------------------------------

--
-- Table structure for table `login_master`
--

CREATE TABLE `login_master` (
  `ID` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `Full_Name` varchar(32) NOT NULL,
  `Hospital_ID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_master`
--

INSERT INTO `login_master` (`ID`, `username`, `password`, `Full_Name`, `Hospital_ID`) VALUES
(1, 'sarthakEY', '$2a$04$cyE5.BNhBn0YDZ.6v2NMLek2Cgknls.NZ7nigXfmDSKJW09V811o6', 'Sarthak Nirmal', 1),
(2, 'Ruby', '$2a$04$12t4cHzwBgcHs5whtlE7xOFpuBHeyAeS6AvjJJrzyANxcD11xkZqS', 'Ashok Sharma', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vehicledetails`
--

CREATE TABLE `vehicledetails` (
  `Vehicle ID` int(11) NOT NULL,
  `Plate Number` varchar(32) NOT NULL,
  `Vehicle Name` varchar(32) DEFAULT NULL,
  `Facility_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicledetails`
--

INSERT INTO `vehicledetails` (`Vehicle ID`, `Plate Number`, `Vehicle Name`, `Facility_ID`) VALUES
(1, 'WB19G6856', 'Tempo', 1),
(2, 'WB19G6859', 'Truck', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_log`
--

CREATE TABLE `vehicle_log` (
  `id` int(11) NOT NULL,
  `Driver ID` int(11) NOT NULL,
  `vehicle` int(11) NOT NULL,
  `start time` datetime NOT NULL DEFAULT current_timestamp(),
  `end time` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_log`
--

INSERT INTO `vehicle_log` (`id`, `Driver ID`, `vehicle`, `start time`, `end time`, `status`) VALUES
(2, 1, 1, '2023-09-12 16:26:36', NULL, 1),
(3, 1, 1, '2023-09-12 16:27:23', NULL, 1),
(4, 1, 1, '2023-09-12 16:33:46', NULL, 1),
(5, 2, 1, '2023-09-12 16:33:58', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_login`
--

CREATE TABLE `vehicle_login` (
  `id` int(11) NOT NULL,
  `username` varchar(12) NOT NULL,
  `password` varchar(64) NOT NULL,
  `Vehicle ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_login`
--

INSERT INTO `vehicle_login` (`id`, `username`, `password`, `Vehicle ID`) VALUES
(1, '6856', '$2a$04$s6KIeRMe9VOJV0L/fZwwZOcNTjRP0zLCk6aavsSqEf/mz.n9q1N1G', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bagcolors`
--
ALTER TABLE `bagcolors`
  ADD PRIMARY KEY (`Color ID`),
  ADD KEY `BagColor_Hospital_Relation` (`Hospital_ID`);

--
-- Indexes for table `bagdetails`
--
ALTER TABLE `bagdetails`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Color_FK_Constraint` (`Color ID`),
  ADD KEY `Driver_FK_Constraint` (`Driver ID`),
  ADD KEY `Vehicle-FK-constraint` (`Vehicle ID`),
  ADD KEY `Hospital_bags-FK-Constraint` (`Hospital_ID`);

--
-- Indexes for table `bindetails`
--
ALTER TABLE `bindetails`
  ADD PRIMARY KEY (`Bin ID`),
  ADD KEY `Hospital_FK_BIN_CONSTRAINT` (`Hospital_ID`),
  ADD KEY `Color-BIN_FK_CONSTRAINT` (`Color ID`);

--
-- Indexes for table `driverbagdetails`
--
ALTER TABLE `driverbagdetails`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Driver_pickup_Color_FK` (`Color ID`),
  ADD KEY `Driver_pickup_Driver_FK` (`Driver ID`),
  ADD KEY `Driver_pickup_vehicles_FK` (`Vehicle ID`),
  ADD KEY `Hospital_pickup_FK` (`Hospital ID`);

--
-- Indexes for table `driverdetails`
--
ALTER TABLE `driverdetails`
  ADD PRIMARY KEY (`Driver ID`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `login_master`
--
ALTER TABLE `login_master`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Hospital_FK-Constraint` (`Hospital_ID`);

--
-- Indexes for table `vehicledetails`
--
ALTER TABLE `vehicledetails`
  ADD PRIMARY KEY (`Vehicle ID`);

--
-- Indexes for table `vehicle_log`
--
ALTER TABLE `vehicle_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_login_driver_fk` (`vehicle`),
  ADD KEY `driver_login_FK_Constraint` (`Driver ID`);

--
-- Indexes for table `vehicle_login`
--
ALTER TABLE `vehicle_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Vehicle_Login_FK` (`Vehicle ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bagcolors`
--
ALTER TABLE `bagcolors`
  MODIFY `Color ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bagdetails`
--
ALTER TABLE `bagdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `bindetails`
--
ALTER TABLE `bindetails`
  MODIFY `Bin ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `driverbagdetails`
--
ALTER TABLE `driverbagdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `driverdetails`
--
ALTER TABLE `driverdetails`
  MODIFY `Driver ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_master`
--
ALTER TABLE `login_master`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicledetails`
--
ALTER TABLE `vehicledetails`
  MODIFY `Vehicle ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicle_log`
--
ALTER TABLE `vehicle_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicle_login`
--
ALTER TABLE `vehicle_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bagcolors`
--
ALTER TABLE `bagcolors`
  ADD CONSTRAINT `BagColor_Hospital_Relation` FOREIGN KEY (`Hospital_ID`) REFERENCES `bagcolors` (`Color ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bagdetails`
--
ALTER TABLE `bagdetails`
  ADD CONSTRAINT `Color_FK_Constraint` FOREIGN KEY (`Color ID`) REFERENCES `bagcolors` (`Color ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Driver_FK_Constraint` FOREIGN KEY (`Driver ID`) REFERENCES `driverdetails` (`Driver ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Hospital_bags-FK-Constraint` FOREIGN KEY (`Hospital_ID`) REFERENCES `hospitals` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Vehicle-FK-constraint` FOREIGN KEY (`Vehicle ID`) REFERENCES `vehicledetails` (`Vehicle ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bindetails`
--
ALTER TABLE `bindetails`
  ADD CONSTRAINT `Color-BIN_FK_CONSTRAINT` FOREIGN KEY (`Color ID`) REFERENCES `bagcolors` (`Color ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Hospital_FK_BIN_CONSTRAINT` FOREIGN KEY (`Hospital_ID`) REFERENCES `hospitals` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `driverbagdetails`
--
ALTER TABLE `driverbagdetails`
  ADD CONSTRAINT `Driver_pickup_Color_FK` FOREIGN KEY (`Color ID`) REFERENCES `bagcolors` (`Color ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Driver_pickup_Driver_FK` FOREIGN KEY (`Driver ID`) REFERENCES `driverdetails` (`Driver ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Driver_pickup_vehicles_FK` FOREIGN KEY (`Vehicle ID`) REFERENCES `vehicledetails` (`Vehicle ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Hospital_pickup_FK` FOREIGN KEY (`Hospital ID`) REFERENCES `hospitals` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_master`
--
ALTER TABLE `login_master`
  ADD CONSTRAINT `Hospital_FK-Constraint` FOREIGN KEY (`Hospital_ID`) REFERENCES `hospitals` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicle_log`
--
ALTER TABLE `vehicle_log`
  ADD CONSTRAINT `driver_login_FK_Constraint` FOREIGN KEY (`Driver ID`) REFERENCES `driverdetails` (`Driver ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicle_login_driver_fk` FOREIGN KEY (`vehicle`) REFERENCES `vehicledetails` (`Vehicle ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicle_login`
--
ALTER TABLE `vehicle_login`
  ADD CONSTRAINT `Vehicle_Login_FK` FOREIGN KEY (`Vehicle ID`) REFERENCES `vehicledetails` (`Vehicle ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
