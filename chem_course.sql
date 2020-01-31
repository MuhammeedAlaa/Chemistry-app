-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2020 at 01:15 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+02:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chem_course`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE DATABASE chem_course;

use chem_course;

CREATE TABLE `admin` (
  `admin_id` varchar(20) NOT NULL,
  `password` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `assistant`
--

CREATE TABLE `assistant` (
  `assistant_id` int(11) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `assistant_code` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `admin_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `exam_num` int(11) NOT NULL,
  `lecture_num` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `assistant_id` int(11) NOT NULL,
  `student_code` int(11) NOT NULL,
  `Attended` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `center`
--

CREATE TABLE `center` (
  `center_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL UNIQUE,
  `admin_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `exam_num` int(11) NOT NULL,
  `lecture_num` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `fullmark` int(11) NOT NULL,
  `admin_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `exam_grades`
--

CREATE TABLE `exam_grades` (
  `exam_num` int(11) NOT NULL,
  `lecture_num` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `assistant_id` int(11) NOT NULL,
  `student_code` int(11) NOT NULL,
  `grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lecture`
--

CREATE TABLE `lecture` (
  `lecture_num` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lec_timetable`
--

CREATE TABLE `lec_timetable` (
  `center_name` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `day` DATE NOT NULL,
  `hour` TIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_code` int(11) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `parent_phone` varchar(255) DEFAULT NULL,
  `black_point` int(11) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `assistant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `assistant`
--
ALTER TABLE `assistant`
  ADD PRIMARY KEY (`assistant_id`),
  ADD KEY `fname` (`fname`) USING BTREE,
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`exam_num`,`lecture_num`,`center_name`,`course_id`,`assistant_id`,`student_code`),
  ADD KEY `student_code` (`student_code`) USING BTREE,
  ADD KEY `lecture_num` (`lecture_num`),
  ADD KEY `center_name` (`center_name`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `assistant_id` (`assistant_id`);

--
-- Indexes for table `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`center_name`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_name` (`course_name`) USING BTREE,
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`exam_num`,`lecture_num`,`center_name`,`course_id`),
  ADD KEY `exam_num` (`exam_num`) USING BTREE,
  ADD KEY `lecture_num` (`lecture_num`),
  ADD KEY `center_name` (`center_name`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `exam_grades`
--
ALTER TABLE `exam_grades`
  ADD PRIMARY KEY (`exam_num`,`lecture_num`,`center_name`,`course_id`,`assistant_id`,`student_code`),
  ADD KEY `student_code` (`student_code`) USING BTREE,
  ADD KEY `lecture_num` (`lecture_num`),
  ADD KEY `center_name` (`center_name`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `assistant_id` (`assistant_id`);

--
-- Indexes for table `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`lecture_num`,`center_name`,`course_id`),
  ADD KEY `lecture_num` (`lecture_num`) USING BTREE,
  ADD KEY `center_name` (`center_name`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `lec_timetable`
--
ALTER TABLE `lec_timetable`
  ADD PRIMARY KEY (`center_name`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_code`),
  ADD KEY `fname` (`fname`) USING BTREE,
  ADD KEY `assistant_id` (`assistant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assistant`
--
ALTER TABLE `assistant`
  MODIFY `assistant_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `exam_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecture`
--
ALTER TABLE `lecture`
  MODIFY `lecture_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assistant`
--
ALTER TABLE `assistant`
  ADD CONSTRAINT `assistant_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`exam_num`) REFERENCES `exam` (`exam_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`lecture_num`) REFERENCES `lecture` (`lecture_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`center_name`) REFERENCES `center` (`center_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_5` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_6` FOREIGN KEY (`student_code`) REFERENCES `student` (`student_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`lecture_num`) REFERENCES `lecture` (`lecture_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_ibfk_2` FOREIGN KEY (`center_name`) REFERENCES `center` (`center_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exam_grades`
--
ALTER TABLE `exam_grades`
  ADD CONSTRAINT `exam_grades_ibfk_1` FOREIGN KEY (`exam_num`) REFERENCES `exam` (`exam_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_grades_ibfk_2` FOREIGN KEY (`lecture_num`) REFERENCES `lecture` (`lecture_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_grades_ibfk_3` FOREIGN KEY (`center_name`) REFERENCES `center` (`center_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_grades_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_grades_ibfk_5` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_grades_ibfk_6` FOREIGN KEY (`student_code`) REFERENCES `student` (`student_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lecture`
--
ALTER TABLE `lecture`
  ADD CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`center_name`) REFERENCES `center` (`center_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lec_timetable`
--
ALTER TABLE `lec_timetable`
  ADD CONSTRAINT `lec_timetable_ibfk_1` FOREIGN KEY (`center_name`) REFERENCES `center` (`center_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lec_timetable_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
