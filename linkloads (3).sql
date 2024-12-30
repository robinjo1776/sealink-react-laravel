-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2024 at 05:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `linkloads`
--

-- --------------------------------------------------------

--
-- Table structure for table `carriers`
--

CREATE TABLE `carriers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dba` varchar(255) DEFAULT NULL,
  `legal_name` varchar(255) DEFAULT NULL,
  `remit_name` varchar(255) DEFAULT NULL,
  `acc_no` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `fed_id_no` varchar(255) DEFAULT NULL,
  `pref_curr` varchar(10) DEFAULT NULL,
  `pay_terms` varchar(255) DEFAULT NULL,
  `form_1099` tinyint(1) NOT NULL DEFAULT 0,
  `advertise` tinyint(1) NOT NULL DEFAULT 0,
  `advertise_email` varchar(255) DEFAULT NULL,
  `carr_type` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `brok_carr_aggmt` varchar(255) DEFAULT NULL,
  `docket_no` varchar(255) DEFAULT NULL,
  `dot_number` varchar(255) DEFAULT NULL,
  `wcb_no` varchar(255) DEFAULT NULL,
  `ca_bond_no` varchar(255) DEFAULT NULL,
  `us_bond_no` varchar(255) DEFAULT NULL,
  `scac` varchar(255) DEFAULT NULL,
  `csa_approved` tinyint(1) NOT NULL DEFAULT 0,
  `hazmat` tinyint(1) NOT NULL DEFAULT 0,
  `smsc_code` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `li_provider` varchar(255) DEFAULT NULL,
  `li_policy_no` varchar(255) DEFAULT NULL,
  `li_coverage` decimal(15,2) DEFAULT NULL,
  `li_start_date` date DEFAULT NULL,
  `li_end_date` date DEFAULT NULL,
  `ci_provider` varchar(255) DEFAULT NULL,
  `ci_policy_no` varchar(255) DEFAULT NULL,
  `ci_coverage` decimal(15,2) DEFAULT NULL,
  `ci_start_date` date DEFAULT NULL,
  `ci_end_date` date DEFAULT NULL,
  `coi_cert` varchar(255) DEFAULT NULL,
  `primary_address` varchar(255) DEFAULT NULL,
  `primary_city` varchar(255) DEFAULT NULL,
  `primary_state` varchar(255) DEFAULT NULL,
  `primary_country` varchar(255) DEFAULT NULL,
  `primary_postal` varchar(255) DEFAULT NULL,
  `primary_phone` varchar(255) DEFAULT NULL,
  `mailing_address` varchar(255) DEFAULT NULL,
  `mailing_city` varchar(255) DEFAULT NULL,
  `mailing_state` varchar(255) DEFAULT NULL,
  `mailing_country` varchar(255) DEFAULT NULL,
  `mailing_postal` varchar(255) DEFAULT NULL,
  `mailing_phone` varchar(255) DEFAULT NULL,
  `int_notes` text DEFAULT NULL,
  `contact` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`contact`)),
  `equipment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipment`)),
  `lane` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`lane`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `carrier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cust_name` varchar(255) DEFAULT NULL,
  `cust_type` varchar(255) DEFAULT NULL,
  `cust_ref_no` varchar(255) DEFAULT NULL,
  `cust_website` varchar(255) DEFAULT NULL,
  `cust_email` varchar(255) DEFAULT NULL,
  `cust_contact_no` varchar(255) DEFAULT NULL,
  `cust_contact_no_ext` varchar(255) DEFAULT NULL,
  `cust_tax_id` varchar(255) DEFAULT NULL,
  `cust_primary_address` varchar(255) DEFAULT NULL,
  `cust_primary_city` varchar(255) DEFAULT NULL,
  `cust_primary_state` varchar(255) DEFAULT NULL,
  `cust_primary_country` varchar(255) DEFAULT NULL,
  `cust_primary_postal` varchar(255) DEFAULT NULL,
  `cust_primary_unit_no` int(11) DEFAULT NULL,
  `cust_mailing_address` varchar(255) DEFAULT NULL,
  `cust_mailing_city` varchar(255) DEFAULT NULL,
  `cust_mailing_state` varchar(255) DEFAULT NULL,
  `cust_mailing_country` varchar(255) DEFAULT NULL,
  `cust_mailing_postal` varchar(255) DEFAULT NULL,
  `cust_mailing_unit_no` int(11) DEFAULT NULL,
  `cust_ap_name` varchar(255) DEFAULT NULL,
  `cust_ap_address` varchar(255) DEFAULT NULL,
  `cust_ap_city` varchar(255) DEFAULT NULL,
  `cust_ap_state` varchar(255) DEFAULT NULL,
  `cust_ap_country` varchar(255) DEFAULT NULL,
  `cust_ap_postal` varchar(255) DEFAULT NULL,
  `cust_ap_unit_no` int(11) DEFAULT NULL,
  `cust_ap_email` varchar(255) DEFAULT NULL,
  `cust_ap_phone` varchar(255) DEFAULT NULL,
  `cust_ap_phone_ext` varchar(255) DEFAULT NULL,
  `cust_ap_fax` varchar(255) DEFAULT NULL,
  `cust_broker_name` varchar(255) DEFAULT NULL,
  `cust_bkp_notes` varchar(255) DEFAULT NULL,
  `cust_bkspl_notes` text DEFAULT NULL,
  `cust_credit_status` varchar(255) DEFAULT NULL,
  `cust_credit_mop` varchar(255) DEFAULT NULL,
  `cust_credit_appd` date DEFAULT NULL,
  `cust_credit_expd` date DEFAULT NULL,
  `cust_credit_terms` varchar(255) DEFAULT NULL,
  `cust_credit_limit` varchar(255) DEFAULT NULL,
  `cust_credit_notes` varchar(255) DEFAULT NULL,
  `cust_credit_application` tinyint(1) DEFAULT NULL,
  `cust_credit_currency` varchar(255) DEFAULT NULL,
  `cust_sbk_agreement` varchar(255) DEFAULT NULL,
  `cust_credit_agreement` varchar(255) DEFAULT NULL,
  `cust_contact` longtext DEFAULT NULL,
  `cust_equipment` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `cust_name`, `cust_type`, `cust_ref_no`, `cust_website`, `cust_email`, `cust_contact_no`, `cust_contact_no_ext`, `cust_tax_id`, `cust_primary_address`, `cust_primary_city`, `cust_primary_state`, `cust_primary_country`, `cust_primary_postal`, `cust_primary_unit_no`, `cust_mailing_address`, `cust_mailing_city`, `cust_mailing_state`, `cust_mailing_country`, `cust_mailing_postal`, `cust_mailing_unit_no`, `cust_ap_name`, `cust_ap_address`, `cust_ap_city`, `cust_ap_state`, `cust_ap_country`, `cust_ap_postal`, `cust_ap_unit_no`, `cust_ap_email`, `cust_ap_phone`, `cust_ap_phone_ext`, `cust_ap_fax`, `cust_broker_name`, `cust_bkp_notes`, `cust_bkspl_notes`, `cust_credit_status`, `cust_credit_mop`, `cust_credit_appd`, `cust_credit_expd`, `cust_credit_terms`, `cust_credit_limit`, `cust_credit_notes`, `cust_credit_application`, `cust_credit_currency`, `cust_sbk_agreement`, `cust_credit_agreement`, `cust_contact`, `cust_equipment`, `created_at`, `updated_at`) VALUES
(1, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(7, 'Rajesh', 'Distributor', '46446467', 'www.ffrg.com', 'rajesh@gmail.com', 'on', '209', 'JN 6756', '30 Greenwich Avenue', 'New York', 'New York', 'United States', '10011', NULL, '8', NULL, NULL, NULL, NULL, NULL, NULL, '90 Feet Road', 'Patna', 'Bihar', 'India', NULL, NULL, NULL, NULL, NULL, NULL, 'Broker 2', 'good', 'hgjg', 'Not Approved', 'Wire Transfer', '2024-12-03', '2025-01-03', '39', '7', 'fhjfhj', 1, 'USD', 'http://127.0.0.1:8000/storage/uploads/VKobKSy3BoCpXLdU0z3oELwmLV9vCpObFAzMo2qx.pdf', 'http://127.0.0.1:8000/storage/uploads/Vqr9npXj8Vk1OjFFWEzpQXKMCBRlbvxm73s8TESS.pdf', '[]', '[]', '2024-11-21 22:31:55', '2024-12-06 01:13:38'),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-12-25 22:05:34', '2024-12-25 22:05:34'),
(9, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(10, 'Rajesh', 'Distributor', '46446467', 'www.ffrg.com', 'rajesh@gmail.com', 'on', '209', 'JN 6756', '30 Greenwich Avenue', 'New York', 'New York', 'United States', '10011', NULL, '8', NULL, NULL, NULL, NULL, NULL, NULL, '90 Feet Road', 'Patna', 'Bihar', 'India', NULL, NULL, NULL, NULL, NULL, NULL, 'Broker 2', 'good', 'hgjg', 'Not Approved', 'Wire Transfer', '2024-12-03', '2025-01-03', '39', '7', 'fhjfhj', 1, 'USD', 'http://127.0.0.1:8000/storage/uploads/VKobKSy3BoCpXLdU0z3oELwmLV9vCpObFAzMo2qx.pdf', 'http://127.0.0.1:8000/storage/uploads/Vqr9npXj8Vk1OjFFWEzpQXKMCBRlbvxm73s8TESS.pdf', '[]', '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(11, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(12, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(13, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(14, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(15, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(16, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(17, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(18, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(19, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(20, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(21, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(22, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(23, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(24, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(25, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(26, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(27, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(28, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(29, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(30, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(31, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(32, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(33, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(34, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(35, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(36, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(37, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(38, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(39, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(40, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(41, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(42, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(43, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(44, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(45, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(46, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(47, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(48, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(49, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(50, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(51, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(52, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(53, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(54, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(55, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(56, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(57, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(58, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(59, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(60, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(61, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(62, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(63, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(64, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(65, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(66, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(67, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(68, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(69, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(70, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(71, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(72, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(73, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(74, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(75, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(76, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(77, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(78, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(79, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(80, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(81, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(82, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(83, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(84, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20');
INSERT INTO `customers` (`id`, `cust_name`, `cust_type`, `cust_ref_no`, `cust_website`, `cust_email`, `cust_contact_no`, `cust_contact_no_ext`, `cust_tax_id`, `cust_primary_address`, `cust_primary_city`, `cust_primary_state`, `cust_primary_country`, `cust_primary_postal`, `cust_primary_unit_no`, `cust_mailing_address`, `cust_mailing_city`, `cust_mailing_state`, `cust_mailing_country`, `cust_mailing_postal`, `cust_mailing_unit_no`, `cust_ap_name`, `cust_ap_address`, `cust_ap_city`, `cust_ap_state`, `cust_ap_country`, `cust_ap_postal`, `cust_ap_unit_no`, `cust_ap_email`, `cust_ap_phone`, `cust_ap_phone_ext`, `cust_ap_fax`, `cust_broker_name`, `cust_bkp_notes`, `cust_bkspl_notes`, `cust_credit_status`, `cust_credit_mop`, `cust_credit_appd`, `cust_credit_expd`, `cust_credit_terms`, `cust_credit_limit`, `cust_credit_notes`, `cust_credit_application`, `cust_credit_currency`, `cust_sbk_agreement`, `cust_credit_agreement`, `cust_contact`, `cust_equipment`, `created_at`, `updated_at`) VALUES
(85, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(86, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(87, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(88, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(89, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(90, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(91, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(92, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(93, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(94, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(95, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(96, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(97, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(98, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(99, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(100, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(101, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(102, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(103, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(104, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(105, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(106, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(107, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20'),
(108, 'Robin Joseph', 'Retailer', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Drive', 'Toronto', 'Ontario', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, '[]', '2024-09-23 04:17:43', '2024-12-06 05:33:20');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lead_no` int(11) NOT NULL,
  `lead_date` date NOT NULL,
  `follow_up_date` date DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `equipment_type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `unit_no` int(11) DEFAULT NULL,
  `lead_type` varchar(255) NOT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `lead_status` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `contacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`contacts`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_to` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `lead_no`, `lead_date`, `follow_up_date`, `customer_name`, `phone`, `email`, `website`, `equipment_type`, `address`, `city`, `state`, `country`, `postal_code`, `unit_no`, `lead_type`, `contact_person`, `lead_status`, `notes`, `contacts`, `created_at`, `updated_at`, `assigned_to`) VALUES
(6, 4242, '2024-09-16', NULL, 'gfdgdf', 234423423423, 'grgrgre@gsfgs.com', 'http://www.rondesantis.com', 'Triaxle', '490', 'Ottawa', 'Ontario', 'Canada', 'K1N 1G8', 33, 'CA', 'gregr', 'Carrier portal registration', 'grrg', '[{\"name\":\"gfdgd\",\"contact_no\":\"423423423423\",\"email\":\"dfbddg@gmail.com\"}]', '2024-09-15 04:57:47', '2024-09-15 04:57:47', NULL),
(16, 544, '2024-09-08', '2024-10-22', 'Walinker', 3653635635, 'gjkk@kol.com', 'www.jiklo.com', 'Reefer', '377', 'Ottawa', 'Ontario', 'Canada', 'K2P 2M2', NULL, 'ON', 'fre', 'Different Department', 'fgdgdf', '[]', '2024-09-15 05:09:03', '2024-10-21 06:15:06', NULL),
(18, 663, '2024-09-14', NULL, 'Xavier', 8575765333, 'xavier@gmail.com', 'www.xavier.com', 'Maxi', '3rd Street Promenade, Santa Monica, CA 90401, USA', 'Santa Monica', 'California', 'United States', '90401', 3, 'BDS', 'Ivy', 'Prospect customer', 'Tory', '[]', '2024-09-15 05:34:14', '2024-11-29 01:42:24', NULL),
(23, 35642, '2024-10-19', '2024-10-30', 'Bell', 5345345345, 'bell@gmail.com', 'www.fred.com', 'Maxi', '400 Michigan Ave, Chicago, IL 60605, USA', 'Chicago', 'Illinois', 'United States', '60605', 400, 'TBAB', 'Gregory Smith', 'Fob/Have broker', 'fgfhfh', '[]', '2024-10-19 01:09:09', '2024-11-19 09:48:04', NULL),
(27, 6783, '2024-10-21', '2024-11-01', 'Eglington', 7664674474, 'eglington@gmail.com', 'www.eglington.com', 'Maxi', '2nd Ave, New York, NY, USA', 'New York', 'New York', 'United States', NULL, 2, 'CA', 'Van', 'Different Department', 'gfger', '[]', '2024-10-21 03:00:50', '2024-11-19 09:47:56', NULL),
(28, 7763, '2024-11-17', '2024-11-21', 'Aiden', 905887533, 'dan@gmail.com', 'www.kol.com', 'Flatbed', '5th Ave, Grace Park West, Caloocan, Metro Manila, Philippines', 'Caloocan', 'Metro Manila', 'Philippines', NULL, 34, 'BDS', 'sam', 'Lanes discussed', 'hjjg', '[]', '2024-11-17 08:44:54', '2024-12-01 23:07:24', NULL),
(30, 4032, '2024-11-18', '2024-12-05', 'Julian', 8587858578, 'jul@gmail.com', 'www.julian.com', 'Flatbed', '6th Road', 'Rawalpindi', 'Punjab', 'Pakistan', 'C1414', 9, 'MB', 'Robin', 'No answer/Callback/Voicemail', 'hjhgjh', '[{\"name\":\"Kasturba\",\"phone\":\"8848748486\",\"email\":\"kas@gmail.com\"}]', '2024-11-17 23:22:50', '2024-12-01 23:23:50', NULL),
(31, 6762, '2024-11-22', '2024-12-05', 'Benjamin', 9087554747, 'benjamin@gmail.com', 'www.benjamin.com', 'Maxi', '38 Oxley Rd, Singapore 238629', 'Singapore', 'Singapore', 'Singapore', '238629', 38, 'DPD MAGMA', 'Russell', 'Quotations', 'vdvd', '[{\"name\":\"Jill\",\"phone\":\"7667747467\",\"email\":\"jill43@gmail.com\"}]', '2024-11-21 20:30:09', '2024-12-02 21:56:59', NULL),
(32, 32678, '2024-12-02', '2024-12-18', 'Panket', 9085686866, 'pankit@gmail.com', 'www.pankit.com', 'Reefer', 'Birlik, 365 AVM, 06610 Çankaya/Ankara, Türkiye', 'Ankara', 'Ankara', 'Türkiye', '06610', 35, 'ON', 'Biplov', 'Quotations', 'vvsf', '[]', '2024-12-01 20:37:31', '2024-12-05 22:31:06', NULL),
(33, 507, '2024-12-04', '2024-12-25', 'Oswald', 9045674356, 'oswaldgracious@gmail.com', 'www.oswald.com', 'Reefer', '300 Landsberger Allee', 'Berlin', 'Berlin', 'Germany', '13055', NULL, 'ON', 'Home', 'Product/Equipment discussed', 'nhgng', '[{\"name\":\"Howley\",\"phone\":\"8789384942\",\"email\":\"howley@gmail.com\"}]', '2024-12-03 20:38:44', '2024-12-03 20:39:00', NULL),
(34, 3290, '2024-12-06', '2024-12-19', 'Erin', 4950868635, 'erinjade@gmail.com', 'www.erinjade.com', 'Maxi', '671 Lincoln Avenue', 'Winnetka', 'Illinois', 'United States', '60093', NULL, 'MB', 'Ivan', 'E-mail sent to concerned person', 'hhrthrt', '[{\"name\":\"Rubel Hossain\",\"phone\":\"79695353\",\"email\":\"ruelhossain@gmail.com\"}]', '2024-12-05 22:28:25', '2024-12-05 22:28:47', NULL),
(35, 4560, '2024-12-16', '2025-01-09', 'Ronak Kapadia', 5607567565, 'ronak@gmail.com', NULL, 'Flatbed', '48 Calle de San Vicente Ferrer', 'Madrid', 'Comunidad de Madrid', 'Spain', '28004', NULL, 'BDS', NULL, 'Asset based only', NULL, '[]', '2024-12-15 22:49:18', '2024-12-15 22:49:18', NULL),
(36, 9087, '2024-12-16', '2025-01-02', 'Sealink', 886864433, 'shanemcmohan@gmail.com', 'www.fred.com', 'Triaxle', '48 Calle de San Vicente Ferrer', 'Madrid', 'Comunidad de Madrid', 'Spain', '28004', NULL, 'CA', NULL, 'Not interested reason provided in notes', NULL, '[]', '2024-12-16 00:09:45', '2024-12-16 00:09:45', NULL),
(37, 2390, '2024-12-16', '2025-01-08', 'Robin Joseph', 4379713752, 'robinjo1776@gmail.com', NULL, 'Triaxle', '66', 'Toronto, Ontario, Canada', 'ON', 'Canada', 'M1M 2G7', 66, 'CA', 'Zain', 'E-mail sent to concerned person', 'hfhf', '[]', '2024-12-16 00:10:49', '2024-12-16 00:10:49', NULL),
(38, 2345, '2024-12-20', '2024-12-25', 'John Doe Enterprises', 1234567890, 'contact@johndoe.com', 'https://www.johndoe.com', 'Forklift', '123 Business St.', 'New York', 'NY', 'USA', '10001', 101, 'New Business', 'Jane Smith', 'Open', 'Interested in renting forklifts for 6 months.', NULL, '2024-12-17 22:57:01', '2024-12-17 22:57:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lead_follow_up`
--

CREATE TABLE `lead_follow_up` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lead_status` varchar(255) NOT NULL,
  `next_follow_up_date` date NOT NULL,
  `remarks` text DEFAULT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `lead_no` varchar(255) NOT NULL,
  `lead_date` date NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `unit_no` varchar(255) DEFAULT NULL,
  `lead_type` varchar(255) NOT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `contacts` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `products` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_follow_up`
--

INSERT INTO `lead_follow_up` (`id`, `lead_status`, `next_follow_up_date`, `remarks`, `equipment`, `lead_no`, `lead_date`, `customer_name`, `phone`, `email`, `address`, `city`, `state`, `country`, `postal_code`, `unit_no`, `lead_type`, `contact_person`, `notes`, `contacts`, `created_at`, `updated_at`, `products`) VALUES
(14, 'New', '2024-11-28', 'fghgfhf', 'Reefer', '9889', '2024-11-17', 'Brendon', '8877764644', 'brendon@gmail.com', '425 Park Ave, New York, NY 10022, USA', 'New York', 'New York', 'United States', '10022', '425', 'Good', 'Ben', 'hgfhf', '[]', '2024-11-17 08:55:25', '2024-11-17 08:55:25', '[]'),
(15, 'Completed', '2024-12-04', 'ghjjg', 'Flatbed', '345', '2024-11-18', 'Ryan', '90775675757', 'ryangosling@gmail.com', '7th Ave, New York, NY, USA', 'New York', 'New York', 'United States', 'M2J 3Z7', '7', 'hjgj', 'jhg', 'jghjhg', '[]', '2024-11-17 20:47:24', '2024-11-17 20:47:24', '[]'),
(16, 'On Hold', '2024-12-04', 'jhjgj', 'Maxi', '909', '2024-11-18', 'Aria', '9886885675', 'rubel@gmail', '4K Chowrangi, Sector 5 D New Karachi Town, Karachi, Karachi City, Sindh, Pakistan', 'Karachi', 'Sindh', 'Pakistan', '775544', '7', 'jhjghjgh', 'jghjghj', 'jhgjhgjg', '[]', '2024-11-17 20:51:18', '2024-11-17 20:51:18', '[]'),
(17, 'Lost', '2024-11-29', 'vgvgf', 'Triaxle', '789', '2024-11-18', 'Queeny', '9804840383', 'queen@gmail.com', 'Av. Córdoba 5160, C1414BAW Cdad. Autónoma de Buenos Aires, Argentina', 'Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Argentina', 'C1414', '5', 'Urgent', 'Ashley', 'gfv', '[]', '2024-11-17 23:25:58', '2024-11-17 23:25:58', '[]'),
(18, 'New', '2024-11-27', 'hngh', 'Roll tite', '6752', '2024-11-18', 'Shane Watson', '908858755', 'shane@gmail.com', '3rd Street Promenade, Santa Monica, CA 90401, USA', 'Santa Monica', 'California', 'United States', '90401', '3', 'bh', 'bghb', 'jhjg', '[{\"name\":\"Hugo\",\"phone\":\"8587585855\",\"email\":\"hugo@gmail.com\"}]', '2024-11-17 23:58:37', '2024-11-19 01:47:50', '[]'),
(19, 'Completed', '2024-12-06', NULL, 'Triaxle', '9885', '2024-11-21', 'Brendon', '8877764644', 'brendon@gmail.com', '425 Park Ave, New York, NY 10022, USA', 'New York', 'New York', 'United States', '10022', '425', 'Good', 'Ben', 'mjmjhm', '[]', '2024-11-20 22:06:01', '2024-11-20 22:06:01', '[]'),
(21, 'On Hold', '2024-11-27', 'fssdfsd', 'Btrain', '5643', '2024-11-21', 'Ariana', '576757567567', 'ariel@gmail.com', '3', 'New York', 'New York', 'United States', '10022', '425', 'Good', 'Ben', 'fsdfsd', '[]', '2024-11-20 22:23:40', '2024-11-20 22:23:40', '[]'),
(22, 'Completed', '2024-12-06', 'vfdvfd', 'Flatbed', '795', '2024-11-21', 'Greg Chapell', '9085765755', 'greg@gmail.com', '4', 'Calgary', 'Ontario', 'Canada', 'M2J 3Z7', '4', 'vfdvfd', 'vfd', 'vfv', '[]', '2024-11-20 22:40:36', '2024-11-20 22:40:36', '[]'),
(23, 'Completed', '2024-12-05', 'fdfsd', 'Triaxle', '603', '2024-11-21', 'Samuel Jones', '90847466242', 'sam64@gmail.com', '4K Chowrangi, Sector 5 D New Karachi Town, Karachi, Karachi City, Sindh, Pakistan', 'Karachi', 'Sindh', 'Pakistan', 'M1M 2G7', '4', 'fsdff', 'fdsf', 'fdsfsd', '[]', '2024-11-21 00:56:36', '2024-11-21 00:56:36', '[]'),
(24, 'In Progress', '2024-12-06', 'frefer', 'Maxi', '32878', '2024-11-22', 'Craig', '9086657655', 'craig34@gmail.com', 'Birlik, 365 AVM, 06610 Çankaya/Ankara, Türkiye', 'Turkey', 'Ankara', 'Türkiye', '06610', '3', 'Good', 'vfvfd', 'frefr', '[{\"name\":\"Alex\",\"phone\":\"877687686786\",\"email\":\"alex34@gmail.com\"}]', '2024-11-21 22:03:03', '2024-12-05 22:29:25', '[]'),
(25, 'On Hold', '2024-12-04', 'vfvdvdf', 'Triaxle', '7890', '2024-11-22', 'Vesley', '9086758333', 'vesley34@gmail.com', '5th Ave, Grace Park West, Caloocan, Metro Manila, Philippines', 'Caloocan', 'Metro Manila', 'Philippines', 'vvdvdf', '44', 'vfdv', 'dfvfdv', 'vfdvfd', '[{\"name\":\"Calinte\",\"phone\":\"9084474242\",\"email\":\"cali34@gmail.com\"}]', '2024-11-21 22:16:35', '2024-12-03 20:40:39', '[]'),
(26, 'New', '2024-12-05', 'vfvvfdv', 'Btrain', '7895', '2024-11-22', 'Terminator', '9085756755', 'terminator305@gmail.com', 'Mahmutbey, 212 İstanbul Power Outlet AVM, 34100 Bağcılar/İstanbul, Türkiye', 'İstanbul', 'İstanbul', 'Türkiye', '34100', '23', 'vsfs', 'vfsvs', 'vfdvfd', '[{\"name\":\"Nukem\",\"phone\":\"9087686424\",\"email\":\"nukem34@gmail.com\"}]', '2024-11-21 22:20:52', '2024-11-21 22:21:06', '[{\"name\":\"Cutter\",\"quantity\":\"3\"}]'),
(27, 'In Progress', '2024-12-04', 'nnhn', 'Triaxle', '7894', '2024-11-22', 'Terminator', '9085756755', 'terminator305@gmail.com', 'Mahmutbey, 212 İstanbul Power Outlet AVM, 34100 Bağcılar/İstanbul, Türkiye', 'İstanbul', 'İstanbul', 'Türkiye', '34100', '23', 'vsfs', 'vfsvs', 'nhng', '[{\"name\":\"Jules\",\"phone\":\"90876577374\",\"email\":\"jules34@gmail.com\"}]', '2024-11-21 22:40:58', '2024-11-21 22:40:58', '[{\"name\":\"Cutter\",\"quantity\":\"3\"}]'),
(29, 'In Progress', '2024-11-27', 'vfvfd', 'Triaxle', '45678', '2024-11-22', 'Terminator', '9085756755', 'terminator305@gmail.com', 'Mahmutbey, 212 İstanbul Power Outlet AVM, 34100 Bağcılar/İstanbul, Türkiye', 'İstanbul', 'İstanbul', 'Türkiye', '34100', '23', 'vsfs', 'vfsvs', 'vfdf', '[{\"name\":\"Jules\",\"phone\":\"90876577374\",\"email\":\"jules34@gmail.com\"}]', '2024-11-21 23:06:16', '2024-11-21 23:06:16', '[{\"name\":\"Cutter\",\"quantity\":\"3\"}]'),
(30, 'In Progress', '2024-11-29', 'njgng', 'Btrain', '676', '2024-11-22', 'Benjamin', '9087554747', 'benjamin@gmail.com', '38 Oxley Rd, Singapore 238629', 'nhg', 'nhg', 'Singapore', '238629', '54', 'ngn', 'ngj', 'njgng', '[{\"name\":\"Jules\",\"phone\":\"90876577374\",\"email\":\"jules34@gmail.com\"}]', '2024-11-21 23:08:34', '2024-11-21 23:08:34', '[{\"name\":\"Cutter\",\"quantity\":\"3\"}]'),
(31, 'In Progress', '2024-12-05', 'hgfh', 'Reefer', '6762', '2024-11-22', 'Benjamin', '9087554747', 'benjamin@gmail.com', '38 Oxley Rd, Singapore 238629', 'nhg', 'nhg', 'Singapore', '238629', '54', 'ngn', 'ngj', 'hgfhgfhf', '[]', '2024-11-27 00:43:00', '2024-12-03 00:17:50', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(19, '2014_10_12_000000_create_users_table', 1),
(20, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(21, '2019_08_19_000000_create_failed_jobs_table', 1),
(22, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(23, '2024_06_07_224940_leads', 1),
(24, '2024_07_01_211925_add_username_to_users_table', 1),
(25, '2024_09_16_235136_create_lead_follow_up_table', 2),
(26, '2024_09_17_144630_create_customers_table', 3),
(29, '2024_09_20_004302_create_customers_table', 4),
(30, '2024_09_21_165312_modify_lead_follow_up_table', 5),
(31, '2024_09_26_003544_create_orders_table', 6),
(32, '2024_10_23_045324_add_role_to_users_table', 7),
(33, '2024_10_23_054846_add_emp_code_to_users_table', 8),
(34, '2024_10_23_063306_update_role_column_in_users_table', 9),
(52, '2024_10_24_112556_add_assigned_to_to_leads_table', 10),
(53, '2024_12_06_044821_modify_cust_credit_application_column_in_customers_table', 10),
(54, '2024_12_11_134428_create_carriers_table', 10),
(55, '2024_12_13_102054_rename_1099_column_in_carriers_table', 10),
(56, '2024_12_17_012429_create_contacts_table', 10),
(57, '2024_12_18_021931_create_shipments_table', 10),
(58, '2024_12_18_080648_create_quotes_table', 10),
(59, '2024_12_21_095724_create_orders_table', 10),
(60, '2024_12_30_063445_create_vendors_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `customer_ref_no` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `booked_by` varchar(255) DEFAULT NULL,
  `account_rep` varchar(255) DEFAULT NULL,
  `sales_rep` varchar(255) DEFAULT NULL,
  `customer_po_no` varchar(255) DEFAULT NULL,
  `commodity` varchar(255) DEFAULT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `load_type` varchar(255) DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `origin_location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`origin_location`)),
  `destination_location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`destination_location`)),
  `hot` tinyint(1) DEFAULT 0,
  `team` tinyint(1) DEFAULT 0,
  `air_ride` tinyint(1) DEFAULT 0,
  `tarp` tinyint(1) DEFAULT 0,
  `hazmat` tinyint(1) DEFAULT 0,
  `currency` varchar(255) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `charges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`charges`)),
  `discounts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`discounts`)),
  `gst` decimal(10,2) DEFAULT NULL,
  `pst` decimal(10,2) DEFAULT NULL,
  `hst` decimal(10,2) DEFAULT NULL,
  `qst` decimal(10,2) DEFAULT NULL,
  `final_price` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer`, `customer_ref_no`, `branch`, `booked_by`, `account_rep`, `sales_rep`, `customer_po_no`, `commodity`, `equipment`, `load_type`, `temperature`, `origin_location`, `destination_location`, `hot`, `team`, `air_ride`, `tarp`, `hazmat`, `currency`, `base_price`, `charges`, `discounts`, `gst`, `pst`, `hst`, `qst`, `final_price`, `notes`, `created_at`, `updated_at`) VALUES
(2, 'John Doe', 'JD1234', 'Branch 1', 'Agent A', 'Rep 1', 'Rep 2', 'PO-789', 'Electronics', 'Van', 'Full Load', 'Ambient', '\"[\\\"City A\\\",\\\"Address 1\\\"]\"', '\"[\\\"City B\\\",\\\"Address 2\\\"]\"', 0, 1, 1, 0, 0, 'USD', 1500.00, '\"[{\\\"name\\\":\\\"Service Fee\\\",\\\"amount\\\":100}]\"', '[{\"name\":\"Seasonal Discount\",\"amount\":50}]', 75.00, 50.00, 25.00, 30.00, 1675.00, 'Handle with care.', '2024-12-25 21:04:00', '2024-12-25 21:04:00'),
(6, 'Customer 1', 'CR0001', 'Branch 3', 'Michael Jordan', 'Kevin Durant', 'Tim Duncan', 'PO-0001', 'Toys', 'Box Truck', 'Full Load', 'Frozen', '[\"City 6, State 19\",\"290 Random St\"]', '[\"City 82, State 67\",\"1913 Random Blvd\"]', 0, 1, 0, 0, 0, 'USD', 4372.70, '[{\"name\":\"Fuel Surcharge\",\"amount\":38.8140097747781}]', '[{\"name\":\"Holiday Discount\",\"amount\":117.28123456282191}]', 90.00, 60.00, 80.00, 55.00, 4259.18, 'Handle with care.', NULL, NULL),
(7, 'Customer 2', 'CR0002', 'Branch 8', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0002', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Ambient', '[\"City 47, State 14\",\"570 Random St\"]', '[\"City 71, State 80\",\"1730 Random Blvd\"]', 1, 0, 1, 0, 0, 'USD', 3557.93, '[{\"name\":\"Fuel Surcharge\",\"amount\":66.73954090265553}]', '[{\"name\":\"Holiday Discount\",\"amount\":76.90279981830282}]', 90.00, 60.00, 80.00, 55.00, 3499.47, 'Fragile items.', NULL, NULL),
(8, 'Customer 3', 'CR0003', 'Branch 2', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0003', 'Electronics', 'Flatbed', 'Full Load', 'Frozen', '[\"City 29, State 13\",\"662 Random St\"]', '[\"City 73, State 77\",\"1284 Random Blvd\"]', 0, 1, 0, 1, 0, 'USD', 1520.01, '[{\"name\":\"Fuel Surcharge\",\"amount\":97.08433928571132}]', '[{\"name\":\"Holiday Discount\",\"amount\":134.46512907885682}]', 90.00, 60.00, 80.00, 55.00, 1381.07, 'Handle with care.', NULL, NULL),
(9, 'Customer 4', 'CR0004', 'Branch 5', 'Michael Jordan', 'Kevin Durant', 'Tim Duncan', 'PO-0004', 'Toys', 'Box Truck', 'Full Load', 'Chilled', '[\"City 11, State 7\",\"140 Random St\"]', '[\"City 94, State 51\",\"1682 Random Blvd\"]', 0, 1, 1, 1, 0, 'USD', 4874.38, '[{\"name\":\"Fuel Surcharge\",\"amount\":67.40764945387545}]', '[{\"name\":\"Holiday Discount\",\"amount\":142.68078098913287}]', 90.00, 60.00, 80.00, 55.00, 4758.24, 'Handle with care.', NULL, NULL),
(10, 'Customer 5', 'CR0005', 'Branch 1', 'Dennis Rodman', 'Kevin Durant', 'Tim Duncan', 'PO-0005', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Frozen', '[\"City 43, State 18\",\"807 Random St\"]', '[\"City 95, State 72\",\"1796 Random Blvd\"]', 0, 0, 1, 1, 0, 'USD', 4826.64, '[{\"name\":\"Fuel Surcharge\",\"amount\":87.70547491197216}]', '[{\"name\":\"Holiday Discount\",\"amount\":74.06447456983932}]', 90.00, 60.00, 80.00, 55.00, 4643.54, 'Handle with care.', NULL, NULL),
(11, 'Customer 6', 'CR0006', 'Branch 5', 'Scottie Pippen', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0006', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Chilled', '[\"City 5, State 41\",\"928 Random St\"]', '[\"City 97, State 63\",\"1670 Random Blvd\"]', 1, 1, 1, 1, 0, 'USD', 4239.52, '[{\"name\":\"Fuel Surcharge\",\"amount\":75.44853934589528}]', '[{\"name\":\"Holiday Discount\",\"amount\":134.15425022768113}]', 90.00, 60.00, 80.00, 55.00, 4063.67, 'Fragile items.', NULL, NULL),
(12, 'Customer 7', 'CR0007', 'Branch 4', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0007', 'Furniture', 'Box Truck', 'Full Load', 'Chilled', '[\"City 44, State 14\",\"813 Random St\"]', '[\"City 92, State 96\",\"1453 Random Blvd\"]', 0, 1, 0, 1, 0, 'USD', 1372.69, '[{\"name\":\"Fuel Surcharge\",\"amount\":57.216678654685005}]', '[{\"name\":\"Holiday Discount\",\"amount\":56.947921525596044}]', 90.00, 60.00, 80.00, 55.00, 1306.31, 'Handle with care.', NULL, NULL),
(13, 'Customer 8', 'CR0008', 'Branch 7', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0008', 'Groceries', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 17, State 36\",\"866 Random St\"]', '[\"City 63, State 88\",\"1020 Random Blvd\"]', 0, 1, 1, 1, 0, 'USD', 4299.78, '[{\"name\":\"Fuel Surcharge\",\"amount\":86.70482486103978}]', '[{\"name\":\"Holiday Discount\",\"amount\":93.28890449611498}]', 90.00, 60.00, 80.00, 55.00, 4156.80, 'Deliver ASAP.', NULL, NULL),
(14, 'Customer 9', 'CR0009', 'Branch 10', 'Michael Jordan', 'Kevin Durant', 'Tim Duncan', 'PO-0009', 'Toys', 'Box Truck', 'Partial Load', 'Ambient', '[\"City 19, State 11\",\"539 Random St\"]', '[\"City 97, State 84\",\"1883 Random Blvd\"]', 1, 1, 1, 0, 1, 'USD', 1094.45, '[{\"name\":\"Fuel Surcharge\",\"amount\":74.1099158769119}]', '[{\"name\":\"Holiday Discount\",\"amount\":82.49850032147147}]', 90.00, 60.00, 80.00, 55.00, 1042.26, 'Fragile items.', NULL, NULL),
(15, 'Customer 10', 'CR0010', 'Branch 1', 'Dennis Rodman', 'LeBron James', 'Shaquille O\'Neal', 'PO-0010', 'Electronics', 'Flatbed', 'Full Load', 'Chilled', '[\"City 49, State 31\",\"684 Random St\"]', '[\"City 64, State 81\",\"1058 Random Blvd\"]', 0, 1, 1, 1, 1, 'USD', 1979.92, '[{\"name\":\"Fuel Surcharge\",\"amount\":63.575608741722675}]', '[{\"name\":\"Holiday Discount\",\"amount\":69.88670795719099}]', 90.00, 60.00, 80.00, 55.00, 1840.23, 'Fragile items.', NULL, NULL),
(16, 'Customer 11', 'CR0011', 'Branch 2', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0011', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Chilled', '[\"City 42, State 39\",\"637 Random St\"]', '[\"City 51, State 57\",\"1722 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 1266.89, '[{\"name\":\"Fuel Surcharge\",\"amount\":66.82902924381062}]', '[{\"name\":\"Holiday Discount\",\"amount\":55.27405543057464}]', 90.00, 60.00, 80.00, 55.00, 1138.37, 'Fragile items.', NULL, NULL),
(17, 'Customer 12', 'CR0012', 'Branch 10', 'Scottie Pippen', 'Kevin Durant', 'Kobe Bryant', 'PO-0012', 'Groceries', 'Flatbed', 'Full Load', 'Frozen', '[\"City 30, State 45\",\"416 Random St\"]', '[\"City 57, State 55\",\"1169 Random Blvd\"]', 0, 0, 0, 0, 0, 'USD', 4247.65, '[{\"name\":\"Fuel Surcharge\",\"amount\":35.17612617209018}]', '[{\"name\":\"Holiday Discount\",\"amount\":70.95837889482468}]', 90.00, 60.00, 80.00, 55.00, 4143.77, 'Deliver ASAP.', NULL, NULL),
(18, 'Customer 13', 'CR0013', 'Branch 5', 'Dennis Rodman', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0013', 'Electronics', 'Refrigerated Truck', 'Partial Load', 'Ambient', '[\"City 42, State 13\",\"336 Random St\"]', '[\"City 89, State 76\",\"1081 Random Blvd\"]', 1, 0, 0, 0, 0, 'USD', 2328.99, '[{\"name\":\"Fuel Surcharge\",\"amount\":33.11684310532721}]', '[{\"name\":\"Holiday Discount\",\"amount\":84.51468683769323}]', 90.00, 60.00, 80.00, 55.00, 2142.46, 'Handle with care.', NULL, NULL),
(19, 'Customer 14', 'CR0014', 'Branch 3', 'Michael Jordan', 'Stephen Curry', 'Tim Duncan', 'PO-0014', 'Furniture', 'Box Truck', 'Full Load', 'Chilled', '[\"City 30, State 12\",\"301 Random St\"]', '[\"City 68, State 92\",\"1905 Random Blvd\"]', 1, 1, 1, 1, 1, 'USD', 3556.54, '[{\"name\":\"Fuel Surcharge\",\"amount\":40.73071246018834}]', '[{\"name\":\"Holiday Discount\",\"amount\":91.40228636167012}]', 90.00, 60.00, 80.00, 55.00, 3421.57, 'Deliver ASAP.', NULL, NULL),
(20, 'Customer 15', 'CR0015', 'Branch 3', 'Scottie Pippen', 'Stephen Curry', 'Tim Duncan', 'PO-0015', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Frozen', '[\"City 2, State 12\",\"634 Random St\"]', '[\"City 51, State 98\",\"1901 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 3511.25, '[{\"name\":\"Fuel Surcharge\",\"amount\":58.885856036868134}]', '[{\"name\":\"Holiday Discount\",\"amount\":148.88304199065738}]', 90.00, 60.00, 80.00, 55.00, 3397.74, 'Deliver ASAP.', NULL, NULL),
(21, 'Customer 16', 'CR0016', 'Branch 9', 'Scottie Pippen', 'Kevin Durant', 'Tim Duncan', 'PO-0016', 'Electronics', 'Flatbed', 'Full Load', 'Ambient', '[\"City 13, State 41\",\"176 Random St\"]', '[\"City 92, State 78\",\"1032 Random Blvd\"]', 0, 1, 1, 0, 0, 'USD', 2304.77, '[{\"name\":\"Fuel Surcharge\",\"amount\":83.62520521754152}]', '[{\"name\":\"Holiday Discount\",\"amount\":87.95132805372766}]', 90.00, 60.00, 80.00, 55.00, 2189.89, 'Handle with care.', NULL, NULL),
(22, 'Customer 17', 'CR0017', 'Branch 5', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0017', 'Furniture', 'Flatbed', 'Full Load', 'Frozen', '[\"City 48, State 19\",\"281 Random St\"]', '[\"City 56, State 73\",\"1883 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 3564.34, '[{\"name\":\"Fuel Surcharge\",\"amount\":67.37734214322222}]', '[{\"name\":\"Holiday Discount\",\"amount\":86.34812319830121}]', 90.00, 60.00, 80.00, 55.00, 3421.36, 'Deliver ASAP.', NULL, NULL),
(23, 'Customer 18', 'CR0018', 'Branch 3', 'Dennis Rodman', 'Stephen Curry', 'Kobe Bryant', 'PO-0018', 'Furniture', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 41, State 3\",\"729 Random St\"]', '[\"City 54, State 62\",\"1847 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 3689.00, '[{\"name\":\"Fuel Surcharge\",\"amount\":77.13902071978089}]', '[{\"name\":\"Holiday Discount\",\"amount\":58.16918575224028}]', 90.00, 60.00, 80.00, 55.00, 3556.37, 'Deliver ASAP.', NULL, NULL),
(24, 'Customer 19', 'CR0019', 'Branch 10', 'Dennis Rodman', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0019', 'Electronics', 'Refrigerated Truck', 'Partial Load', 'Frozen', '[\"City 47, State 13\",\"279 Random St\"]', '[\"City 76, State 87\",\"1566 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 1857.89, '[{\"name\":\"Fuel Surcharge\",\"amount\":57.60888435966022}]', '[{\"name\":\"Holiday Discount\",\"amount\":144.5057016614776}]', 90.00, 60.00, 80.00, 55.00, 1684.31, 'Deliver ASAP.', NULL, NULL),
(25, 'Customer 20', 'CR0020', 'Branch 5', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0020', 'Groceries', 'Box Truck', 'Full Load', 'Chilled', '[\"City 12, State 47\",\"828 Random St\"]', '[\"City 73, State 86\",\"1117 Random Blvd\"]', 0, 0, 1, 1, 1, 'USD', 2093.47, '[{\"name\":\"Fuel Surcharge\",\"amount\":88.12831555763654}]', '[{\"name\":\"Holiday Discount\",\"amount\":90.17267745984893}]', 90.00, 60.00, 80.00, 55.00, 2011.38, 'Deliver ASAP.', NULL, NULL),
(26, 'Customer 21', 'CR0021', 'Branch 10', 'Michael Jordan', 'Kevin Durant', 'Kobe Bryant', 'PO-0021', 'Furniture', 'Box Truck', 'Full Load', 'Ambient', '[\"City 26, State 15\",\"451 Random St\"]', '[\"City 94, State 98\",\"1400 Random Blvd\"]', 1, 0, 1, 1, 0, 'USD', 3966.73, '[{\"name\":\"Fuel Surcharge\",\"amount\":47.688299954045306}]', '[{\"name\":\"Holiday Discount\",\"amount\":59.15665994150626}]', 90.00, 60.00, 80.00, 55.00, 3859.40, 'Deliver ASAP.', NULL, NULL),
(27, 'Customer 22', 'CR0022', 'Branch 10', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0022', 'Furniture', 'Flatbed', 'Full Load', 'Ambient', '[\"City 20, State 36\",\"533 Random St\"]', '[\"City 63, State 58\",\"1469 Random Blvd\"]', 1, 0, 0, 1, 0, 'USD', 3138.57, '[{\"name\":\"Fuel Surcharge\",\"amount\":98.36259040485002}]', '[{\"name\":\"Holiday Discount\",\"amount\":108.09405631934814}]', 90.00, 60.00, 80.00, 55.00, 3034.54, 'Fragile items.', NULL, NULL),
(28, 'Customer 23', 'CR0023', 'Branch 2', 'Scottie Pippen', 'LeBron James', 'Kobe Bryant', 'PO-0023', 'Electronics', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 47, State 34\",\"811 Random St\"]', '[\"City 73, State 83\",\"1699 Random Blvd\"]', 1, 0, 0, 0, 1, 'USD', 3889.15, '[{\"name\":\"Fuel Surcharge\",\"amount\":32.984929809154025}]', '[{\"name\":\"Holiday Discount\",\"amount\":122.09722314821481}]', 90.00, 60.00, 80.00, 55.00, 3692.54, 'Deliver ASAP.', NULL, NULL),
(29, 'Customer 24', 'CR0024', 'Branch 5', 'Michael Jordan', 'Kevin Durant', 'Tim Duncan', 'PO-0024', 'Toys', 'Flatbed', 'Full Load', 'Frozen', '[\"City 49, State 17\",\"656 Random St\"]', '[\"City 61, State 56\",\"1021 Random Blvd\"]', 0, 1, 0, 1, 1, 'USD', 4719.55, '[{\"name\":\"Fuel Surcharge\",\"amount\":92.51513174295675}]', '[{\"name\":\"Holiday Discount\",\"amount\":139.51818176080133}]', 90.00, 60.00, 80.00, 55.00, 4668.35, 'Deliver ASAP.', NULL, NULL),
(30, 'Customer 25', 'CR0025', 'Branch 9', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0025', 'Electronics', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 3, State 19\",\"848 Random St\"]', '[\"City 81, State 100\",\"1305 Random Blvd\"]', 0, 0, 1, 1, 0, 'USD', 2093.95, '[{\"name\":\"Fuel Surcharge\",\"amount\":52.811674800368394}]', '[{\"name\":\"Holiday Discount\",\"amount\":138.02473500905631}]', 90.00, 60.00, 80.00, 55.00, 2027.88, 'Handle with care.', NULL, NULL),
(31, 'Customer 26', 'CR0026', 'Branch 6', 'Dennis Rodman', 'Stephen Curry', 'Tim Duncan', 'PO-0026', 'Groceries', 'Flatbed', 'Full Load', 'Ambient', '[\"City 13, State 48\",\"307 Random St\"]', '[\"City 67, State 83\",\"1215 Random Blvd\"]', 0, 0, 1, 1, 0, 'USD', 2799.96, '[{\"name\":\"Fuel Surcharge\",\"amount\":74.61749071290993}]', '[{\"name\":\"Holiday Discount\",\"amount\":113.40013539448744}]', 90.00, 60.00, 80.00, 55.00, 2626.88, 'Deliver ASAP.', NULL, NULL),
(32, 'Customer 27', 'CR0027', 'Branch 5', 'Dennis Rodman', 'LeBron James', 'Shaquille O\'Neal', 'PO-0027', 'Furniture', 'Box Truck', 'Partial Load', 'Chilled', '[\"City 26, State 6\",\"428 Random St\"]', '[\"City 76, State 64\",\"1568 Random Blvd\"]', 1, 1, 1, 0, 1, 'USD', 4842.68, '[{\"name\":\"Fuel Surcharge\",\"amount\":44.85811547536811}]', '[{\"name\":\"Holiday Discount\",\"amount\":95.35637225490967}]', 90.00, 60.00, 80.00, 55.00, 4775.39, 'Handle with care.', NULL, NULL),
(33, 'Customer 28', 'CR0028', 'Branch 1', 'Michael Jordan', 'LeBron James', 'Kobe Bryant', 'PO-0028', 'Electronics', 'Box Truck', 'Partial Load', 'Frozen', '[\"City 39, State 28\",\"553 Random St\"]', '[\"City 52, State 58\",\"1044 Random Blvd\"]', 1, 1, 0, 1, 0, 'USD', 2015.73, '[{\"name\":\"Fuel Surcharge\",\"amount\":91.68959092029527}]', '[{\"name\":\"Holiday Discount\",\"amount\":103.8943267418999}]', 90.00, 60.00, 80.00, 55.00, 1955.30, 'Deliver ASAP.', NULL, NULL),
(34, 'Customer 29', 'CR0029', 'Branch 3', 'Michael Jordan', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0029', 'Furniture', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 32, State 14\",\"483 Random St\"]', '[\"City 55, State 96\",\"1435 Random Blvd\"]', 0, 0, 1, 0, 1, 'USD', 1909.87, '[{\"name\":\"Fuel Surcharge\",\"amount\":67.75003540493601}]', '[{\"name\":\"Holiday Discount\",\"amount\":138.75376508953724}]', 90.00, 60.00, 80.00, 55.00, 1782.83, 'Handle with care.', NULL, NULL),
(35, 'Customer 30', 'CR0030', 'Branch 6', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0030', 'Furniture', 'Box Truck', 'Full Load', 'Ambient', '[\"City 48, State 2\",\"500 Random St\"]', '[\"City 85, State 97\",\"1210 Random Blvd\"]', 0, 0, 1, 0, 1, 'USD', 3363.64, '[{\"name\":\"Fuel Surcharge\",\"amount\":78.27949581921237}]', '[{\"name\":\"Holiday Discount\",\"amount\":107.94853663512683}]', 90.00, 60.00, 80.00, 55.00, 3272.14, 'Deliver ASAP.', NULL, NULL),
(36, 'Customer 31', 'CR0031', 'Branch 8', 'Scottie Pippen', 'Kevin Durant', 'Kobe Bryant', 'PO-0031', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Chilled', '[\"City 16, State 31\",\"597 Random St\"]', '[\"City 53, State 78\",\"1720 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 4193.34, '[{\"name\":\"Fuel Surcharge\",\"amount\":76.30498349648697}]', '[{\"name\":\"Holiday Discount\",\"amount\":138.85945146691444}]', 90.00, 60.00, 80.00, 55.00, 4051.86, 'Fragile items.', NULL, NULL),
(37, 'Customer 32', 'CR0032', 'Branch 8', 'Michael Jordan', 'Stephen Curry', 'Kobe Bryant', 'PO-0032', 'Groceries', 'Box Truck', 'Full Load', 'Ambient', '[\"City 11, State 24\",\"488 Random St\"]', '[\"City 57, State 82\",\"1507 Random Blvd\"]', 1, 0, 1, 0, 0, 'USD', 3079.28, '[{\"name\":\"Fuel Surcharge\",\"amount\":55.32374050636625}]', '[{\"name\":\"Holiday Discount\",\"amount\":108.06862008688731}]', 90.00, 60.00, 80.00, 55.00, 2954.62, 'Fragile items.', NULL, NULL),
(38, 'Customer 33', 'CR0033', 'Branch 1', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0033', 'Furniture', 'Box Truck', 'Full Load', 'Ambient', '[\"City 38, State 41\",\"891 Random St\"]', '[\"City 97, State 92\",\"1831 Random Blvd\"]', 1, 1, 0, 1, 1, 'USD', 3116.32, '[{\"name\":\"Fuel Surcharge\",\"amount\":41.69157440921174}]', '[{\"name\":\"Holiday Discount\",\"amount\":76.88655985975826}]', 90.00, 60.00, 80.00, 55.00, 2987.99, 'Handle with care.', NULL, NULL),
(39, 'Customer 34', 'CR0034', 'Branch 5', 'Dennis Rodman', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0034', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Chilled', '[\"City 27, State 41\",\"424 Random St\"]', '[\"City 69, State 99\",\"1135 Random Blvd\"]', 0, 1, 0, 1, 1, 'USD', 1924.94, '[{\"name\":\"Fuel Surcharge\",\"amount\":70.9754414525146}]', '[{\"name\":\"Holiday Discount\",\"amount\":56.47919982483043}]', 90.00, 60.00, 80.00, 55.00, 1812.76, 'Fragile items.', NULL, NULL),
(40, 'Customer 35', 'CR0035', 'Branch 5', 'Dennis Rodman', 'Stephen Curry', 'Kobe Bryant', 'PO-0035', 'Electronics', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 21, State 14\",\"984 Random St\"]', '[\"City 100, State 61\",\"1557 Random Blvd\"]', 1, 0, 0, 0, 0, 'USD', 4898.28, '[{\"name\":\"Fuel Surcharge\",\"amount\":45.1571356818043}]', '[{\"name\":\"Holiday Discount\",\"amount\":122.37031111149942}]', 90.00, 60.00, 80.00, 55.00, 4777.33, 'Deliver ASAP.', NULL, NULL),
(41, 'Customer 36', 'CR0036', 'Branch 4', 'Dennis Rodman', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0036', 'Furniture', 'Box Truck', 'Full Load', 'Frozen', '[\"City 47, State 48\",\"295 Random St\"]', '[\"City 58, State 68\",\"1056 Random Blvd\"]', 1, 1, 0, 1, 1, 'USD', 2804.29, '[{\"name\":\"Fuel Surcharge\",\"amount\":57.92751608590936}]', '[{\"name\":\"Holiday Discount\",\"amount\":98.13769989734647}]', 90.00, 60.00, 80.00, 55.00, 2694.05, 'Fragile items.', NULL, NULL),
(42, 'Customer 37', 'CR0037', 'Branch 4', 'Michael Jordan', 'Stephen Curry', 'Tim Duncan', 'PO-0037', 'Toys', 'Flatbed', 'Full Load', 'Chilled', '[\"City 27, State 50\",\"442 Random St\"]', '[\"City 78, State 52\",\"1585 Random Blvd\"]', 0, 1, 0, 1, 0, 'USD', 1221.77, '[{\"name\":\"Fuel Surcharge\",\"amount\":71.81029122746813}]', '[{\"name\":\"Holiday Discount\",\"amount\":72.64081240014633}]', 90.00, 60.00, 80.00, 55.00, 1078.88, 'Deliver ASAP.', NULL, NULL),
(43, 'Customer 38', 'CR0038', 'Branch 1', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0038', 'Toys', 'Flatbed', 'Full Load', 'Frozen', '[\"City 2, State 21\",\"225 Random St\"]', '[\"City 85, State 86\",\"1229 Random Blvd\"]', 0, 0, 1, 0, 0, 'USD', 3306.19, '[{\"name\":\"Fuel Surcharge\",\"amount\":37.36021357010249}]', '[{\"name\":\"Holiday Discount\",\"amount\":148.24844402701262}]', 90.00, 60.00, 80.00, 55.00, 3112.09, 'Fragile items.', NULL, NULL),
(44, 'Customer 39', 'CR0039', 'Branch 4', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0039', 'Furniture', 'Flatbed', 'Full Load', 'Ambient', '[\"City 46, State 45\",\"389 Random St\"]', '[\"City 64, State 75\",\"1181 Random Blvd\"]', 1, 0, 1, 0, 1, 'USD', 1309.02, '[{\"name\":\"Fuel Surcharge\",\"amount\":36.03964241557277}]', '[{\"name\":\"Holiday Discount\",\"amount\":100.60219549946302}]', 90.00, 60.00, 80.00, 55.00, 1192.23, 'Deliver ASAP.', NULL, NULL),
(45, 'Customer 40', 'CR0040', 'Branch 2', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0040', 'Electronics', 'Refrigerated Truck', 'Partial Load', 'Frozen', '[\"City 42, State 42\",\"451 Random St\"]', '[\"City 87, State 63\",\"1905 Random Blvd\"]', 0, 0, 0, 0, 1, 'USD', 1325.80, '[{\"name\":\"Fuel Surcharge\",\"amount\":41.64500056973221}]', '[{\"name\":\"Holiday Discount\",\"amount\":68.90376523444654}]', 90.00, 60.00, 80.00, 55.00, 1238.96, 'Deliver ASAP.', NULL, NULL),
(46, 'Customer 41', 'CR0041', 'Branch 3', 'Michael Jordan', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0041', 'Groceries', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 21, State 1\",\"437 Random St\"]', '[\"City 78, State 76\",\"1365 Random Blvd\"]', 1, 0, 0, 1, 1, 'USD', 4910.73, '[{\"name\":\"Fuel Surcharge\",\"amount\":53.44859612718567}]', '[{\"name\":\"Holiday Discount\",\"amount\":88.07350757284895}]', 90.00, 60.00, 80.00, 55.00, 4782.11, 'Handle with care.', NULL, NULL),
(47, 'Customer 42', 'CR0042', 'Branch 7', 'Scottie Pippen', 'Kevin Durant', 'Kobe Bryant', 'PO-0042', 'Groceries', 'Flatbed', 'Full Load', 'Ambient', '[\"City 27, State 21\",\"914 Random St\"]', '[\"City 69, State 56\",\"1608 Random Blvd\"]', 0, 1, 0, 0, 1, 'USD', 3210.59, '[{\"name\":\"Fuel Surcharge\",\"amount\":56.274859761714914}]', '[{\"name\":\"Holiday Discount\",\"amount\":79.71982860382805}]', 90.00, 60.00, 80.00, 55.00, 3126.53, 'Fragile items.', NULL, NULL),
(48, 'Customer 43', 'CR0043', 'Branch 5', 'Scottie Pippen', 'LeBron James', 'Tim Duncan', 'PO-0043', 'Electronics', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 39, State 11\",\"981 Random St\"]', '[\"City 99, State 65\",\"1437 Random Blvd\"]', 1, 1, 0, 0, 1, 'USD', 4745.40, '[{\"name\":\"Fuel Surcharge\",\"amount\":73.61790682980333}]', '[{\"name\":\"Holiday Discount\",\"amount\":57.92577151453525}]', 90.00, 60.00, 80.00, 55.00, 4625.11, 'Fragile items.', NULL, NULL),
(49, 'Customer 44', 'CR0044', 'Branch 4', 'Scottie Pippen', 'LeBron James', 'Tim Duncan', 'PO-0044', 'Groceries', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 14, State 1\",\"199 Random St\"]', '[\"City 67, State 82\",\"1351 Random Blvd\"]', 1, 1, 0, 1, 1, 'USD', 2417.34, '[{\"name\":\"Fuel Surcharge\",\"amount\":34.91004387744746}]', '[{\"name\":\"Holiday Discount\",\"amount\":52.13285470300411}]', 90.00, 60.00, 80.00, 55.00, 2238.45, 'Fragile items.', NULL, NULL),
(50, 'Customer 45', 'CR0045', 'Branch 2', 'Scottie Pippen', 'Stephen Curry', 'Tim Duncan', 'PO-0045', 'Electronics', 'Flatbed', 'Full Load', 'Chilled', '[\"City 39, State 16\",\"424 Random St\"]', '[\"City 58, State 64\",\"1962 Random Blvd\"]', 0, 0, 0, 1, 1, 'USD', 4290.25, '[{\"name\":\"Fuel Surcharge\",\"amount\":48.552924735314605}]', '[{\"name\":\"Holiday Discount\",\"amount\":60.39761316017716}]', 90.00, 60.00, 80.00, 55.00, 4137.93, 'Fragile items.', NULL, NULL),
(51, 'Customer 46', 'CR0046', 'Branch 7', 'Michael Jordan', 'Stephen Curry', 'Tim Duncan', 'PO-0046', 'Furniture', 'Flatbed', 'Full Load', 'Frozen', '[\"City 35, State 8\",\"765 Random St\"]', '[\"City 70, State 82\",\"1713 Random Blvd\"]', 0, 1, 1, 0, 1, 'USD', 1265.86, '[{\"name\":\"Fuel Surcharge\",\"amount\":99.86339727264705}]', '[{\"name\":\"Holiday Discount\",\"amount\":76.02050435394472}]', 90.00, 60.00, 80.00, 55.00, 1104.78, 'Handle with care.', NULL, NULL),
(52, 'Customer 47', 'CR0047', 'Branch 2', 'Scottie Pippen', 'LeBron James', 'Tim Duncan', 'PO-0047', 'Groceries', 'Refrigerated Truck', 'Partial Load', 'Ambient', '[\"City 27, State 6\",\"464 Random St\"]', '[\"City 79, State 97\",\"1309 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 3270.36, '[{\"name\":\"Fuel Surcharge\",\"amount\":97.33871628907579}]', '[{\"name\":\"Holiday Discount\",\"amount\":93.53157841560534}]', 90.00, 60.00, 80.00, 55.00, 3082.21, 'Fragile items.', NULL, NULL),
(53, 'Customer 48', 'CR0048', 'Branch 1', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0048', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Ambient', '[\"City 22, State 13\",\"608 Random St\"]', '[\"City 97, State 76\",\"1179 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 3435.42, '[{\"name\":\"Fuel Surcharge\",\"amount\":33.28195712909378}]', '[{\"name\":\"Holiday Discount\",\"amount\":142.69296406365316}]', 90.00, 60.00, 80.00, 55.00, 3358.49, 'Deliver ASAP.', NULL, NULL),
(54, 'Customer 49', 'CR0049', 'Branch 9', 'Michael Jordan', 'Kevin Durant', 'Kobe Bryant', 'PO-0049', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Frozen', '[\"City 34, State 23\",\"187 Random St\"]', '[\"City 62, State 84\",\"1907 Random Blvd\"]', 1, 1, 1, 1, 0, 'USD', 4013.69, '[{\"name\":\"Fuel Surcharge\",\"amount\":33.31735661584688}]', '[{\"name\":\"Holiday Discount\",\"amount\":81.59371060435467}]', 90.00, 60.00, 80.00, 55.00, 3953.88, 'Deliver ASAP.', NULL, NULL),
(55, 'Customer 50', 'CR0050', 'Branch 7', 'Michael Jordan', 'LeBron James', 'Tim Duncan', 'PO-0050', 'Furniture', 'Refrigerated Truck', 'Full Load', 'Frozen', '[\"City 3, State 41\",\"955 Random St\"]', '[\"City 80, State 91\",\"1975 Random Blvd\"]', 1, 0, 0, 1, 0, 'USD', 2705.21, '[{\"name\":\"Fuel Surcharge\",\"amount\":50.97582652195447}]', '[{\"name\":\"Holiday Discount\",\"amount\":82.36183710793108}]', 90.00, 60.00, 80.00, 55.00, 2650.67, 'Handle with care.', NULL, NULL),
(56, 'Customer 51', 'CR0051', 'Branch 6', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0051', 'Furniture', 'Box Truck', 'Full Load', 'Ambient', '[\"City 26, State 48\",\"623 Random St\"]', '[\"City 55, State 87\",\"1864 Random Blvd\"]', 1, 0, 0, 0, 1, 'USD', 4270.04, '[{\"name\":\"Fuel Surcharge\",\"amount\":46.70699467864506}]', '[{\"name\":\"Holiday Discount\",\"amount\":137.12223557887683}]', 90.00, 60.00, 80.00, 55.00, 4085.37, 'Handle with care.', NULL, NULL),
(57, 'Customer 52', 'CR0052', 'Branch 4', 'Michael Jordan', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0052', 'Furniture', 'Box Truck', 'Partial Load', 'Ambient', '[\"City 26, State 38\",\"184 Random St\"]', '[\"City 92, State 59\",\"1860 Random Blvd\"]', 1, 0, 1, 1, 1, 'USD', 3875.19, '[{\"name\":\"Fuel Surcharge\",\"amount\":60.33899132405085}]', '[{\"name\":\"Holiday Discount\",\"amount\":124.97532567257026}]', 90.00, 60.00, 80.00, 55.00, 3785.23, 'Deliver ASAP.', NULL, NULL),
(58, 'Customer 53', 'CR0053', 'Branch 3', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0053', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Ambient', '[\"City 7, State 40\",\"789 Random St\"]', '[\"City 82, State 84\",\"1058 Random Blvd\"]', 0, 1, 0, 1, 0, 'USD', 3103.83, '[{\"name\":\"Fuel Surcharge\",\"amount\":71.77459050819286}]', '[{\"name\":\"Holiday Discount\",\"amount\":79.88443921463153}]', 90.00, 60.00, 80.00, 55.00, 3019.66, 'Deliver ASAP.', NULL, NULL),
(59, 'Customer 54', 'CR0054', 'Branch 3', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0054', 'Toys', 'Flatbed', 'Full Load', 'Chilled', '[\"City 47, State 17\",\"273 Random St\"]', '[\"City 63, State 96\",\"1249 Random Blvd\"]', 1, 1, 1, 0, 1, 'USD', 1025.54, '[{\"name\":\"Fuel Surcharge\",\"amount\":63.7790875746734}]', '[{\"name\":\"Holiday Discount\",\"amount\":65.18407650954305}]', 90.00, 60.00, 80.00, 55.00, 870.66, 'Deliver ASAP.', NULL, NULL),
(60, 'Customer 55', 'CR0055', 'Branch 4', 'Michael Jordan', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0055', 'Groceries', 'Flatbed', 'Full Load', 'Chilled', '[\"City 30, State 34\",\"366 Random St\"]', '[\"City 94, State 72\",\"1338 Random Blvd\"]', 1, 0, 0, 1, 0, 'USD', 1969.49, '[{\"name\":\"Fuel Surcharge\",\"amount\":94.54282408765657}]', '[{\"name\":\"Holiday Discount\",\"amount\":119.7046068946816}]', 90.00, 60.00, 80.00, 55.00, 1808.72, 'Handle with care.', NULL, NULL),
(61, 'Customer 56', 'CR0056', 'Branch 4', 'Scottie Pippen', 'Kevin Durant', 'Kobe Bryant', 'PO-0056', 'Groceries', 'Refrigerated Truck', 'Full Load', 'Ambient', '[\"City 10, State 45\",\"670 Random St\"]', '[\"City 70, State 89\",\"1225 Random Blvd\"]', 0, 0, 0, 1, 1, 'USD', 4245.12, '[{\"name\":\"Fuel Surcharge\",\"amount\":37.87312632429404}]', '[{\"name\":\"Holiday Discount\",\"amount\":59.23847879653139}]', 90.00, 60.00, 80.00, 55.00, 4187.06, 'Handle with care.', NULL, NULL),
(62, 'Customer 57', 'CR0057', 'Branch 1', 'Michael Jordan', 'Stephen Curry', 'Tim Duncan', 'PO-0057', 'Toys', 'Flatbed', 'Full Load', 'Frozen', '[\"City 50, State 12\",\"384 Random St\"]', '[\"City 67, State 64\",\"1182 Random Blvd\"]', 0, 0, 1, 0, 1, 'USD', 2400.63, '[{\"name\":\"Fuel Surcharge\",\"amount\":34.07608223966548}]', '[{\"name\":\"Holiday Discount\",\"amount\":131.42489493250994}]', 90.00, 60.00, 80.00, 55.00, 2337.15, 'Handle with care.', NULL, NULL),
(63, 'Customer 58', 'CR0058', 'Branch 10', 'Michael Jordan', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0058', 'Furniture', 'Box Truck', 'Full Load', 'Chilled', '[\"City 45, State 9\",\"480 Random St\"]', '[\"City 60, State 77\",\"1362 Random Blvd\"]', 0, 1, 0, 1, 0, 'USD', 4841.17, '[{\"name\":\"Fuel Surcharge\",\"amount\":90.47222972494691}]', '[{\"name\":\"Holiday Discount\",\"amount\":72.12072120451398}]', 90.00, 60.00, 80.00, 55.00, 4779.74, 'Fragile items.', NULL, NULL),
(64, 'Customer 59', 'CR0059', 'Branch 10', 'Scottie Pippen', 'Kevin Durant', 'Tim Duncan', 'PO-0059', 'Furniture', 'Box Truck', 'Full Load', 'Ambient', '[\"City 9, State 40\",\"381 Random St\"]', '[\"City 80, State 81\",\"1305 Random Blvd\"]', 1, 0, 1, 1, 1, 'USD', 1412.00, '[{\"name\":\"Fuel Surcharge\",\"amount\":68.37674156803659}]', '[{\"name\":\"Holiday Discount\",\"amount\":147.55749849360964}]', 90.00, 60.00, 80.00, 55.00, 1350.63, 'Fragile items.', NULL, NULL),
(65, 'Customer 60', 'CR0060', 'Branch 10', 'Dennis Rodman', 'LeBron James', 'Shaquille O\'Neal', 'PO-0060', 'Groceries', 'Refrigerated Truck', 'Partial Load', 'Chilled', '[\"City 22, State 20\",\"812 Random St\"]', '[\"City 93, State 77\",\"1980 Random Blvd\"]', 0, 1, 0, 0, 0, 'USD', 1717.23, '[{\"name\":\"Fuel Surcharge\",\"amount\":50.837571112897066}]', '[{\"name\":\"Holiday Discount\",\"amount\":144.38317375211858}]', 90.00, 60.00, 80.00, 55.00, 1637.13, 'Handle with care.', NULL, NULL),
(66, 'Customer 61', 'CR0061', 'Branch 2', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0061', 'Groceries', 'Refrigerated Truck', 'Full Load', 'Chilled', '[\"City 29, State 27\",\"797 Random St\"]', '[\"City 75, State 52\",\"1596 Random Blvd\"]', 0, 0, 0, 1, 0, 'USD', 4531.53, '[{\"name\":\"Fuel Surcharge\",\"amount\":51.28591572541587}]', '[{\"name\":\"Holiday Discount\",\"amount\":50.41314982705217}]', 90.00, 60.00, 80.00, 55.00, 4432.08, 'Fragile items.', NULL, NULL),
(67, 'Customer 62', 'CR0062', 'Branch 4', 'Dennis Rodman', 'Kevin Durant', 'Tim Duncan', 'PO-0062', 'Groceries', 'Refrigerated Truck', 'Full Load', 'Ambient', '[\"City 48, State 5\",\"375 Random St\"]', '[\"City 90, State 81\",\"1568 Random Blvd\"]', 1, 0, 1, 0, 0, 'USD', 4090.65, '[{\"name\":\"Fuel Surcharge\",\"amount\":48.494927146973524}]', '[{\"name\":\"Holiday Discount\",\"amount\":57.66573755254268}]', 90.00, 60.00, 80.00, 55.00, 4013.46, 'Deliver ASAP.', NULL, NULL),
(68, 'Customer 63', 'CR0063', 'Branch 2', 'Michael Jordan', 'Kevin Durant', 'Kobe Bryant', 'PO-0063', 'Toys', 'Flatbed', 'Full Load', 'Ambient', '[\"City 41, State 23\",\"856 Random St\"]', '[\"City 64, State 93\",\"1942 Random Blvd\"]', 1, 1, 1, 1, 0, 'USD', 2438.25, '[{\"name\":\"Fuel Surcharge\",\"amount\":39.61360106443937}]', '[{\"name\":\"Holiday Discount\",\"amount\":145.23538255643624}]', 90.00, 60.00, 80.00, 55.00, 2326.86, 'Deliver ASAP.', NULL, NULL),
(69, 'Customer 64', 'CR0064', 'Branch 8', 'Scottie Pippen', 'LeBron James', 'Kobe Bryant', 'PO-0064', 'Toys', 'Box Truck', 'Full Load', 'Frozen', '[\"City 10, State 47\",\"541 Random St\"]', '[\"City 92, State 86\",\"1912 Random Blvd\"]', 1, 0, 1, 1, 1, 'USD', 4590.24, '[{\"name\":\"Fuel Surcharge\",\"amount\":41.40193166175301}]', '[{\"name\":\"Holiday Discount\",\"amount\":67.94229613804099}]', 90.00, 60.00, 80.00, 55.00, 4398.46, 'Fragile items.', NULL, NULL),
(70, 'Customer 65', 'CR0065', 'Branch 2', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0065', 'Toys', 'Box Truck', 'Partial Load', 'Frozen', '[\"City 27, State 26\",\"278 Random St\"]', '[\"City 68, State 68\",\"1821 Random Blvd\"]', 0, 1, 1, 0, 1, 'USD', 1792.49, '[{\"name\":\"Fuel Surcharge\",\"amount\":40.22511315407396}]', '[{\"name\":\"Holiday Discount\",\"amount\":137.8060730199064}]', 90.00, 60.00, 80.00, 55.00, 1690.28, 'Fragile items.', NULL, NULL),
(71, 'Customer 66', 'CR0066', 'Branch 5', 'Scottie Pippen', 'LeBron James', 'Tim Duncan', 'PO-0066', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Frozen', '[\"City 12, State 15\",\"201 Random St\"]', '[\"City 87, State 91\",\"1376 Random Blvd\"]', 0, 1, 1, 0, 1, 'USD', 1186.73, '[{\"name\":\"Fuel Surcharge\",\"amount\":94.28178521555981}]', '[{\"name\":\"Holiday Discount\",\"amount\":123.81146422650912}]', 90.00, 60.00, 80.00, 55.00, 992.00, 'Fragile items.', NULL, NULL),
(72, 'Customer 67', 'CR0067', 'Branch 1', 'Dennis Rodman', 'Stephen Curry', 'Tim Duncan', 'PO-0067', 'Furniture', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 2, State 6\",\"950 Random St\"]', '[\"City 78, State 52\",\"1308 Random Blvd\"]', 1, 1, 1, 0, 1, 'USD', 2772.44, '[{\"name\":\"Fuel Surcharge\",\"amount\":53.65483018061451}]', '[{\"name\":\"Holiday Discount\",\"amount\":82.09840142216163}]', 90.00, 60.00, 80.00, 55.00, 2689.87, 'Deliver ASAP.', NULL, NULL),
(73, 'Customer 68', 'CR0068', 'Branch 1', 'Dennis Rodman', 'Stephen Curry', 'Tim Duncan', 'PO-0068', 'Groceries', 'Box Truck', 'Partial Load', 'Chilled', '[\"City 23, State 8\",\"438 Random St\"]', '[\"City 93, State 60\",\"1431 Random Blvd\"]', 0, 0, 0, 1, 0, 'USD', 4664.29, '[{\"name\":\"Fuel Surcharge\",\"amount\":64.37921514306076}]', '[{\"name\":\"Holiday Discount\",\"amount\":122.31599931848159}]', 90.00, 60.00, 80.00, 55.00, 4492.94, 'Fragile items.', NULL, NULL),
(74, 'Customer 69', 'CR0069', 'Branch 8', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0069', 'Groceries', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 50, State 43\",\"428 Random St\"]', '[\"City 86, State 85\",\"1605 Random Blvd\"]', 0, 1, 1, 0, 1, 'USD', 1955.45, '[{\"name\":\"Fuel Surcharge\",\"amount\":51.20096914251992}]', '[{\"name\":\"Holiday Discount\",\"amount\":108.28721277684662}]', 90.00, 60.00, 80.00, 55.00, 1805.69, 'Fragile items.', NULL, NULL),
(75, 'Customer 70', 'CR0070', 'Branch 9', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0070', 'Furniture', 'Box Truck', 'Partial Load', 'Chilled', '[\"City 16, State 38\",\"487 Random St\"]', '[\"City 75, State 52\",\"1391 Random Blvd\"]', 0, 0, 0, 0, 0, 'USD', 1741.47, '[{\"name\":\"Fuel Surcharge\",\"amount\":84.72765269171782}]', '[{\"name\":\"Holiday Discount\",\"amount\":138.48130103597316}]', 90.00, 60.00, 80.00, 55.00, 1557.16, 'Deliver ASAP.', NULL, NULL),
(76, 'Customer 71', 'CR0071', 'Branch 10', 'Scottie Pippen', 'Stephen Curry', 'Kobe Bryant', 'PO-0071', 'Toys', 'Box Truck', 'Full Load', 'Chilled', '[\"City 3, State 18\",\"357 Random St\"]', '[\"City 96, State 88\",\"1557 Random Blvd\"]', 0, 0, 1, 0, 0, 'USD', 3103.21, '[{\"name\":\"Fuel Surcharge\",\"amount\":48.7165976778669}]', '[{\"name\":\"Holiday Discount\",\"amount\":56.88996475460952}]', 90.00, 60.00, 80.00, 55.00, 2908.79, 'Deliver ASAP.', NULL, NULL),
(77, 'Customer 72', 'CR0072', 'Branch 3', 'Michael Jordan', 'LeBron James', 'Shaquille O\'Neal', 'PO-0072', 'Groceries', 'Box Truck', 'Partial Load', 'Chilled', '[\"City 41, State 22\",\"777 Random St\"]', '[\"City 66, State 78\",\"1952 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 4822.31, '[{\"name\":\"Fuel Surcharge\",\"amount\":39.15211889793882}]', '[{\"name\":\"Holiday Discount\",\"amount\":140.9033401100836}]', 90.00, 60.00, 80.00, 55.00, 4754.62, 'Fragile items.', NULL, NULL),
(78, 'Customer 73', 'CR0073', 'Branch 2', 'Michael Jordan', 'Kevin Durant', 'Tim Duncan', 'PO-0073', 'Groceries', 'Box Truck', 'Full Load', 'Chilled', '[\"City 6, State 46\",\"953 Random St\"]', '[\"City 77, State 84\",\"1845 Random Blvd\"]', 0, 1, 0, 0, 0, 'USD', 3934.08, '[{\"name\":\"Fuel Surcharge\",\"amount\":95.76119510103372}]', '[{\"name\":\"Holiday Discount\",\"amount\":109.6676215002766}]', 90.00, 60.00, 80.00, 55.00, 3750.40, 'Handle with care.', NULL, NULL),
(79, 'Customer 74', 'CR0074', 'Branch 5', 'Michael Jordan', 'LeBron James', 'Tim Duncan', 'PO-0074', 'Toys', 'Box Truck', 'Partial Load', 'Frozen', '[\"City 28, State 43\",\"226 Random St\"]', '[\"City 97, State 60\",\"1406 Random Blvd\"]', 0, 0, 1, 0, 1, 'USD', 3726.38, '[{\"name\":\"Fuel Surcharge\",\"amount\":98.37215338493068}]', '[{\"name\":\"Holiday Discount\",\"amount\":101.43173716738275}]', 90.00, 60.00, 80.00, 55.00, 3621.23, 'Deliver ASAP.', NULL, NULL),
(80, 'Customer 75', 'CR0075', 'Branch 1', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0075', 'Electronics', 'Box Truck', 'Partial Load', 'Frozen', '[\"City 26, State 42\",\"534 Random St\"]', '[\"City 91, State 92\",\"1928 Random Blvd\"]', 1, 0, 0, 0, 1, 'USD', 1813.33, '[{\"name\":\"Fuel Surcharge\",\"amount\":61.65658065961696}]', '[{\"name\":\"Holiday Discount\",\"amount\":100.7633320872059}]', 90.00, 60.00, 80.00, 55.00, 1757.26, 'Fragile items.', NULL, NULL),
(81, 'Customer 76', 'CR0076', 'Branch 6', 'Dennis Rodman', 'Kevin Durant', 'Tim Duncan', 'PO-0076', 'Electronics', 'Box Truck', 'Partial Load', 'Chilled', '[\"City 20, State 7\",\"737 Random St\"]', '[\"City 54, State 71\",\"1870 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 4013.32, '[{\"name\":\"Fuel Surcharge\",\"amount\":97.82891543260098}]', '[{\"name\":\"Holiday Discount\",\"amount\":52.48679467685101}]', 90.00, 60.00, 80.00, 55.00, 3942.45, 'Fragile items.', NULL, NULL),
(82, 'Customer 77', 'CR0077', 'Branch 7', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0077', 'Electronics', 'Flatbed', 'Full Load', 'Ambient', '[\"City 40, State 23\",\"680 Random St\"]', '[\"City 86, State 97\",\"1686 Random Blvd\"]', 1, 0, 0, 1, 1, 'USD', 4750.34, '[{\"name\":\"Fuel Surcharge\",\"amount\":32.560672985476884}]', '[{\"name\":\"Holiday Discount\",\"amount\":64.9628919057575}]', 90.00, 60.00, 80.00, 55.00, 4616.10, 'Handle with care.', NULL, NULL),
(83, 'Customer 78', 'CR0078', 'Branch 7', 'Dennis Rodman', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0078', 'Groceries', 'Flatbed', 'Full Load', 'Frozen', '[\"City 40, State 26\",\"260 Random St\"]', '[\"City 77, State 54\",\"1589 Random Blvd\"]', 1, 1, 1, 0, 0, 'USD', 3359.80, '[{\"name\":\"Fuel Surcharge\",\"amount\":50.49012434460448}]', '[{\"name\":\"Holiday Discount\",\"amount\":116.17455480979301}]', 90.00, 60.00, 80.00, 55.00, 3233.77, 'Deliver ASAP.', NULL, NULL),
(84, 'Customer 79', 'CR0079', 'Branch 7', 'Dennis Rodman', 'Stephen Curry', 'Kobe Bryant', 'PO-0079', 'Groceries', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 48, State 45\",\"711 Random St\"]', '[\"City 56, State 71\",\"1230 Random Blvd\"]', 1, 0, 1, 0, 0, 'USD', 2103.21, '[{\"name\":\"Fuel Surcharge\",\"amount\":58.96943009401674}]', '[{\"name\":\"Holiday Discount\",\"amount\":149.86563948218267}]', 90.00, 60.00, 80.00, 55.00, 1995.38, 'Deliver ASAP.', NULL, NULL),
(85, 'Customer 80', 'CR0080', 'Branch 3', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0080', 'Groceries', 'Refrigerated Truck', 'Full Load', 'Ambient', '[\"City 34, State 21\",\"404 Random St\"]', '[\"City 98, State 86\",\"1635 Random Blvd\"]', 0, 0, 0, 1, 0, 'USD', 4713.18, '[{\"name\":\"Fuel Surcharge\",\"amount\":33.367449368517356}]', '[{\"name\":\"Holiday Discount\",\"amount\":83.46629149479142}]', 90.00, 60.00, 80.00, 55.00, 4606.01, 'Fragile items.', NULL, NULL),
(86, 'Customer 81', 'CR0081', 'Branch 2', 'Dennis Rodman', 'Stephen Curry', 'Shaquille O\'Neal', 'PO-0081', 'Furniture', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 44, State 15\",\"664 Random St\"]', '[\"City 80, State 68\",\"1547 Random Blvd\"]', 0, 1, 0, 0, 1, 'USD', 3392.30, '[{\"name\":\"Fuel Surcharge\",\"amount\":57.971235300181405}]', '[{\"name\":\"Holiday Discount\",\"amount\":118.18069478989402}]', 90.00, 60.00, 80.00, 55.00, 3289.93, 'Deliver ASAP.', NULL, NULL),
(87, 'Customer 82', 'CR0082', 'Branch 6', 'Dennis Rodman', 'LeBron James', 'Shaquille O\'Neal', 'PO-0082', 'Electronics', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 32, State 13\",\"633 Random St\"]', '[\"City 63, State 58\",\"1717 Random Blvd\"]', 0, 1, 1, 0, 1, 'USD', 1651.96, '[{\"name\":\"Fuel Surcharge\",\"amount\":91.53456279040529}]', '[{\"name\":\"Holiday Discount\",\"amount\":70.27183290924161}]', 90.00, 60.00, 80.00, 55.00, 1548.26, 'Deliver ASAP.', NULL, NULL),
(88, 'Customer 83', 'CR0083', 'Branch 4', 'Dennis Rodman', 'Kevin Durant', 'Kobe Bryant', 'PO-0083', 'Groceries', 'Refrigerated Truck', 'Full Load', 'Chilled', '[\"City 38, State 26\",\"325 Random St\"]', '[\"City 70, State 94\",\"1050 Random Blvd\"]', 0, 1, 1, 1, 1, 'USD', 1679.96, '[{\"name\":\"Fuel Surcharge\",\"amount\":76.79855476315174}]', '[{\"name\":\"Holiday Discount\",\"amount\":101.39974558254416}]', 90.00, 60.00, 80.00, 55.00, 1606.90, 'Fragile items.', NULL, NULL),
(89, 'Customer 84', 'CR0084', 'Branch 2', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0084', 'Groceries', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 33, State 50\",\"978 Random St\"]', '[\"City 79, State 68\",\"1500 Random Blvd\"]', 1, 0, 0, 0, 1, 'USD', 2852.69, '[{\"name\":\"Fuel Surcharge\",\"amount\":66.56816367339965}]', '[{\"name\":\"Holiday Discount\",\"amount\":63.22943422956223}]', 90.00, 60.00, 80.00, 55.00, 2663.77, 'Fragile items.', NULL, NULL),
(90, 'Customer 85', 'CR0085', 'Branch 8', 'Scottie Pippen', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0085', 'Groceries', 'Flatbed', 'Full Load', 'Frozen', '[\"City 17, State 15\",\"303 Random St\"]', '[\"City 51, State 98\",\"1844 Random Blvd\"]', 0, 0, 1, 0, 1, 'USD', 3380.08, '[{\"name\":\"Fuel Surcharge\",\"amount\":50.27183084724571}]', '[{\"name\":\"Holiday Discount\",\"amount\":111.34372271329995}]', 90.00, 60.00, 80.00, 55.00, 3189.15, 'Fragile items.', NULL, NULL),
(91, 'Customer 86', 'CR0086', 'Branch 7', 'Scottie Pippen', 'Stephen Curry', 'Tim Duncan', 'PO-0086', 'Furniture', 'Refrigerated Truck', 'Partial Load', 'Ambient', '[\"City 34, State 35\",\"757 Random St\"]', '[\"City 89, State 82\",\"1037 Random Blvd\"]', 1, 1, 1, 1, 1, 'USD', 2114.02, '[{\"name\":\"Fuel Surcharge\",\"amount\":97.05411837907081}]', '[{\"name\":\"Holiday Discount\",\"amount\":87.42719189486368}]', 90.00, 60.00, 80.00, 55.00, 2043.02, 'Fragile items.', NULL, NULL),
(92, 'Customer 87', 'CR0087', 'Branch 9', 'Michael Jordan', 'Kevin Durant', 'Shaquille O\'Neal', 'PO-0087', 'Electronics', 'Box Truck', 'Full Load', 'Chilled', '[\"City 1, State 47\",\"459 Random St\"]', '[\"City 60, State 58\",\"1260 Random Blvd\"]', 0, 1, 0, 0, 1, 'USD', 1602.12, '[{\"name\":\"Fuel Surcharge\",\"amount\":94.96054773806084}]', '[{\"name\":\"Holiday Discount\",\"amount\":132.9830152493123}]', 90.00, 60.00, 80.00, 55.00, 1476.82, 'Fragile items.', NULL, NULL),
(93, 'Customer 88', 'CR0088', 'Branch 9', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0088', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Ambient', '[\"City 10, State 5\",\"965 Random St\"]', '[\"City 91, State 65\",\"1202 Random Blvd\"]', 1, 0, 1, 1, 0, 'USD', 3949.00, '[{\"name\":\"Fuel Surcharge\",\"amount\":87.489074174591}]', '[{\"name\":\"Holiday Discount\",\"amount\":140.0573307944037}]', 90.00, 60.00, 80.00, 55.00, 3814.03, 'Handle with care.', NULL, NULL),
(94, 'Customer 89', 'CR0089', 'Branch 10', 'Scottie Pippen', 'Stephen Curry', 'Tim Duncan', 'PO-0089', 'Toys', 'Box Truck', 'Full Load', 'Chilled', '[\"City 43, State 38\",\"894 Random St\"]', '[\"City 95, State 65\",\"1755 Random Blvd\"]', 1, 0, 1, 0, 0, 'USD', 4353.66, '[{\"name\":\"Fuel Surcharge\",\"amount\":73.55635211749977}]', '[{\"name\":\"Holiday Discount\",\"amount\":86.77820576938268}]', 90.00, 60.00, 80.00, 55.00, 4262.06, 'Deliver ASAP.', NULL, NULL),
(95, 'Customer 90', 'CR0090', 'Branch 9', 'Michael Jordan', 'LeBron James', 'Kobe Bryant', 'PO-0090', 'Toys', 'Flatbed', 'Full Load', 'Frozen', '[\"City 34, State 35\",\"268 Random St\"]', '[\"City 90, State 88\",\"1788 Random Blvd\"]', 0, 1, 1, 0, 0, 'USD', 3631.87, '[{\"name\":\"Fuel Surcharge\",\"amount\":31.99266736149628}]', '[{\"name\":\"Holiday Discount\",\"amount\":72.33614259943162}]', 90.00, 60.00, 80.00, 55.00, 3494.93, 'Fragile items.', NULL, NULL),
(96, 'Customer 91', 'CR0091', 'Branch 9', 'Scottie Pippen', 'Kevin Durant', 'Kobe Bryant', 'PO-0091', 'Electronics', 'Box Truck', 'Full Load', 'Ambient', '[\"City 8, State 46\",\"311 Random St\"]', '[\"City 94, State 93\",\"1993 Random Blvd\"]', 1, 1, 0, 1, 1, 'USD', 3111.32, '[{\"name\":\"Fuel Surcharge\",\"amount\":33.02593359299405}]', '[{\"name\":\"Holiday Discount\",\"amount\":144.02136044433263}]', 90.00, 60.00, 80.00, 55.00, 2916.17, 'Handle with care.', NULL, NULL),
(97, 'Customer 92', 'CR0092', 'Branch 2', 'Dennis Rodman', 'Stephen Curry', 'Tim Duncan', 'PO-0092', 'Electronics', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 26, State 16\",\"248 Random St\"]', '[\"City 78, State 90\",\"1227 Random Blvd\"]', 0, 0, 0, 1, 1, 'USD', 4573.16, '[{\"name\":\"Fuel Surcharge\",\"amount\":60.83672379744874}]', '[{\"name\":\"Holiday Discount\",\"amount\":146.98476465063254}]', 90.00, 60.00, 80.00, 55.00, 4408.50, 'Fragile items.', NULL, NULL),
(98, 'Customer 93', 'CR0093', 'Branch 9', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0093', 'Groceries', 'Box Truck', 'Partial Load', 'Ambient', '[\"City 36, State 9\",\"220 Random St\"]', '[\"City 75, State 67\",\"1444 Random Blvd\"]', 1, 1, 0, 0, 0, 'USD', 4262.33, '[{\"name\":\"Fuel Surcharge\",\"amount\":59.43927002711853}]', '[{\"name\":\"Holiday Discount\",\"amount\":92.64494097899758}]', 90.00, 60.00, 80.00, 55.00, 4150.46, 'Handle with care.', NULL, NULL),
(99, 'Customer 94', 'CR0094', 'Branch 6', 'Dennis Rodman', 'LeBron James', 'Tim Duncan', 'PO-0094', 'Toys', 'Box Truck', 'Full Load', 'Frozen', '[\"City 50, State 45\",\"143 Random St\"]', '[\"City 64, State 59\",\"1093 Random Blvd\"]', 0, 1, 1, 1, 1, 'USD', 3976.68, '[{\"name\":\"Fuel Surcharge\",\"amount\":67.82902101055313}]', '[{\"name\":\"Holiday Discount\",\"amount\":133.8383954016836}]', 90.00, 60.00, 80.00, 55.00, 3839.26, 'Fragile items.', NULL, NULL),
(100, 'Customer 95', 'CR0095', 'Branch 10', 'Michael Jordan', 'Kevin Durant', 'Kobe Bryant', 'PO-0095', 'Groceries', 'Flatbed', 'Partial Load', 'Chilled', '[\"City 38, State 31\",\"170 Random St\"]', '[\"City 78, State 86\",\"1446 Random Blvd\"]', 0, 0, 0, 0, 1, 'USD', 1976.94, '[{\"name\":\"Fuel Surcharge\",\"amount\":65.3952546735139}]', '[{\"name\":\"Holiday Discount\",\"amount\":88.35408683234144}]', 90.00, 60.00, 80.00, 55.00, 1832.33, 'Fragile items.', NULL, NULL),
(101, 'Customer 96', 'CR0096', 'Branch 1', 'Michael Jordan', 'Kevin Durant', 'Kobe Bryant', 'PO-0096', 'Electronics', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 44, State 45\",\"409 Random St\"]', '[\"City 85, State 76\",\"1444 Random Blvd\"]', 1, 1, 0, 1, 1, 'USD', 1570.05, '[{\"name\":\"Fuel Surcharge\",\"amount\":39.461481688200166}]', '[{\"name\":\"Holiday Discount\",\"amount\":127.3471915269436}]', 90.00, 60.00, 80.00, 55.00, 1498.41, 'Handle with care.', NULL, NULL),
(102, 'Customer 97', 'CR0097', 'Branch 7', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0097', 'Electronics', 'Flatbed', 'Partial Load', 'Frozen', '[\"City 39, State 21\",\"235 Random St\"]', '[\"City 93, State 70\",\"1319 Random Blvd\"]', 0, 1, 0, 0, 0, 'USD', 2588.33, '[{\"name\":\"Fuel Surcharge\",\"amount\":52.99557304364366}]', '[{\"name\":\"Holiday Discount\",\"amount\":69.09820047601622}]', 90.00, 60.00, 80.00, 55.00, 2452.44, 'Deliver ASAP.', NULL, NULL),
(103, 'Customer 98', 'CR0098', 'Branch 1', 'Scottie Pippen', 'LeBron James', 'Shaquille O\'Neal', 'PO-0098', 'Toys', 'Refrigerated Truck', 'Full Load', 'Frozen', '[\"City 19, State 20\",\"173 Random St\"]', '[\"City 75, State 74\",\"1892 Random Blvd\"]', 1, 0, 1, 1, 0, 'USD', 4506.96, '[{\"name\":\"Fuel Surcharge\",\"amount\":37.01576736454942}]', '[{\"name\":\"Holiday Discount\",\"amount\":136.81878642038086}]', 90.00, 60.00, 80.00, 55.00, 4370.26, 'Handle with care.', NULL, NULL),
(104, 'Customer 99', 'CR0099', 'Branch 9', 'Dennis Rodman', 'LeBron James', 'Kobe Bryant', 'PO-0099', 'Toys', 'Flatbed', 'Partial Load', 'Ambient', '[\"City 2, State 23\",\"983 Random St\"]', '[\"City 58, State 51\",\"1726 Random Blvd\"]', 0, 1, 0, 0, 1, 'USD', 3218.16, '[{\"name\":\"Fuel Surcharge\",\"amount\":44.376967577231774}]', '[{\"name\":\"Holiday Discount\",\"amount\":61.93443335733153}]', 90.00, 60.00, 80.00, 55.00, 3043.63, 'Fragile items.', NULL, NULL),
(105, 'Customer 100', 'CR0100', 'Branch 10', 'Dennis Rodman', 'Kevin Durant', 'Tim Duncan', 'PO-0100', 'Toys', 'Refrigerated Truck', 'Partial Load', 'Chilled', '[\"City 11, State 16\",\"677 Random St\"]', '[\"City 74, State 59\",\"1788 Random Blvd\"]', 0, 1, 0, 0, 1, 'USD', 1446.04, '[{\"name\":\"Fuel Surcharge\",\"amount\":40.55447486460987}]', '[{\"name\":\"Holiday Discount\",\"amount\":100.10605792253662}]', 90.00, 60.00, 80.00, 55.00, 1299.04, 'Fragile items.', NULL, NULL),
(106, 'Jill', '58000922', 'Kozhikode', 'Raiz', 'Vivian', 'Beena', '908779722', 'Seaweed', 'Dry Van 53\'', 'FTL', '34', '[{\"address\":\"5160 Avenida C\\u00f3rdoba\",\"city\":\"Buenos Aires\",\"state\":\"Ciudad Aut\\u00f3noma de Buenos Aires\",\"country\":\"Argentina\",\"postal\":\"C1414\",\"date\":null,\"time\":\"09:47\",\"po\":null,\"phone\":null,\"notes\":\"In good condition\",\"packages\":\"45\",\"weight\":\"400\",\"dimensions\":\"30x300x4500\",\"rate\":\"2024-12-30\",\"currency\":\"WE8686\",\"equipment\":\"Fied\",\"pickup_po\":\"ON786787\"}]', '[{\"address\":\"5160 Avenida C\\u00f3rdoba\",\"city\":\"Buenos Aires\",\"state\":\"Ciudad Aut\\u00f3noma de Buenos Aires\",\"country\":\"Argentina\",\"postal\":\"C1414\",\"date\":null,\"time\":\"09:49\",\"po\":null,\"phone\":null,\"notes\":\"great\",\"packages\":\"342\",\"weight\":\"34600\",\"dimensions\":\"349x400x5000\",\"rate\":\"2024-12-30\",\"currency\":\"ER65756\",\"equipment\":\"Jeep\",\"pickup_po\":\"ON77575\"}]', 0, 0, 1, 1, 0, 'CAD', 344000.00, '[{\"type\":\"Good\",\"charge\":\"3400\",\"percent\":\"Flat\"}]', '[]', 17.00, 14.00, 20.00, 14.00, 344065.00, 'Thank you!', '2024-12-29 22:46:06', '2024-12-29 22:54:10');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 4, 'authToken', '0720fce1536b270c3be69656edced64823db3cbaac214f7492e67009ae45d2d6', '[\"*\"]', NULL, NULL, '2024-08-02 05:32:15', '2024-08-02 05:32:15'),
(84, 'App\\Models\\User', 6, 'authToken', '6309e77ec639c02ca002084ac8687110c1dd259c4108d049df5bce38e1eb1886', '[\"*\"]', NULL, NULL, '2024-10-24 05:06:08', '2024-10-24 05:06:08'),
(85, 'App\\Models\\User', 6, 'authToken', 'e48edca3d59851948c8a78d9dd2e53cd1ef8f79638adbceaaf3ed15f78dff650', '[\"*\"]', NULL, NULL, '2024-10-24 05:06:56', '2024-10-24 05:06:56'),
(86, 'App\\Models\\User', 6, 'authToken', 'e100cd686b5e6526a6d6f7f04e042e06c6e8ac696b1092cd92ddc8ba6bf828f7', '[\"*\"]', NULL, NULL, '2024-10-24 05:09:53', '2024-10-24 05:09:53'),
(87, 'App\\Models\\User', 6, 'authToken', '05935801fbced7c92576499e51974926513a3d9ff815693a27900b8186c4f653', '[\"*\"]', NULL, NULL, '2024-10-24 05:14:23', '2024-10-24 05:14:23'),
(88, 'App\\Models\\User', 6, 'authToken', '4a48ed96e67177b2853736b09adab4165665589a75992919df609ed4819a2cc2', '[\"*\"]', NULL, NULL, '2024-10-24 05:35:05', '2024-10-24 05:35:05'),
(89, 'App\\Models\\User', 6, 'authToken', '165b8fa3b6280c0eb4e77827c98cbded651c22df714f5a2254315c9861778575', '[\"*\"]', NULL, NULL, '2024-10-24 05:38:47', '2024-10-24 05:38:47'),
(90, 'App\\Models\\User', 6, 'authToken', '3a3dac220c2d9f880701631a8337bfcde1c197299abd5364ce483254e62d0bd8', '[\"*\"]', NULL, NULL, '2024-10-24 05:43:25', '2024-10-24 05:43:25'),
(91, 'App\\Models\\User', 6, 'authToken', '7ebcb5fd31123336e0536256fcb227979e0f9919a98d0bc36f75bf4fe0072c5b', '[\"*\"]', NULL, NULL, '2024-10-24 05:46:29', '2024-10-24 05:46:29'),
(95, 'App\\Models\\User', 6, 'authToken', '30aede16aa435a6a9d2a3d1ceacb89f43279c8fc2f29a7f04cc8bde35bcdbe73', '[\"*\"]', NULL, NULL, '2024-10-24 09:53:09', '2024-10-24 09:53:09'),
(96, 'App\\Models\\User', 6, 'authToken', 'c9e79ece9c17f15c56c1936712306bda683da9424d4a5ab924f100f603f2e795', '[\"*\"]', NULL, NULL, '2024-10-24 09:53:20', '2024-10-24 09:53:20'),
(97, 'App\\Models\\User', 6, 'authToken', '3962f4ffc1eb1eccddac98dd1440a95f0d6fdd5a41333ce3fb86c6cdbc1e882e', '[\"*\"]', NULL, NULL, '2024-10-24 09:54:11', '2024-10-24 09:54:11'),
(98, 'App\\Models\\User', 6, 'authToken', '4647d0a8b56864edf45942a3c386bc3a21868beaaefa1ade0fc837a3150db022', '[\"*\"]', NULL, NULL, '2024-10-25 00:15:45', '2024-10-25 00:15:45'),
(99, 'App\\Models\\User', 6, 'authToken', 'f02417fa8bbdc4faa8194bf1e0cb7370efebe0f40b8f69e0b2532a98166cb9a5', '[\"*\"]', NULL, NULL, '2024-10-25 00:17:14', '2024-10-25 00:17:14'),
(100, 'App\\Models\\User', 6, 'authToken', '1201b4b699cb3fdff01b41820f86063c1c2146bade3450ef4f50db80afd56e30', '[\"*\"]', NULL, NULL, '2024-10-25 00:22:13', '2024-10-25 00:22:13'),
(101, 'App\\Models\\User', 6, 'authToken', '8bc7ee996f99bd39fddb126430b9eb3fe5976b71ea6158c6bb7d53ac6e30cd71', '[\"*\"]', NULL, NULL, '2024-10-25 01:04:35', '2024-10-25 01:04:35'),
(102, 'App\\Models\\User', 6, 'authToken', 'e4d7ab964810aa4b91db110cc763d1abc66fab90cfd879fa540fc8ac99c430b6', '[\"*\"]', NULL, NULL, '2024-10-25 01:05:05', '2024-10-25 01:05:05'),
(103, 'App\\Models\\User', 6, 'authToken', '0f1ee2a7c774098de83a0eca54abec1162016fe559445714752a6c3f7b935661', '[\"*\"]', NULL, NULL, '2024-10-25 01:11:05', '2024-10-25 01:11:05'),
(104, 'App\\Models\\User', 6, 'authToken', '03cea224567f7de9278d23d401ab8bac969535d9130c8595356bcb43476f2d7f', '[\"*\"]', NULL, NULL, '2024-10-25 05:31:54', '2024-10-25 05:31:54'),
(105, 'App\\Models\\User', 6, 'authToken', '59c398b6252698fe23e4a0a5326cf9b1cd3205d30e82d6d048b2748f35e73b67', '[\"*\"]', NULL, NULL, '2024-10-25 05:33:43', '2024-10-25 05:33:43'),
(106, 'App\\Models\\User', 6, 'authToken', '3b156407b3316afebf1ff4770f5687933cd316934851488d685d9e4f93470a21', '[\"*\"]', NULL, NULL, '2024-10-25 05:35:14', '2024-10-25 05:35:14'),
(107, 'App\\Models\\User', 6, 'authToken', '34dfad87b93a4df3e86cfc20833cc3d49884dbfd1dd2307f156161e81eeba1f0', '[\"*\"]', NULL, NULL, '2024-10-25 05:37:36', '2024-10-25 05:37:36'),
(108, 'App\\Models\\User', 6, 'authToken', 'cd5721300015ebe32a8ad49b3a97a2672ce7647d08adb9a96c7be4084a8baaef', '[\"*\"]', NULL, NULL, '2024-10-25 05:37:50', '2024-10-25 05:37:50'),
(109, 'App\\Models\\User', 6, 'authToken', 'f20adfdf86d58d9655934f48c26e1d5c1e346e6b2d6e1eccd4c6f32fcac3f278', '[\"*\"]', NULL, NULL, '2024-10-25 05:38:11', '2024-10-25 05:38:11'),
(110, 'App\\Models\\User', 6, 'authToken', '787a975ce62c05d0efbe6a349759239d2866b56929c86e5c853790484b8fb66c', '[\"*\"]', NULL, NULL, '2024-10-25 05:38:18', '2024-10-25 05:38:18'),
(111, 'App\\Models\\User', 6, 'authToken', '2495fb4c05640bc3201a51933690496697e3bfe0aaa52be293518e32928608da', '[\"*\"]', NULL, NULL, '2024-10-25 05:38:34', '2024-10-25 05:38:34'),
(112, 'App\\Models\\User', 6, 'authToken', 'b47bf0c5c1079825ea01d3fef4feedc472f3ac94412619d205796ccedf0de5d9', '[\"*\"]', NULL, NULL, '2024-10-25 05:38:57', '2024-10-25 05:38:57'),
(113, 'App\\Models\\User', 6, 'authToken', 'c83e7746e10f003a3cd16242483fd2aea21cb6377cdc9bb449da34efdc497421', '[\"*\"]', NULL, NULL, '2024-10-25 05:43:36', '2024-10-25 05:43:36'),
(114, 'App\\Models\\User', 6, 'authToken', '2e6e295bc86a6892a214eba2534775e9bc8f1b712ea40e61a83020f5ea9422cb', '[\"*\"]', NULL, NULL, '2024-10-25 05:43:56', '2024-10-25 05:43:56'),
(115, 'App\\Models\\User', 6, 'authToken', '9ff8b4d4990388abf766e2d5d3b661a89a797e915c48ad2ecd924c6994380a38', '[\"*\"]', NULL, NULL, '2024-10-25 05:44:37', '2024-10-25 05:44:37'),
(116, 'App\\Models\\User', 6, 'authToken', '5930e86cc2a0158a49cffba932bb1a739bf3d00652fb5b9840d400e219e928ad', '[\"*\"]', NULL, NULL, '2024-10-25 05:48:16', '2024-10-25 05:48:16'),
(117, 'App\\Models\\User', 6, 'authToken', '8503bfc76562e63d6cc5f1ab5f7c694994a93eb1af9362d143c2d904ae2d0060', '[\"*\"]', NULL, NULL, '2024-10-25 05:54:00', '2024-10-25 05:54:00'),
(118, 'App\\Models\\User', 6, 'authToken', 'a611bcc63fa3efde517a4c6ffa0ddd988d7f9648fc72983995d066772c5622f9', '[\"*\"]', NULL, NULL, '2024-10-25 06:01:09', '2024-10-25 06:01:09'),
(121, 'App\\Models\\User', 6, 'authToken', '635d3250f7146a63bdda884171c8c7f48c3a982437dfc5830d69d8481a251c82', '[\"*\"]', NULL, NULL, '2024-10-25 06:07:50', '2024-10-25 06:07:50'),
(122, 'App\\Models\\User', 6, 'authToken', '97472e0d3fa553e753e67cacc468dce7f002b3e1c588a69ae342ec41c14ce9b5', '[\"*\"]', NULL, NULL, '2024-10-25 06:15:13', '2024-10-25 06:15:13'),
(123, 'App\\Models\\User', 6, 'authToken', 'b4330864cc4e16e68d2c1d34a540c9e9a3a1e68418ec72bc97b220e602c1bd7d', '[\"*\"]', NULL, NULL, '2024-10-25 08:21:48', '2024-10-25 08:21:48'),
(124, 'App\\Models\\User', 6, 'authToken', 'bf3640fea73d4ff4dff74200193fd7f4be40d113a89daa9c93b31e63afc1c954', '[\"*\"]', NULL, NULL, '2024-10-25 08:55:45', '2024-10-25 08:55:45'),
(125, 'App\\Models\\User', 6, 'authToken', 'a8a4c4360a08f7d524feb889bc491c4eb4efa71be1e92f58fa2cc7b71ea6e665', '[\"*\"]', NULL, NULL, '2024-10-25 08:56:50', '2024-10-25 08:56:50'),
(126, 'App\\Models\\User', 6, 'authToken', 'a76a9962c1d26179f594de0d27012107dc218db4a7a53d3907bd7c0ea3346fed', '[\"*\"]', NULL, NULL, '2024-10-25 09:02:37', '2024-10-25 09:02:37'),
(127, 'App\\Models\\User', 6, 'authToken', 'c5861000b1311d35feb4360d09bdd0df7aa1b945aad5132cf4c44017250c6bab', '[\"*\"]', NULL, NULL, '2024-10-25 10:12:17', '2024-10-25 10:12:17'),
(128, 'App\\Models\\User', 6, 'authToken', '495111ed263f307a02f3114173d528db70493870ef605059a04094d54e21f574', '[\"*\"]', NULL, NULL, '2024-10-25 10:15:25', '2024-10-25 10:15:25'),
(129, 'App\\Models\\User', 6, 'authToken', 'c01a5f01fe2bc2d3299bab5e139e35b97f60d1343c55892e5fe71367502bbf0f', '[\"*\"]', NULL, NULL, '2024-10-25 10:16:46', '2024-10-25 10:16:46'),
(130, 'App\\Models\\User', 6, 'authToken', '7be8a22820b34270b40f0b350e37218624f0c1931bbbc92e5cb4e2030038f4ca', '[\"*\"]', NULL, NULL, '2024-10-25 10:20:04', '2024-10-25 10:20:04'),
(131, 'App\\Models\\User', 6, 'authToken', '6da80e3b3acda62c94af2e5f6d081decb01f4a2fb5d0fea9d8bbf3aad162b079', '[\"*\"]', NULL, NULL, '2024-10-25 22:20:28', '2024-10-25 22:20:28'),
(132, 'App\\Models\\User', 6, 'authToken', 'a5c638aafdbd947fa77ba585f93a871420de440efac635aea29b5a36063edce8', '[\"*\"]', NULL, NULL, '2024-10-25 22:23:00', '2024-10-25 22:23:00'),
(133, 'App\\Models\\User', 6, 'authToken', '20fda3c798566e8f3b5b95e75cd487c23a5e28a32b9380ab6cb342bcbaf80f45', '[\"*\"]', NULL, NULL, '2024-10-25 23:05:24', '2024-10-25 23:05:24'),
(134, 'App\\Models\\User', 6, 'authToken', '429eba162fa8bfcf975d9775e78b95aedb36f5ecd9b90eb988338e8db14152ca', '[\"*\"]', NULL, NULL, '2024-10-25 23:22:20', '2024-10-25 23:22:20'),
(135, 'App\\Models\\User', 6, 'authToken', 'a523f90e92e709fdf29d7b79a7c1420f4bad2df7fe63bf73869c79d88a002e9e', '[\"*\"]', NULL, NULL, '2024-10-25 23:24:34', '2024-10-25 23:24:34'),
(136, 'App\\Models\\User', 6, 'authToken', 'afb5065e7d0e877e1f50c4aac6905ac1e95acd7d1fc7654abe786c5a90bb2ef0', '[\"*\"]', NULL, NULL, '2024-10-25 23:24:51', '2024-10-25 23:24:51'),
(137, 'App\\Models\\User', 6, 'authToken', 'c58c0ff08b85ef768d240b11366c3bd12f75b858c0e0ef5fe0e8dd199ae153fa', '[\"*\"]', NULL, NULL, '2024-10-25 23:34:53', '2024-10-25 23:34:53'),
(155, 'App\\Models\\User', 6, 'authToken', '2784e96714d5c3db0582a5ae6d6ea9675736378947f56ebaa10ececde40097b6', '[\"*\"]', NULL, NULL, '2024-10-26 23:42:19', '2024-10-26 23:42:19'),
(363, 'App\\Models\\User', 7, 'authToken', 'c5f7ee722bd4ee4e8a9e0da94c0c882d94bfea647fac8741e1715ba1be4ce791', '[\"*\"]', NULL, NULL, '2024-10-31 21:05:00', '2024-10-31 21:05:00'),
(417, 'App\\Models\\User', 1, 'authToken', 'e85c1af3d83780fad9137c876c92262d6ebc7d84a9b92b1d8c85e6186aa74b75', '[\"*\"]', '2024-11-03 03:52:34', NULL, '2024-11-03 01:24:20', '2024-11-03 03:52:34'),
(418, 'App\\Models\\User', 1, 'authToken', 'ba08d8a01d59cf5153fb037c69342ddfd2987b91afcda5b59d23cc741d24da55', '[\"*\"]', '2024-11-04 00:47:11', NULL, '2024-11-04 00:47:08', '2024-11-04 00:47:11'),
(419, 'App\\Models\\User', 1, 'authToken', '4400ee1aae110540a46b9ce4b3aa8d1cad39a0a7e586c5bac9bd8e951aa693bc', '[\"*\"]', '2024-11-04 03:40:43', NULL, '2024-11-04 00:47:16', '2024-11-04 03:40:43'),
(420, 'App\\Models\\User', 7, 'authToken', '5d0447c611aec65a45f976ff0e5e68b4458fd36931fa54f2221e112b0406f1c5', '[\"*\"]', '2024-11-04 03:52:10', NULL, '2024-11-04 03:33:54', '2024-11-04 03:52:10'),
(421, 'App\\Models\\User', 7, 'authToken', 'fb4c4d2fa05e280f463c672014c9174b233342e7678709ff1ac9a575b58eb0b9', '[\"*\"]', '2024-11-05 01:18:24', NULL, '2024-11-04 06:09:07', '2024-11-05 01:18:24'),
(422, 'App\\Models\\User', 1, 'authToken', '37e238995d8b5d1ca08b5b0e710086f142ffefdc2484cbed8936f4eab7a7ed62', '[\"*\"]', '2024-11-05 00:32:59', NULL, '2024-11-04 06:09:53', '2024-11-05 00:32:59'),
(423, 'App\\Models\\User', 7, 'authToken', 'a961d260eeca6c1f29114aaa3bcd7b1285af866a35e000199a37e6ddaeaa6825', '[\"*\"]', '2024-11-05 08:37:00', NULL, '2024-11-05 01:20:14', '2024-11-05 08:37:00'),
(424, 'App\\Models\\User', 1, 'authToken', '1fea47e5a85f36b9d9da31f96da2e4e19d8a93fa679b2b8d5c0af6657120dbe4', '[\"*\"]', '2024-11-05 10:09:51', NULL, '2024-11-05 01:27:43', '2024-11-05 10:09:51'),
(425, 'App\\Models\\User', 7, 'authToken', 'f3647c08636cc40e94f1441d5a3f63816dfbdb4a051b4cf9bae5878d5baf0e8c', '[\"*\"]', '2024-11-05 09:06:54', NULL, '2024-11-05 08:37:08', '2024-11-05 09:06:54'),
(426, 'App\\Models\\User', 7, 'authToken', '20e31ac439159552c2e9b6c48ad87d660ba85e88a3e8bf9ad222e137fcfd9515', '[\"*\"]', '2024-11-05 09:13:35', NULL, '2024-11-05 09:07:42', '2024-11-05 09:13:35'),
(427, 'App\\Models\\User', 7, 'authToken', '8cf3a22e2797386ae777fa28954aa932f33d7d62be3ccaaec3638ff29a12479e', '[\"*\"]', '2024-11-05 09:16:57', NULL, '2024-11-05 09:14:04', '2024-11-05 09:16:57'),
(428, 'App\\Models\\User', 7, 'authToken', '7fea052dfe060fd8218e55850649192927868b6822ae846df748ab6be19478f4', '[\"*\"]', '2024-11-06 00:05:29', NULL, '2024-11-05 09:18:10', '2024-11-06 00:05:29'),
(429, 'App\\Models\\User', 7, 'authToken', 'be852508c21cce45b1a6399dadb6f0a7848c005084615727285f1d9712cb751d', '[\"*\"]', '2024-11-06 01:37:19', NULL, '2024-11-06 01:37:14', '2024-11-06 01:37:19'),
(430, 'App\\Models\\User', 7, 'authToken', 'b8fa8a4496dfb411adec9b71c4632da1dbdd9ae1bc63effe2225c02de06bb29f', '[\"*\"]', NULL, NULL, '2024-11-06 02:56:25', '2024-11-06 02:56:25'),
(431, 'App\\Models\\User', 7, 'authToken', 'f1fe43f3a6bef6af2c3268bcf98a09147f6a2c33b074fbcb42c7116c6eaaf59d', '[\"*\"]', NULL, NULL, '2024-11-06 02:58:31', '2024-11-06 02:58:31'),
(432, 'App\\Models\\User', 7, 'authToken', '177613260cc1b94456d171f36713f8cd0305f767329292608c8d1a09102a86fc', '[\"*\"]', NULL, NULL, '2024-11-06 02:58:57', '2024-11-06 02:58:57'),
(433, 'App\\Models\\User', 7, 'authToken', '10e73d3d8e272bf693b8ab1e84bfe60e216a6dbb41d3371ccbebdbef0d079995', '[\"*\"]', '2024-11-06 02:59:33', NULL, '2024-11-06 02:59:28', '2024-11-06 02:59:33'),
(434, 'App\\Models\\User', 7, 'authToken', '14358a680a697678fa1d94f4a7a185ed28cf7394e4e9e8941f36588e62ca4d5d', '[\"*\"]', '2024-11-06 05:49:39', NULL, '2024-11-06 03:46:36', '2024-11-06 05:49:39'),
(435, 'App\\Models\\User', 7, 'authToken', '841dd5125fd5ffa010fe8b40ea74c8b969bddf3aa7347e4b69fa961f6bbf5880', '[\"*\"]', NULL, NULL, '2024-11-06 05:50:53', '2024-11-06 05:50:53'),
(436, 'App\\Models\\User', 7, 'authToken', 'ac74733054f10d0f0c54727b7f2b2b453e1583522fbed7942a0f8a93749bca36', '[\"*\"]', NULL, NULL, '2024-11-06 05:51:26', '2024-11-06 05:51:26'),
(437, 'App\\Models\\User', 7, 'authToken', 'da59ed552c8b5005231f1c1899514759f75538e5634673607aecb8bdf28546ed', '[\"*\"]', NULL, NULL, '2024-11-06 05:59:25', '2024-11-06 05:59:25'),
(438, 'App\\Models\\User', 7, 'authToken', '091a09a47effee6df776fcc5a367be942f285287040ca53304e0407bcba74ad1', '[\"*\"]', NULL, NULL, '2024-11-06 06:12:12', '2024-11-06 06:12:12'),
(439, 'App\\Models\\User', 7, 'authToken', '383d8697d8f5fee324709fc70d30b2ef3f6fb71fcbf9d372b335ca015df61005', '[\"*\"]', '2024-11-06 06:14:26', NULL, '2024-11-06 06:14:22', '2024-11-06 06:14:26'),
(440, 'App\\Models\\User', 7, 'authToken', 'e90075a0600a82224490ba7de2e47fc5a48b679224b7875738b00b983c2e6c47', '[\"*\"]', '2024-11-06 06:19:09', NULL, '2024-11-06 06:17:30', '2024-11-06 06:19:09'),
(441, 'App\\Models\\User', 7, 'authToken', '0fd46a5c3ca49fb5af34e5e7dd111494bb3a160c76801872f0355aa1869e1fc6', '[\"*\"]', '2024-11-06 06:19:24', NULL, '2024-11-06 06:19:21', '2024-11-06 06:19:24'),
(442, 'App\\Models\\User', 7, 'authToken', 'b38153923d4c5ee2db2294c9611b9bc4f8d308371959ccb05762396a8e4f6067', '[\"*\"]', '2024-11-06 06:20:23', NULL, '2024-11-06 06:20:20', '2024-11-06 06:20:23'),
(443, 'App\\Models\\User', 7, 'authToken', 'bbd0cb3397d6221a8d15ab1f3c8e2e18b7bc0b8180766aa1a7f15e2b6fb22cca', '[\"*\"]', '2024-11-06 06:49:45', NULL, '2024-11-06 06:49:41', '2024-11-06 06:49:45'),
(444, 'App\\Models\\User', 7, 'authToken', '99562a30c0661bb510acc5bb37208e1672feed0437b413ba63ebe401b1e590d1', '[\"*\"]', '2024-11-06 06:53:44', NULL, '2024-11-06 06:53:41', '2024-11-06 06:53:44'),
(445, 'App\\Models\\User', 7, 'authToken', 'f491c0743c9f6838eeaf177fa08fe67399d96be92c795614b7e65f21c8deb818', '[\"*\"]', '2024-11-06 06:54:24', NULL, '2024-11-06 06:54:20', '2024-11-06 06:54:24'),
(446, 'App\\Models\\User', 7, 'authToken', 'd5df46064f572e6b55f8665b497e8cb81ac7bf96828647d86e4c5f10cb2d2faa', '[\"*\"]', '2024-11-07 02:01:30', NULL, '2024-11-06 06:56:21', '2024-11-07 02:01:30'),
(447, 'App\\Models\\User', 7, 'authToken', 'ba6ac168dd5238eba7b99882039d48fa5eb9b626387aa601e748271a6ef89d07', '[\"*\"]', '2024-11-08 00:44:33', NULL, '2024-11-07 03:53:23', '2024-11-08 00:44:33'),
(448, 'App\\Models\\User', 1, 'authToken', '259c9d2174369b74bd6ad65d8333c365139cfa4bba418e992a037836ed46431c', '[\"*\"]', '2024-11-07 09:40:45', NULL, '2024-11-07 05:58:47', '2024-11-07 09:40:45'),
(449, 'App\\Models\\User', 7, 'authToken', '05a0e16019b18561ee0b2d651f752d34104007cffa2030e2d46c24b84e9f5921', '[\"*\"]', '2024-11-07 22:41:26', NULL, '2024-11-07 20:08:36', '2024-11-07 22:41:26'),
(450, 'App\\Models\\User', 7, 'authToken', '1ae9cf0f2bc88441886a517ca22dc26bde2e06be79de2a24c89a9fdc40de0f4c', '[\"*\"]', '2024-11-07 22:47:40', NULL, '2024-11-07 22:42:00', '2024-11-07 22:47:40'),
(451, 'App\\Models\\User', 7, 'authToken', '4ad09a9589b727999bcdfa35c2354771b1537357b5ba6e5d4714ced892a45842', '[\"*\"]', '2024-11-07 22:50:17', NULL, '2024-11-07 22:47:38', '2024-11-07 22:50:17'),
(452, 'App\\Models\\User', 7, 'authToken', 'e9a96c41fe8638d9e155c239f40b517119a161285d962a28155414ba890226ca', '[\"*\"]', '2024-11-08 01:58:58', NULL, '2024-11-07 22:50:16', '2024-11-08 01:58:58'),
(453, 'App\\Models\\User', 7, 'authToken', '8847d7586ac3815ae7da8fde91053ebb2db9dac505ae4aa01a7ec9fb2610a8c4', '[\"*\"]', '2024-11-08 01:59:08', NULL, '2024-11-08 01:59:05', '2024-11-08 01:59:08'),
(454, 'App\\Models\\User', 7, 'authToken', '8853f9d9bf7d576ee0817a31872e667b53212b82362255d7b323f1f63c4d3246', '[\"*\"]', '2024-11-08 05:04:08', NULL, '2024-11-08 04:57:32', '2024-11-08 05:04:08'),
(455, 'App\\Models\\User', 7, 'authToken', 'f28a9a12f6ecd52ef17443ecf4255207ae99d1379cda9bf729c94f9f515c2b9a', '[\"*\"]', '2024-11-09 04:05:35', NULL, '2024-11-08 05:04:44', '2024-11-09 04:05:35'),
(456, 'App\\Models\\User', 7, 'authToken', '3b15f53fdffd4ff3ba2d002165d84708066f1a3989b9403e6ae1162a5d107b23', '[\"*\"]', NULL, NULL, '2024-11-08 05:33:57', '2024-11-08 05:33:57'),
(457, 'App\\Models\\User', 7, 'authToken', 'dae295663ee7a5b0699960b00ca85132973212b46303c07c1be3c6f831db4b38', '[\"*\"]', '2024-11-09 04:06:32', NULL, '2024-11-09 04:06:27', '2024-11-09 04:06:32'),
(458, 'App\\Models\\User', 7, 'authToken', '9ffb005d2830643a71c0f4fce895f471aac08695d397e175a35b58096545c1ff', '[\"*\"]', '2024-11-09 22:27:36', NULL, '2024-11-09 20:25:34', '2024-11-09 22:27:36'),
(459, 'App\\Models\\User', 7, 'authToken', '2ad09d0919b30b1655df5ec7a03470d7fd010488fda61a164aeb37ebcc5c8e56', '[\"*\"]', '2024-11-09 20:53:40', NULL, '2024-11-09 20:51:05', '2024-11-09 20:53:40'),
(460, 'App\\Models\\User', 7, 'authToken', 'fa2c525663f1f8a51f12ea2faa4c35129a395a527bf03c47d9dbcb234b491739', '[\"*\"]', '2024-11-09 22:38:53', NULL, '2024-11-09 20:58:42', '2024-11-09 22:38:53'),
(461, 'App\\Models\\User', 7, 'authToken', '1f1c7b4d1c4c14515b3f7431224ee99cc93e3ccbcaca6c479017f6fe11992729', '[\"*\"]', '2024-11-09 22:41:17', NULL, '2024-11-09 22:38:46', '2024-11-09 22:41:17'),
(462, 'App\\Models\\User', 7, 'authToken', 'be4c727c869e39742fee7ea03285b9a52d6884957548c41aeb9bdb908bf45437', '[\"*\"]', '2024-11-09 23:27:17', NULL, '2024-11-09 22:53:26', '2024-11-09 23:27:17'),
(463, 'App\\Models\\User', 7, 'authToken', 'e57d9e91416d52aacfb7714422dc1c0f874609be418e2b3e4976bc5a784c0aa5', '[\"*\"]', NULL, NULL, '2024-11-09 22:53:59', '2024-11-09 22:53:59'),
(464, 'App\\Models\\User', 7, 'authToken', '59b99c1516c06f039e54dd07138a2543ed361cb599a1237a5986f0776e64c91d', '[\"*\"]', '2024-11-10 00:40:01', NULL, '2024-11-10 00:08:11', '2024-11-10 00:40:01'),
(465, 'App\\Models\\User', 7, 'authToken', '18c08fefa3650c331e3e7484e46a7d5de6fbdbe83b99ce96de69b4838a72e42e', '[\"*\"]', '2024-11-10 08:16:14', NULL, '2024-11-10 00:40:09', '2024-11-10 08:16:14'),
(466, 'App\\Models\\User', 7, 'authToken', 'b440d08ccc31e0dfdfa745ff018de8cc48a097b841616bcf15177161d74c3c39', '[\"*\"]', '2024-11-10 08:26:01', NULL, '2024-11-10 08:17:47', '2024-11-10 08:26:01'),
(467, 'App\\Models\\User', 7, 'authToken', '481e76c489860be9c20f6981ae3f327ea1d5bf618a21fc322afad0506f1e0201', '[\"*\"]', '2024-11-10 08:29:48', NULL, '2024-11-10 08:28:07', '2024-11-10 08:29:48'),
(468, 'App\\Models\\User', 7, 'authToken', 'ebccbe4054fa7e4206ce16c5b9ec156846b2c207cb111def9cf800fd58488d9b', '[\"*\"]', '2024-11-10 20:51:10', NULL, '2024-11-10 08:37:03', '2024-11-10 20:51:10'),
(469, 'App\\Models\\User', 7, 'authToken', '1242472d166e270a3ba995ab4d1bb1bcb319c1cb23022baee0c806f2a2e4ac8c', '[\"*\"]', '2024-11-10 23:44:51', NULL, '2024-11-10 20:51:58', '2024-11-10 23:44:51'),
(470, 'App\\Models\\User', 7, 'authToken', 'bdba431e2998f9d44c744691bfacf1884d6cd535cf0d18ae784d4ed50ea280ad', '[\"*\"]', '2024-11-11 00:57:46', NULL, '2024-11-10 23:45:32', '2024-11-11 00:57:46'),
(471, 'App\\Models\\User', 7, 'authToken', 'c404c36c49481a09a848c62a5cfd1d45a7286ef4cc1244eb70c96c522dfdc483', '[\"*\"]', '2024-11-11 01:35:36', NULL, '2024-11-11 01:29:51', '2024-11-11 01:35:36'),
(472, 'App\\Models\\User', 7, 'authToken', '33e2ba534cb2dc2bf228a3f954e4159837882921bef77025badd088c5b552beb', '[\"*\"]', '2024-11-11 08:48:40', NULL, '2024-11-11 01:35:38', '2024-11-11 08:48:40'),
(473, 'App\\Models\\User', 7, 'authToken', '32cc8239765dc78ea33d14be09869388b68f1486305b3200e80bdee60aae6f88', '[\"*\"]', '2024-11-11 02:41:01', NULL, '2024-11-11 01:54:14', '2024-11-11 02:41:01'),
(474, 'App\\Models\\User', 7, 'authToken', 'ba189282f7825c6f1ae7872dea1831bea6a5d04b6cd7f0afe1f3666181cf2ff5', '[\"*\"]', '2024-11-11 05:25:41', NULL, '2024-11-11 02:43:30', '2024-11-11 05:25:41'),
(475, 'App\\Models\\User', 7, 'API Token', '4167136f8c8ccd23c977ceb11d0dda823eef1a86b00d7e48bc32307b8b9c4f59', '[\"*\"]', NULL, NULL, '2024-11-11 20:58:39', '2024-11-11 20:58:39'),
(476, 'App\\Models\\User', 7, 'API Token', '972c078f8e62c79d8d733ec911e0f58077611158bdd81f01f78b3649bd4523f0', '[\"*\"]', NULL, NULL, '2024-11-12 00:55:39', '2024-11-12 00:55:39'),
(477, 'App\\Models\\User', 7, 'API Token', 'ddfcdea9107b01c2dd1a0b6556724455eb3a464e30e60992576a456fcc221b1c', '[\"*\"]', '2024-11-12 01:35:21', NULL, '2024-11-12 00:58:37', '2024-11-12 01:35:21'),
(478, 'App\\Models\\User', 7, 'API Token', 'a9d77b3272f489239a0dfa6634dd44cd5e57b8fcdc897a138ad563fbf8154c56', '[\"*\"]', NULL, NULL, '2024-11-12 00:59:21', '2024-11-12 00:59:21'),
(479, 'App\\Models\\User', 7, 'API Token', '54c8a659414836076b0b31bbcc566bf3e4b2a275605da054217715971dd7ce0d', '[\"*\"]', NULL, NULL, '2024-11-12 01:08:13', '2024-11-12 01:08:13'),
(480, 'App\\Models\\User', 7, 'API Token', '88aefda931d43caa5fd31bbc6ba45998b03446612981bfbade92bba5214d9a45', '[\"*\"]', '2024-11-12 01:59:41', NULL, '2024-11-12 01:35:29', '2024-11-12 01:59:41'),
(481, 'App\\Models\\User', 7, 'API Token', 'edc2fd6804769741cf6a0597e45ef4eacd1904bad1be07ce160141f1c51c252c', '[\"*\"]', NULL, NULL, '2024-11-12 01:53:14', '2024-11-12 01:53:14'),
(482, 'App\\Models\\User', 7, 'API Token', '17caa4c9db9e863a874781e03e3cdd14e78e2fca8b1f4363bfb12ec1b904e54e', '[\"*\"]', '2024-11-14 23:29:12', NULL, '2024-11-12 08:55:39', '2024-11-14 23:29:12'),
(483, 'App\\Models\\User', 7, 'API Token', 'ec7e80e23862d086cd5a68c229f616093c007b2434010a63707a6c6863a8f440', '[\"*\"]', NULL, NULL, '2024-11-12 08:57:18', '2024-11-12 08:57:18'),
(484, 'App\\Models\\User', 1, 'API Token', '7a3fe51f557bcf42fb10ef9a2cc92ea0c17658cf924f6e70465b9dff4d2f7ebd', '[\"*\"]', '2024-11-12 09:48:55', NULL, '2024-11-12 09:48:49', '2024-11-12 09:48:55'),
(485, 'App\\Models\\User', 7, 'API Token', '16e076a0d08ca09395f4e2368e4976aae674eade984afe34671f247d6c7c1800', '[\"*\"]', '2024-11-12 09:55:23', NULL, '2024-11-12 09:51:30', '2024-11-12 09:55:23'),
(486, 'App\\Models\\User', 7, 'API Token', '2550a61b157916a7d8b77c12d1ea3224f7179ca6a6864fac94cab11fbbca0a8a', '[\"*\"]', '2024-11-12 10:03:08', NULL, '2024-11-12 09:55:36', '2024-11-12 10:03:08'),
(487, 'App\\Models\\User', 7, 'API Token', 'afca98c20fcc2878f8fd68b731e03b5782b46595758de60445f4f1991c33ab5c', '[\"*\"]', '2024-11-14 22:54:03', NULL, '2024-11-14 22:53:48', '2024-11-14 22:54:03'),
(488, 'App\\Models\\User', 7, 'API Token', '7b59c95cc21c1b3cabe93f0885858612f9473f1862c5e7e21cf7b86682799060', '[\"*\"]', '2024-11-14 23:50:20', NULL, '2024-11-14 23:29:20', '2024-11-14 23:50:20'),
(489, 'App\\Models\\User', 7, 'API Token', '12b427ed2dae2bb2bbeec457a5dc368f02bb938951eab161541fa43316ffa136', '[\"*\"]', '2024-11-14 23:54:22', NULL, '2024-11-14 23:48:07', '2024-11-14 23:54:22'),
(490, 'App\\Models\\User', 7, 'API Token', 'e3ba2df05ecae109a4ae60c5036527cf7ba9241b6baef26141666d0bdac0ec42', '[\"*\"]', '2024-11-14 23:50:24', NULL, '2024-11-14 23:50:12', '2024-11-14 23:50:24'),
(491, 'App\\Models\\User', 7, 'API Token', '619367848c3a761968cd2daf1b5c99f81c4a155c55c870e6c83e8f55f808c01d', '[\"*\"]', '2024-11-14 23:54:47', NULL, '2024-11-14 23:54:40', '2024-11-14 23:54:47'),
(492, 'App\\Models\\User', 7, 'API Token', 'bf400759e55e0dcad7b03a19f4b213fc824f37349cc74ac1df33f77cfe7f73f5', '[\"*\"]', NULL, NULL, '2024-11-14 23:55:55', '2024-11-14 23:55:55'),
(493, 'App\\Models\\User', 7, 'API Token', 'ab1356dc5197cc07d609949c67ad250bd0c0cfdb1b118e3945e8473cb8a679e4', '[\"*\"]', NULL, NULL, '2024-11-15 01:21:19', '2024-11-15 01:21:19'),
(494, 'App\\Models\\User', 7, 'API Token', 'bd503ba2c18a4896a55ab75d67c382d30ad9dc58a928b45a84bb1deec965c0af', '[\"*\"]', NULL, NULL, '2024-11-15 03:11:55', '2024-11-15 03:11:55'),
(495, 'App\\Models\\User', 7, 'API Token', 'd8ef60aa565e0de366818c63cc2a7e3f70a3797dbe6c984ea9795b60e60ff5f9', '[\"*\"]', NULL, NULL, '2024-11-15 03:12:20', '2024-11-15 03:12:20'),
(496, 'App\\Models\\User', 7, 'API Token', '3266f9f207780fff2e4e4bb3ab4accb7d8f1edee8614be43464e10936c484cd6', '[\"*\"]', NULL, NULL, '2024-11-15 05:02:48', '2024-11-15 05:02:48'),
(497, 'App\\Models\\User', 7, 'API Token', '2c4053a35f7481142a79dfe9b578d41692e7a9a12ce1515efe2633f04ba584c7', '[\"*\"]', NULL, NULL, '2024-11-15 05:10:58', '2024-11-15 05:10:58'),
(498, 'App\\Models\\User', 7, 'API Token', '2711f9a94872cadffba9d61d5a4f1be14bd9ad8c42db91cf39ff29d35569d70a', '[\"*\"]', NULL, NULL, '2024-11-15 05:20:14', '2024-11-15 05:20:14'),
(499, 'App\\Models\\User', 7, 'API Token', '1312bbc9754c3c320f205dd737c84f7b1edcd08e8ff9e122fa1e3143a48120ce', '[\"*\"]', NULL, NULL, '2024-11-15 05:23:29', '2024-11-15 05:23:29'),
(500, 'App\\Models\\User', 7, 'API Token', 'd1faffcabfefccb0d4ebade05d03f7758afa7aaf8c4b5ef5921338691930c63a', '[\"*\"]', NULL, NULL, '2024-11-15 05:28:02', '2024-11-15 05:28:02'),
(501, 'App\\Models\\User', 7, 'API Token', 'a8e76b686bd5a72f468c90cf57b3b5d89863f11265f0dc4883e1b406a3d5427f', '[\"*\"]', NULL, NULL, '2024-11-15 05:32:28', '2024-11-15 05:32:28'),
(502, 'App\\Models\\User', 7, 'API Token', '848e4bc37bd0fb998727b6dbc643be40175c5d0a83e19ebc1d1d5a8d51bdf88f', '[\"*\"]', NULL, NULL, '2024-11-15 05:36:00', '2024-11-15 05:36:00'),
(503, 'App\\Models\\User', 7, 'API Token', 'b49ba9e6b6ec69adfed2a812f41a30fac4cfc1c3c60a4ce50d8f277adb695522', '[\"*\"]', NULL, NULL, '2024-11-15 05:37:45', '2024-11-15 05:37:45'),
(504, 'App\\Models\\User', 7, 'API Token', 'eb710bd4580d3cd0e58522634b8feae134e5b5025ff783da4b8e3bdb6d966e95', '[\"*\"]', '2024-11-16 22:37:33', NULL, '2024-11-15 05:46:44', '2024-11-16 22:37:33'),
(505, 'App\\Models\\User', 7, 'API Token', '3e2d840ce54d83266121731d9e7da32121368dfa5a8f943916b01a3f97478269', '[\"*\"]', '2024-11-24 05:58:05', NULL, '2024-11-15 05:50:01', '2024-11-24 05:58:05'),
(506, 'App\\Models\\User', 1, 'API Token', '8466b72892063c9fc049d1720e6bf7e95ef5fddf2f3e1194521ef9e0c06f2cc3', '[\"*\"]', '2024-11-15 22:35:39', NULL, '2024-11-15 20:49:02', '2024-11-15 22:35:39'),
(507, 'App\\Models\\User', 7, 'API Token', '85c9014c9014d47b17c3f95b8bba8eb830cdef1f59a35f7d785416498a65717d', '[\"*\"]', '2024-11-15 23:02:26', NULL, '2024-11-15 23:02:02', '2024-11-15 23:02:26'),
(508, 'App\\Models\\User', 1, 'API Token', '0a488e3a5b9df94f20f1758248ab0af53aac1f7137cd7eea6eb2a33ae0c6ae13', '[\"*\"]', '2024-11-15 23:02:51', NULL, '2024-11-15 23:02:48', '2024-11-15 23:02:51'),
(509, 'App\\Models\\User', 1, 'API Token', '2a1afbfb35b674668ee646f5174684f7c730a82b5cd08ba58a52b2b9b3e4c43a', '[\"*\"]', '2024-11-16 22:29:22', NULL, '2024-11-15 23:08:58', '2024-11-16 22:29:22'),
(510, 'App\\Models\\User', 1, 'API Token', '6393e48951ebdfe476aa2bbdf0ab6450a61125a1aa779b23048d82cc7388397e', '[\"*\"]', '2024-11-16 22:52:17', NULL, '2024-11-16 22:33:41', '2024-11-16 22:52:17'),
(511, 'App\\Models\\User', 7, 'API Token', '80534f64490c385e09464e38a4809b5c70fd0d44d646bdd6b8a2e0505b46e8fb', '[\"*\"]', '2024-11-17 03:53:12', NULL, '2024-11-17 01:14:22', '2024-11-17 03:53:12'),
(512, 'App\\Models\\User', 1, 'API Token', '18c5ff1cbc4311fb14fc22474848eb02391f14de5c201d9c6e810c8cf1068285', '[\"*\"]', '2024-11-17 04:14:06', NULL, '2024-11-17 01:14:32', '2024-11-17 04:14:06'),
(513, 'App\\Models\\User', 1, 'API Token', '3ba33818204cecabcb549fdc250e26609e494de202284b133c13c5d208e5194a', '[\"*\"]', '2024-11-17 04:34:35', NULL, '2024-11-17 04:15:28', '2024-11-17 04:34:35'),
(514, 'App\\Models\\User', 1, 'API Token', '310476f073356ba0e1bbf5238463848519a592e4fdbaf1a34ea0f4934f00253b', '[\"*\"]', '2024-11-17 06:21:18', NULL, '2024-11-17 04:35:21', '2024-11-17 06:21:18'),
(515, 'App\\Models\\User', 7, 'API Token', 'f0a89d17d437d55da7128d2a10b464ad8ce3ad285fd4f01ae9a0ad2dce790260', '[\"*\"]', '2024-11-17 09:37:40', NULL, '2024-11-17 08:32:13', '2024-11-17 09:37:40'),
(516, 'App\\Models\\User', 1, 'API Token', '29757c295b2f0c566b41a8212e751c716cb25092bbab4ad4959084fdc64626f0', '[\"*\"]', '2024-11-18 03:29:05', NULL, '2024-11-17 08:32:41', '2024-11-18 03:29:05'),
(517, 'App\\Models\\User', 1, 'API Token', '3ef515f218f5b8df6f473d310ccf0c4c58f730a76a9afd73b7a55685bf9515fc', '[\"*\"]', '2024-11-18 21:04:15', NULL, '2024-11-18 08:39:23', '2024-11-18 21:04:15'),
(518, 'App\\Models\\User', 1, 'API Token', '8ea1708f297f3b696eb687f836322f0f8438ee0595d13a5b46962616deb24312', '[\"*\"]', '2024-11-19 00:55:50', NULL, '2024-11-18 21:15:51', '2024-11-19 00:55:50'),
(519, 'App\\Models\\User', 1, 'API Token', '2ee86a03c4ab972f370aa61c364413c28a7f09811e143f9e770f1b5635c5c357', '[\"*\"]', '2024-11-19 01:48:04', NULL, '2024-11-19 00:57:51', '2024-11-19 01:48:04'),
(520, 'App\\Models\\User', 1, 'API Token', '5d1aac28b67ff030eb3c21789ccdaf292273dc3c6dc809ffff0662c7088237ce', '[\"*\"]', '2024-11-19 09:53:58', NULL, '2024-11-19 09:07:47', '2024-11-19 09:53:58'),
(521, 'App\\Models\\User', 7, 'API Token', '84e43f45e79e83be7e08ccbf2c6cf51edfc882754b54bd40c4fb6d6a96c862fe', '[\"*\"]', '2024-11-19 10:03:06', NULL, '2024-11-19 09:49:38', '2024-11-19 10:03:06'),
(522, 'App\\Models\\User', 7, 'API Token', '644d7b07385856fec94790c04211c64e3a47844cd57108fa3b2883f152a7a11b', '[\"*\"]', '2024-11-19 10:15:15', NULL, '2024-11-19 10:05:15', '2024-11-19 10:15:15'),
(523, 'App\\Models\\User', 7, 'API Token', '81c0e8d81496f1f5cf72cd8690e6b553e7d1e9478896f09517a3d05bb53bc861', '[\"*\"]', '2024-11-19 10:23:48', NULL, '2024-11-19 10:15:19', '2024-11-19 10:23:48'),
(524, 'App\\Models\\User', 7, 'API Token', '9a36d7a0699836f04dd88b19a350b862a7688728a00944d398ea23e9f352f2c9', '[\"*\"]', '2024-11-19 23:32:15', NULL, '2024-11-19 10:23:51', '2024-11-19 23:32:15'),
(525, 'App\\Models\\User', 7, 'API Token', '330f317ec9159d43280700bf4771283c8feeb274b81da579d581252354d4c7c1', '[\"*\"]', '2024-11-20 06:57:34', NULL, '2024-11-19 23:32:28', '2024-11-20 06:57:34'),
(526, 'App\\Models\\User', 1, 'API Token', '77c2b06a833e16e911e877608dbb04d62d4ce0edf4df27317ca3e69d541956f1', '[\"*\"]', '2024-11-20 06:16:30', NULL, '2024-11-20 04:42:21', '2024-11-20 06:16:30'),
(527, 'App\\Models\\User', 7, 'API Token', '748921c09fe58a04568449388f778d5858d610d67fcebe41dbc543fbeee694e3', '[\"*\"]', '2024-11-21 01:03:59', NULL, '2024-11-20 20:15:53', '2024-11-21 01:03:59'),
(528, 'App\\Models\\User', 1, 'API Token', '6c2a5d267c7124dd24b06cf6c12aed272dbf30a2180f99214a7ce9c6db61d0f7', '[\"*\"]', '2024-11-21 01:33:37', NULL, '2024-11-21 01:26:00', '2024-11-21 01:33:37'),
(529, 'App\\Models\\User', 7, 'API Token', 'd196945f0a1b9656fc98540772d701f397a3e02f62d1ee22ff726917519e1dc7', '[\"*\"]', '2024-11-22 00:19:04', NULL, '2024-11-21 08:05:35', '2024-11-22 00:19:04'),
(530, 'App\\Models\\User', 1, 'API Token', '32cadbe6c2372186dfff4bb2ce15f3ab4181fc4fa028118ae24f885a0b6ceb87', '[\"*\"]', '2024-11-22 00:09:33', NULL, '2024-11-21 08:41:34', '2024-11-22 00:09:33'),
(531, 'App\\Models\\User', 1, 'API Token', 'ae00dc8a28b2fabeac909b43589d2529ee039164a1c458e196ded4824ae43c0f', '[\"*\"]', '2024-11-23 06:22:30', NULL, '2024-11-22 08:43:00', '2024-11-23 06:22:30'),
(532, 'App\\Models\\User', 7, 'API Token', '628bf376bff305331709bf6ee11f711ffc6d7bf0c12700336679b64e47a78fe7', '[\"*\"]', '2024-11-23 06:25:30', NULL, '2024-11-23 00:45:25', '2024-11-23 06:25:30'),
(533, 'App\\Models\\User', 1, 'API Token', 'bf5543ccf48ee742ee35114ba0e1c00f7eea870806dd27676b9bc0b802e09650', '[\"*\"]', '2024-11-24 00:03:37', NULL, '2024-11-23 07:13:34', '2024-11-24 00:03:37'),
(534, 'App\\Models\\User', 1, 'API Token', '61b507022d7d8240d1622a83396f160baaabcfd4a8acbebb9cd37395328f5d58', '[\"*\"]', '2024-11-24 00:22:41', NULL, '2024-11-24 00:05:49', '2024-11-24 00:22:41'),
(535, 'App\\Models\\User', 1, 'API Token', '46aa51376b2b62c085d2040727c0b67560f34fdf67fac6ca56a10b7202b6f76b', '[\"*\"]', '2024-11-24 05:38:41', NULL, '2024-11-24 05:35:46', '2024-11-24 05:38:41'),
(536, 'App\\Models\\User', 7, 'API Token', 'bdb96671f8bc62678181b2db221a115988c8035d5ae4774ad8dd0b60d088a0de', '[\"*\"]', '2024-11-24 05:38:49', NULL, '2024-11-24 05:38:46', '2024-11-24 05:38:49'),
(537, 'App\\Models\\User', 1, 'API Token', '68a3415e029e1420e51b2940f2a79508d1bbba73b500d79ec45b98dff6853085', '[\"*\"]', '2024-11-24 05:44:16', NULL, '2024-11-24 05:42:57', '2024-11-24 05:44:16'),
(538, 'App\\Models\\User', 1, 'API Token', '15d52b0fcd822043c896b7e066f5d2ea6282c6e2eaeae49a07fbe1176d74c55d', '[\"*\"]', '2024-11-24 05:45:47', NULL, '2024-11-24 05:45:45', '2024-11-24 05:45:47'),
(539, 'App\\Models\\User', 1, 'API Token', '6759ebfb0ab44e9e27360564114eb9e6c74f362bfdb9464ae08a2842e8bc8d23', '[\"*\"]', '2024-11-24 06:13:02', NULL, '2024-11-24 05:46:06', '2024-11-24 06:13:02'),
(540, 'App\\Models\\User', 7, 'API Token', '2aecfb74873259d3d0733e8dc17e7d66fddae539e5b8a924c8cb1aa82f3155cd', '[\"*\"]', '2024-11-24 06:03:16', NULL, '2024-11-24 05:48:27', '2024-11-24 06:03:16'),
(541, 'App\\Models\\User', 7, 'API Token', 'fb946ca01d4b6719c615408ab6701781342b08067602a293f62f6a3a5f3869a9', '[\"*\"]', NULL, NULL, '2024-11-24 05:57:56', '2024-11-24 05:57:56'),
(542, 'App\\Models\\User', 1, 'API Token', '1223a21a29abd800b8dac5c0c8d46067c1cfa906d77b16c4cae26cb82db9c6f2', '[\"*\"]', '2024-11-24 06:30:37', NULL, '2024-11-24 06:28:53', '2024-11-24 06:30:37'),
(543, 'App\\Models\\User', 7, 'API Token', 'd21a1d425940f5f151c41015524b29c55e10409c03b7ea0e8279e8e34b821d14', '[\"*\"]', '2024-11-24 06:31:29', NULL, '2024-11-24 06:31:00', '2024-11-24 06:31:29'),
(544, 'App\\Models\\User', 1, 'API Token', '90cea1f78d7e64bb0c58f3dac7ffc8819ed8c26ca36dff11e494db31508cefd7', '[\"*\"]', '2024-11-25 00:19:39', NULL, '2024-11-24 06:32:02', '2024-11-25 00:19:39'),
(545, 'App\\Models\\User', 7, 'API Token', '4cce259b6ff7505b30cfc19aadfdbfea3a852a93544f97a0b08753cce98562b5', '[\"*\"]', '2024-11-24 23:04:28', NULL, '2024-11-24 06:32:23', '2024-11-24 23:04:28'),
(546, 'App\\Models\\User', 1, 'API Token', '365370eea6e08a811dc28de75b201523bd9e4bb764853fce790b54353c008874', '[\"*\"]', '2024-11-25 01:12:14', NULL, '2024-11-25 01:10:31', '2024-11-25 01:12:14'),
(547, 'App\\Models\\User', 7, 'API Token', '2df7157211a9c9fc0b2f01c24706d8afbdaff75ddbce0e26585637f95a8cdc25', '[\"*\"]', '2024-11-25 01:13:26', NULL, '2024-11-25 01:12:51', '2024-11-25 01:13:26'),
(548, 'App\\Models\\User', 1, 'API Token', 'e0d0602b655f920b5f046166e9c86ecbe35fc190e4ee6d5193963bbde519e3df', '[\"*\"]', '2024-11-26 04:00:59', NULL, '2024-11-25 01:13:58', '2024-11-26 04:00:59'),
(549, 'App\\Models\\User', 7, 'API Token', '3fb324dfa9703b44772eaa078570fd7a6ba00fcf5f932932c6b2213b571116e3', '[\"*\"]', '2024-11-25 02:36:56', NULL, '2024-11-25 01:22:10', '2024-11-25 02:36:56'),
(550, 'App\\Models\\User', 1, 'API Token', 'a09a3be64e5ac6e33943f3663d9ca0ed15af97126c839ee4badb6dc460a7818e', '[\"*\"]', '2024-12-05 04:56:35', NULL, '2024-11-25 03:17:28', '2024-12-05 04:56:35'),
(551, 'App\\Models\\User', 1, 'API Token', 'acd89d448169deda9e2f7838d24206ec197d228ccc459e0505b0b24632811ee5', '[\"*\"]', '2024-11-26 09:35:20', NULL, '2024-11-26 09:07:10', '2024-11-26 09:35:20'),
(552, 'App\\Models\\User', 1, 'API Token', 'f4752489c2e104b63b1c19d9936357a287375d38bb7f8e6d300ff7f5ae31b52a', '[\"*\"]', '2024-11-26 23:02:31', NULL, '2024-11-26 20:48:43', '2024-11-26 23:02:31'),
(553, 'App\\Models\\User', 7, 'API Token', '4b39d7c39c38e7f80e1b0ffb3e286693d245f86584d0ac8258d688854c508663', '[\"*\"]', '2024-11-26 23:03:17', NULL, '2024-11-26 23:03:07', '2024-11-26 23:03:17'),
(554, 'App\\Models\\User', 7, 'API Token', '7d0a2f0181f985ae6f0ffac01fce228d81530ab38005ad2e303003eb61696dd0', '[\"*\"]', '2024-11-27 01:00:24', NULL, '2024-11-27 00:41:00', '2024-11-27 01:00:24'),
(555, 'App\\Models\\User', 1, 'API Token', '693635b0df7c886bbd173a9130390cda760534c21fd32ee1416e8de76712fca7', '[\"*\"]', '2024-11-27 00:41:32', NULL, '2024-11-27 00:41:30', '2024-11-27 00:41:32'),
(556, 'App\\Models\\User', 7, 'API Token', 'd1a57aa6aecf3dc5dec91e3e9ac1d9b88a3165709a797128cdd5b8c58804fb3c', '[\"*\"]', '2024-11-27 04:45:41', NULL, '2024-11-27 02:28:46', '2024-11-27 04:45:41'),
(557, 'App\\Models\\User', 7, 'API Token', 'd5aa256c377fd9dae248f029a5625332efe4b0d334348a0bb730ba03982090e1', '[\"*\"]', '2024-11-27 22:12:42', NULL, '2024-11-27 04:53:26', '2024-11-27 22:12:42'),
(558, 'App\\Models\\User', 7, 'API Token', '69e9fe19a13cdf4dab79bb1e52cdf1b7b08b78b3c19ab546d56a3f2b9f39ae99', '[\"*\"]', '2024-11-28 00:02:50', NULL, '2024-11-27 23:34:00', '2024-11-28 00:02:50'),
(559, 'App\\Models\\User', 7, 'API Token', '1bb3fef8a0b95bcd7dfa68f21c3efee3d5bf83bd1ea805138ca988c95fd25028', '[\"*\"]', NULL, NULL, '2024-11-28 00:13:56', '2024-11-28 00:13:56'),
(560, 'App\\Models\\User', 7, 'API Token', '5b671faf1bc6c3c72c624c2040f665350e10d2f100ecaf60f41a0371d6faa05e', '[\"*\"]', NULL, NULL, '2024-11-28 00:16:16', '2024-11-28 00:16:16'),
(561, 'App\\Models\\User', 7, 'API Token', '5fea6a345e30ffb627dc8961c284757f58305a8b5f2716e7f15895c517b74688', '[\"*\"]', NULL, NULL, '2024-11-28 00:18:07', '2024-11-28 00:18:07'),
(562, 'App\\Models\\User', 7, 'API Token', '4cdc92f34da7a987c4fc0a01a4eadc9b38edb3c979a524ce256120ac846bb041', '[\"*\"]', NULL, NULL, '2024-11-28 00:18:40', '2024-11-28 00:18:40'),
(563, 'App\\Models\\User', 7, 'API Token', '375b76cfd26b22b511ccef19e6155dd8e01f1f93537e3f24ad397d486e8aa79f', '[\"*\"]', NULL, NULL, '2024-11-28 00:18:53', '2024-11-28 00:18:53'),
(564, 'App\\Models\\User', 7, 'API Token', '208100ec39051dbf95835d6ea835bc2dc313c07bd128b71c29d71677220f5c8b', '[\"*\"]', '2024-11-28 00:51:50', NULL, '2024-11-28 00:31:11', '2024-11-28 00:51:50'),
(565, 'App\\Models\\User', 7, 'API Token', '67d398da03d5a52180d69af32398408cc24e486bc0f6f8d1c2d8a14ecaabed02', '[\"*\"]', '2024-11-28 23:55:01', NULL, '2024-11-28 21:37:06', '2024-11-28 23:55:01'),
(566, 'App\\Models\\User', 1, 'API Token', '67415dd64e48757dc940023e64984b6769956e4db3a1e63001cb0bfc940b48d9', '[\"*\"]', '2024-11-28 23:55:04', NULL, '2024-11-28 21:37:42', '2024-11-28 23:55:04'),
(567, 'App\\Models\\User', 1, 'API Token', 'f6546b27a7fb50d83b69947d2a906e35598146b01d5737342b46fd0d36769f5e', '[\"*\"]', '2024-11-28 23:58:37', NULL, '2024-11-28 23:57:02', '2024-11-28 23:58:37'),
(568, 'App\\Models\\User', 7, 'API Token', 'ac144a9dc1c0dbf601b51ac511e3e67bd54b59d23a92307c422902689d3e60ab', '[\"*\"]', '2024-11-29 00:00:40', NULL, '2024-11-28 23:59:05', '2024-11-29 00:00:40'),
(569, 'App\\Models\\User', 7, 'API Token', '9253cb4e17729ac237427cec58fad0d54c26d0e6368385f4986c46a6670a381f', '[\"*\"]', '2024-11-29 00:14:56', NULL, '2024-11-29 00:00:58', '2024-11-29 00:14:56'),
(570, 'App\\Models\\User', 1, 'API Token', 'd305d185a3801d235e3d2879b712ea3cefabbcd271025ea8c699aadf268ea950', '[\"*\"]', '2024-11-29 00:03:00', NULL, '2024-11-29 00:01:33', '2024-11-29 00:03:00'),
(571, 'App\\Models\\User', 7, 'API Token', '909a14edff212e2dbc770e6386b0d84f1538e0b9665e2755f9b25a5268b2e16f', '[\"*\"]', '2024-11-29 00:16:37', NULL, '2024-11-29 00:15:03', '2024-11-29 00:16:37'),
(572, 'App\\Models\\User', 7, 'API Token', '7fdaf74b3a8b36b265dc4224211a105e18637e235080028d24d0c804eb38432f', '[\"*\"]', '2024-11-29 00:18:32', NULL, '2024-11-29 00:16:50', '2024-11-29 00:18:32'),
(573, 'App\\Models\\User', 7, 'API Token', 'f4667a42076db4ad5b37a5ba834094355aeaede85eaeb3f9e6d495ad29d98c29', '[\"*\"]', '2024-11-29 00:19:49', NULL, '2024-11-29 00:18:50', '2024-11-29 00:19:49'),
(574, 'App\\Models\\User', 7, 'API Token', '791b48cc5069f835a33cc36afa63985580eb2352e06507074f9e1a277cf7fd5c', '[\"*\"]', '2024-11-29 01:34:26', NULL, '2024-11-29 01:33:52', '2024-11-29 01:34:26'),
(575, 'App\\Models\\User', 1, 'API Token', 'e5fc730f05db60341b732b201159a4f24bbaa0ada1eeb1d2b22f9041550828cf', '[\"*\"]', '2024-11-29 01:38:21', NULL, '2024-11-29 01:36:34', '2024-11-29 01:38:21'),
(576, 'App\\Models\\User', 7, 'API Token', '937adadb0b52f495e832e9aafe7e2e6cb08abae4e5af6ded1d4347cd83a9fc05', '[\"*\"]', '2024-11-29 01:41:11', NULL, '2024-11-29 01:38:55', '2024-11-29 01:41:11'),
(577, 'App\\Models\\User', 7, 'API Token', 'a6765380246b9a22a126a52c117b0254025383f0ae38bc6ca257baa7c3461a5f', '[\"*\"]', '2024-11-29 01:41:26', NULL, '2024-11-29 01:41:21', '2024-11-29 01:41:26'),
(578, 'App\\Models\\User', 1, 'API Token', '234e6a7dc2dc35764b64fed810c5b55f265a5bc89ccbd87920773049798df0dd', '[\"*\"]', '2024-11-29 01:43:27', NULL, '2024-11-29 01:42:03', '2024-11-29 01:43:27'),
(579, 'App\\Models\\User', 7, 'API Token', 'd721a7c5b77998775e63edf8848e96c5d7e363a05e06bdcfc28d064cc992f17e', '[\"*\"]', '2024-11-29 01:43:59', NULL, '2024-11-29 01:43:42', '2024-11-29 01:43:59'),
(580, 'App\\Models\\User', 1, 'API Token', '884d972ea239182a77bd271ce6a1d208613fb0c6ee090ca31d3b38304549904c', '[\"*\"]', '2024-11-29 07:02:25', NULL, '2024-11-29 05:41:47', '2024-11-29 07:02:25'),
(581, 'App\\Models\\User', 1, 'API Token', 'e19582c3f1e2d0b64e10a9c741e482593bdf47b3056095af81429d5f594892a4', '[\"*\"]', '2024-12-01 07:58:36', NULL, '2024-11-29 09:32:56', '2024-12-01 07:58:36'),
(582, 'App\\Models\\User', 1, 'API Token', 'ea52a3909d296b16dea0b4e641e1d9b485039b9a9ea72d0a6c7e91ef058e1377', '[\"*\"]', '2024-12-01 23:25:36', NULL, '2024-12-01 20:35:44', '2024-12-01 23:25:36'),
(583, 'App\\Models\\User', 1, 'API Token', '795054421dff8ebf33eeeedc9276e9f58b557f06032878b2a8663e4bea4dd40e', '[\"*\"]', '2024-12-02 06:10:40', NULL, '2024-12-02 06:08:07', '2024-12-02 06:10:40'),
(584, 'App\\Models\\User', 7, 'API Token', 'cbc957066f0f64f41220b96a5d82edd2df04c6586d883c50f1ba3265a5a4c77a', '[\"*\"]', '2024-12-02 10:09:40', NULL, '2024-12-02 09:43:14', '2024-12-02 10:09:40'),
(585, 'App\\Models\\User', 7, 'API Token', '90ec6e71da0f7b6e5f3f970a7b79686c8a5d19a98a3d4d0efaf320b67b077cbd', '[\"*\"]', '2024-12-02 20:19:02', NULL, '2024-12-02 20:18:57', '2024-12-02 20:19:02'),
(586, 'App\\Models\\User', 7, 'API Token', 'a2e518d1391d411e250a0458e5cd6fca8c42837a62033279f604de728898f337', '[\"*\"]', '2024-12-02 21:59:35', NULL, '2024-12-02 21:30:02', '2024-12-02 21:59:35'),
(587, 'App\\Models\\User', 1, 'API Token', '11e99ed2ed351ca89542e2f4a9c663dad52238629947a8bb678c82007f308ff1', '[\"*\"]', '2024-12-02 22:12:36', NULL, '2024-12-02 21:56:14', '2024-12-02 22:12:36'),
(588, 'App\\Models\\User', 7, 'API Token', 'c8242cde2553e4d3300c53cd8919d4c265ef8fb81bf24799530702240907ff13', '[\"*\"]', '2024-12-02 22:11:07', NULL, '2024-12-02 22:01:13', '2024-12-02 22:11:07'),
(589, 'App\\Models\\User', 1, 'API Token', '328fb62dac63345510cada40d06755a48cf277c5c24dcb962aa7dd77da94870e', '[\"*\"]', '2024-12-04 02:26:11', NULL, '2024-12-03 00:10:10', '2024-12-04 02:26:11'),
(590, 'App\\Models\\User', 7, 'API Token', '687fe27542e3d194c9e847d7ce7252812d2a0035f4ed880ace986540d395b4a8', '[\"*\"]', '2024-12-04 01:27:37', NULL, '2024-12-03 00:17:40', '2024-12-04 01:27:37'),
(591, 'App\\Models\\User', 1, 'API Token', 'c65547b7cffb0de5cac68adb56a15f8f528834bf4e664533ac5a9866e052bade', '[\"*\"]', '2024-12-04 07:37:50', NULL, '2024-12-04 03:00:43', '2024-12-04 07:37:50'),
(592, 'App\\Models\\User', 1, 'API Token', 'f013981f35e7561d9810749a9835e4d9184911e1ed7d06592cef819442a1ef87', '[\"*\"]', '2024-12-05 09:07:11', NULL, '2024-12-04 08:35:10', '2024-12-05 09:07:11'),
(593, 'App\\Models\\User', 1, 'API Token', '2dc9cee9b389124f757709e5058cebbf95c02d0089df9298ce3ba23c95052725', '[\"*\"]', '2024-12-06 01:13:38', NULL, '2024-12-05 19:59:11', '2024-12-06 01:13:38'),
(594, 'App\\Models\\User', 7, 'API Token', 'db4c5ff7352b921de6a896e11d47351b682240f502e43a3962b58b19ec6a7e48', '[\"*\"]', '2024-12-05 22:37:34', NULL, '2024-12-05 22:25:54', '2024-12-05 22:37:34'),
(595, 'App\\Models\\User', 1, 'API Token', '6abe6b4716f599e5c178f0f9234f377baa5be364cac2357c044f776138418f73', '[\"*\"]', '2024-12-06 06:17:37', NULL, '2024-12-06 05:32:34', '2024-12-06 06:17:37'),
(596, 'App\\Models\\User', 1, 'API Token', '9d56b0af7eda7468ae57455c30efc2907c319b6918aae3adfa82b2a894f6d46d', '[\"*\"]', '2024-12-12 08:54:07', NULL, '2024-12-11 05:55:21', '2024-12-12 08:54:07'),
(597, 'App\\Models\\User', 1, 'API Token', 'c332d7e0c8a81d23daabcb964009dedd810715db98f802468460f9f1f731af94', '[\"*\"]', '2024-12-14 23:12:36', NULL, '2024-12-11 08:39:02', '2024-12-14 23:12:36'),
(598, 'App\\Models\\User', 1, 'API Token', 'a1966e7ff37b0b85c68c75ffe2f9bf76ad3a72ac41543d99dfbe51131a0c09ab', '[\"*\"]', '2024-12-12 05:26:41', NULL, '2024-12-12 02:13:01', '2024-12-12 05:26:41'),
(599, 'App\\Models\\User', 1, 'API Token', '0f0517ffaa589f2934e316efe15272c610394c9507bae377723e46011a73cc7d', '[\"*\"]', '2024-12-12 09:14:53', NULL, '2024-12-12 09:11:46', '2024-12-12 09:14:53'),
(600, 'App\\Models\\User', 1, 'API Token', '2e7d04d83d2f0ec78732920accfd76f7db35e549c7c9c5836e77457a7ea65fd3', '[\"*\"]', '2024-12-12 09:20:19', NULL, '2024-12-12 09:16:23', '2024-12-12 09:20:19'),
(601, 'App\\Models\\User', 1, 'API Token', 'e1716f000710ebfdcd7f8315906285e7a0b555771c0fd9158a54daf3810d794f', '[\"*\"]', NULL, NULL, '2024-12-12 09:26:46', '2024-12-12 09:26:46'),
(602, 'App\\Models\\User', 1, 'API Token', '7baf6459cbd9e39eca63dab6872a5de731d8653b1c9c22996cd606ca48c1c986', '[\"*\"]', NULL, NULL, '2024-12-12 21:02:09', '2024-12-12 21:02:09'),
(603, 'App\\Models\\User', 1, 'API Token', '0311441f17234a14e8b2afa2b303349e33edb7352057264e01b6a40c23e88211', '[\"*\"]', NULL, NULL, '2024-12-12 22:18:58', '2024-12-12 22:18:58'),
(604, 'App\\Models\\User', 8, 'API Token', 'f96a2757712c2528678915587151c2f311ffa8ed04570b3d9df17abfaa92e709', '[\"*\"]', NULL, NULL, '2024-12-12 22:34:20', '2024-12-12 22:34:20'),
(605, 'App\\Models\\User', 1, 'API Token', '450ea032d00bae2197b835a1380820d774dfdca4b09fd7b7d5148cffe2664728', '[\"*\"]', NULL, NULL, '2024-12-12 22:37:48', '2024-12-12 22:37:48'),
(606, 'App\\Models\\User', 1, 'API Token', 'aa651de7529bae2f88a5fdbef07309cc5d2acabc77a70d4e71764cf3b878fedc', '[\"*\"]', NULL, NULL, '2024-12-12 22:44:04', '2024-12-12 22:44:04'),
(607, 'App\\Models\\User', 1, 'API Token', 'e72db5b5300b37cd73b18c0043a1e18a84446e9d81584beb287d17c8033c1325', '[\"*\"]', NULL, NULL, '2024-12-12 22:44:13', '2024-12-12 22:44:13'),
(608, 'App\\Models\\User', 1, 'API Token', '5d748c1562b73aa304c4bb9a64e4c5cb61521783c8b50b7ee4fbff2f4cde020b', '[\"*\"]', '2024-12-12 23:04:21', NULL, '2024-12-12 22:47:26', '2024-12-12 23:04:21'),
(609, 'App\\Models\\User', 9, 'API Token', '55e04f9503b5cb736bfe8de871ef8e0cc8dce4fa9424b0cc4185915711fcdebb', '[\"*\"]', NULL, NULL, '2024-12-12 22:53:56', '2024-12-12 22:53:56'),
(610, 'App\\Models\\User', 10, 'API Token', '42077e7a1f635c43049034c9933e48c00c876c6aa8df9ce93d6e0a33acff7280', '[\"*\"]', NULL, NULL, '2024-12-12 22:56:34', '2024-12-12 22:56:34'),
(611, 'App\\Models\\User', 11, 'API Token', 'd42c20d1a2812ce1e05552b7a54561e8c70a13e384ab05ca7bfee4653660f68e', '[\"*\"]', NULL, NULL, '2024-12-12 23:02:33', '2024-12-12 23:02:33'),
(612, 'App\\Models\\User', 12, 'API Token', '2c142bbba17350a82b8aa6e235e51f48d93743b96712cfb785dcd19738ca5526', '[\"*\"]', NULL, NULL, '2024-12-12 23:04:20', '2024-12-12 23:04:20'),
(613, 'App\\Models\\User', 11, 'API Token', 'e26e6c784c0b55d65655bd6cee9dafda75ba602006ae7fe923c7e629e8f579ff', '[\"*\"]', '2024-12-13 01:28:23', NULL, '2024-12-13 01:24:16', '2024-12-13 01:28:23'),
(614, 'App\\Models\\User', 11, 'API Token', 'd843504c55e6dcedd094a01c3e651786551a90d8a7677420318efd1b3b8fe89d', '[\"*\"]', '2024-12-13 03:08:29', NULL, '2024-12-13 01:31:00', '2024-12-13 03:08:29'),
(615, 'App\\Models\\User', 11, 'API Token', '355a3c4168c32b4a6921e47e9e1c14312362ff19b57dd58e77fd0ed030d1e245', '[\"*\"]', '2024-12-13 03:09:17', NULL, '2024-12-13 03:09:16', '2024-12-13 03:09:17'),
(616, 'App\\Models\\User', 1, 'API Token', '24ee4173394b7b2bd3426ba9c053a8cac997d07a5e9dcdf0e03e76840bff0fe4', '[\"*\"]', '2024-12-14 08:59:33', NULL, '2024-12-13 03:49:25', '2024-12-14 08:59:33'),
(617, 'App\\Models\\User', 1, 'API Token', '7480bff8d4b8648180840ef4280eb9e6206da43aee4a4f1166f611abc65076fe', '[\"*\"]', '2024-12-15 03:19:58', NULL, '2024-12-14 09:09:13', '2024-12-15 03:19:58'),
(618, 'App\\Models\\User', 1, 'API Token', '0de5a9cb360176eab1449ddc9e41a94fd4b39805f3c05b3b5c1660d1656405f4', '[\"*\"]', '2024-12-15 06:07:50', NULL, '2024-12-14 23:12:50', '2024-12-15 06:07:50'),
(619, 'App\\Models\\User', 1, 'API Token', 'cf982ec58989455f313cf4674310a6375f2c9e3debc23248cd5eb2db3b06a728', '[\"*\"]', '2024-12-16 23:44:47', NULL, '2024-12-15 05:43:22', '2024-12-16 23:44:47'),
(620, 'App\\Models\\User', 11, 'API Token', '4d0bdb86a7843310d75daced062ca5a00151b2ca5d6fc60d072b7e2e70775b11', '[\"*\"]', '2024-12-16 09:01:17', NULL, '2024-12-16 09:00:57', '2024-12-16 09:01:17'),
(621, 'App\\Models\\User', 1, 'API Token', '97a2f391a98ebf7e51877695d000598167c198d1028e17bb9ae6eb8dade652b0', '[\"*\"]', '2024-12-17 05:34:47', NULL, '2024-12-16 20:03:58', '2024-12-17 05:34:47'),
(622, 'App\\Models\\User', 1, 'API Token', '085992a9eb109de0944649c3e92c3bb76b55971d7c8d73a0abf0693f9ce536b1', '[\"*\"]', '2024-12-17 02:54:40', NULL, '2024-12-16 23:59:10', '2024-12-17 02:54:40'),
(623, 'App\\Models\\User', 1, 'API Token', '3c4a2d60da5f008286c6cb5fc93ee20d0a1f99d17940e061a6b405414e3623b6', '[\"*\"]', '2024-12-18 04:58:24', NULL, '2024-12-17 03:27:57', '2024-12-18 04:58:24'),
(624, 'App\\Models\\User', 11, 'API Token', '750f27b532121184fff96abdae5eeb24a2ae5219e761749c64c24434cfe52adb', '[\"*\"]', '2024-12-18 05:24:13', NULL, '2024-12-17 20:32:28', '2024-12-18 05:24:13'),
(625, 'App\\Models\\User', 1, 'API Token', 'd78b0a656fd833f2dedadb6a4845b9c22e19f7aff9e1ba4a9ebe22615a0d46aa', '[\"*\"]', '2024-12-17 21:00:07', NULL, '2024-12-17 20:57:29', '2024-12-17 21:00:07'),
(626, 'App\\Models\\User', 1, 'API Token', '29382b2d24de195555995d3804f7a801162d0b257057262e24c3236899aadf30', '[\"*\"]', '2024-12-17 23:15:42', NULL, '2024-12-17 22:51:38', '2024-12-17 23:15:42');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(627, 'App\\Models\\User', 1, 'API Token', 'c558f6762a4716f91f4a60661fa8c81db2886eba6bb681c08a7d0b190f35b9d5', '[\"*\"]', '2024-12-18 02:52:59', NULL, '2024-12-18 02:47:44', '2024-12-18 02:52:59'),
(628, 'App\\Models\\User', 11, 'API Token', '118dd1f62aa26b427dc744e569740e78f4600491765fa94975f5b5b49f8faa45', '[\"*\"]', '2024-12-18 09:47:58', NULL, '2024-12-18 09:21:29', '2024-12-18 09:47:58'),
(629, 'App\\Models\\User', 11, 'API Token', '502a504fad706a1137a6e149ba5db471fea675044a67b014e43be5e376c43e8f', '[\"*\"]', '2024-12-19 06:25:15', NULL, '2024-12-18 21:44:28', '2024-12-19 06:25:15'),
(630, 'App\\Models\\User', 1, 'API Token', '89ea3b1f2824d0f9a4885ebeee3c621706d04ca2b7ee02d09d2217b31bbe7d53', '[\"*\"]', '2024-12-19 01:06:17', NULL, '2024-12-19 00:28:00', '2024-12-19 01:06:17'),
(631, 'App\\Models\\User', 13, 'API Token', 'b8e88f40dcdcfe4efcf9bf28bcd39211fc9c7cefc3c52fc16776f876319f91a4', '[\"*\"]', NULL, NULL, '2024-12-19 00:53:56', '2024-12-19 00:53:56'),
(632, 'App\\Models\\User', 1, 'API Token', '9929de9ea4c711a4985530178c10861c5dcc4be2c5b8cf6d92c6476142787da8', '[\"*\"]', '2024-12-19 10:20:33', NULL, '2024-12-19 10:10:09', '2024-12-19 10:20:33'),
(633, 'App\\Models\\User', 11, 'API Token', 'c5e8981247053b9b030a804e8db9354392203342c03cacf648e4dce3aaced20c', '[\"*\"]', '2024-12-19 10:12:16', NULL, '2024-12-19 10:12:09', '2024-12-19 10:12:16'),
(634, 'App\\Models\\User', 11, 'API Token', 'd541e156db75fe2f14b441a6c922a78aa91b5c9af5f411baa9a17041306e1633', '[\"*\"]', '2024-12-20 10:23:05', NULL, '2024-12-19 20:35:50', '2024-12-20 10:23:05'),
(635, 'App\\Models\\User', 11, 'API Token', 'bdc952b2ca30ca88e53b92211c19087a11c5413f9af000a4c047a2f2d05f3630', '[\"*\"]', '2024-12-21 03:40:47', NULL, '2024-12-20 20:29:13', '2024-12-21 03:40:47'),
(636, 'App\\Models\\User', 1, 'API Token', '240fcc42238b1be2117e0c0b783ab8e85f2fa2b153a432b170738e23e581ab87', '[\"*\"]', '2024-12-21 09:33:18', NULL, '2024-12-20 21:48:17', '2024-12-21 09:33:18'),
(637, 'App\\Models\\User', 13, 'API Token', '3984a5878757ac4064c8f348db0fb1ddfd1ec713314f7afa168a0e69b72aa9c5', '[\"*\"]', '2024-12-21 03:37:50', NULL, '2024-12-21 01:26:33', '2024-12-21 03:37:50'),
(638, 'App\\Models\\User', 7, 'API Token', 'f8f7c81b79eeb175e38d6f2791b97b9baf7270456d778f0728154369b379d885', '[\"*\"]', '2024-12-21 03:40:12', NULL, '2024-12-21 01:39:10', '2024-12-21 03:40:12'),
(639, 'App\\Models\\User', 1, 'API Token', 'ad158173ae06d6b82c0fdd973c8327937d16c5c6a3c396af7dc8f6bc816d7901', '[\"*\"]', '2024-12-21 04:40:48', NULL, '2024-12-21 04:36:25', '2024-12-21 04:40:48'),
(640, 'App\\Models\\User', 1, 'API Token', '4aee07a15ea6b2308d4babcdb350bc44947b06e86f2413ec50337f7cf85b8e5d', '[\"*\"]', '2024-12-22 05:25:54', NULL, '2024-12-21 20:38:48', '2024-12-22 05:25:54'),
(641, 'App\\Models\\User', 11, 'API Token', '8a0a998b3976aae18e3b35d652a4393f17fa40a3a327e28dd45ac93686582f8f', '[\"*\"]', '2024-12-22 01:57:43', NULL, '2024-12-22 01:46:04', '2024-12-22 01:57:43'),
(642, 'App\\Models\\User', 13, 'API Token', 'ff5b8beadf4a32462ddde2dd1a7b6db497dd050feeea5b1be4999bda21796ede', '[\"*\"]', '2024-12-22 01:59:35', NULL, '2024-12-22 01:58:25', '2024-12-22 01:59:35'),
(643, 'App\\Models\\User', 7, 'API Token', '86a638eca8f426e0b22f75f3a3c42befea2adfc00ca6965ebc12417af5a7f991', '[\"*\"]', '2024-12-22 02:42:12', NULL, '2024-12-22 02:42:01', '2024-12-22 02:42:12'),
(644, 'App\\Models\\User', 1, 'API Token', '4547901fb4ab01bf32354a1a6cf98fb21c5a57bab9efc511ab3a4ef2c56a1c3b', '[\"*\"]', '2024-12-22 08:50:17', NULL, '2024-12-22 08:49:45', '2024-12-22 08:50:17'),
(645, 'App\\Models\\User', 1, 'API Token', '09ed39588f62f5203ecae1203dc649ed664d0dc212917b2aea406c80787732dd', '[\"*\"]', '2024-12-23 01:02:21', NULL, '2024-12-22 23:14:26', '2024-12-23 01:02:21'),
(646, 'App\\Models\\User', 1, 'API Token', '1f1650cd9732667cb69fbfca80cf8e9bc3981ab44ad0a48c74c7e93ea3a9f72b', '[\"*\"]', '2024-12-23 20:42:28', NULL, '2024-12-23 09:04:44', '2024-12-23 20:42:28'),
(647, 'App\\Models\\User', 1, 'API Token', '6a483b91a4bdaeaf476990793c927e8371e47763ebbfd10de2149ee567fec31f', '[\"*\"]', '2024-12-25 22:10:20', NULL, '2024-12-25 20:38:29', '2024-12-25 22:10:20'),
(648, 'App\\Models\\User', 1, 'API Token', 'c2c17fe0c3532417b8c878d24953e4a076611589cfd5e668c81483c689be3dfd', '[\"*\"]', '2024-12-25 23:09:50', NULL, '2024-12-25 22:00:31', '2024-12-25 23:09:50'),
(649, 'App\\Models\\User', 1, 'API Token', '8b579fdf7d0e6811c91fb4796221741e3663dd55269db2d56015e71b181ab664', '[\"*\"]', '2024-12-30 10:34:40', NULL, '2024-12-29 20:54:32', '2024-12-30 10:34:40'),
(650, 'App\\Models\\User', 1, 'API Token', '0b3e9389f0e43249a7f54f8220f004bdbd2e692f7d80fb4f5b4899f4c3605c3a', '[\"*\"]', NULL, NULL, '2024-12-30 01:19:48', '2024-12-30 01:19:48'),
(651, 'App\\Models\\User', 1, 'API Token', '4220d18072950d06af9ac97f5e84e8f57a59a6e94e8cb76eba6214f678b06cb5', '[\"*\"]', '2024-12-30 01:37:59', NULL, '2024-12-30 01:27:43', '2024-12-30 01:37:59');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quote_type` varchar(255) NOT NULL,
  `quote_customer` varchar(255) NOT NULL,
  `quote_cust_ref_no` varchar(255) NOT NULL,
  `quote_booked_by` varchar(255) NOT NULL,
  `quote_temperature` double(8,2) DEFAULT NULL,
  `quote_hot` tinyint(1) NOT NULL DEFAULT 0,
  `quote_team` tinyint(1) NOT NULL DEFAULT 0,
  `quote_air_ride` tinyint(1) NOT NULL DEFAULT 0,
  `quote_tarp` tinyint(1) NOT NULL DEFAULT 0,
  `quote_hazmat` tinyint(1) NOT NULL DEFAULT 0,
  `quote_pickup` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`quote_pickup`)),
  `quote_delivery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`quote_delivery`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ship_load_date` date NOT NULL,
  `ship_pickup_location` varchar(255) NOT NULL,
  `ship_delivery_location` varchar(255) NOT NULL,
  `ship_driver` varchar(255) NOT NULL,
  `ship_weight` decimal(10,2) NOT NULL,
  `ship_ftl_ltl` enum('FTL','LTL') NOT NULL,
  `ship_tarp` tinyint(1) NOT NULL DEFAULT 0,
  `ship_equipment` varchar(255) DEFAULT NULL,
  `ship_price` decimal(10,2) NOT NULL,
  `ship_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT '',
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role` enum('user','admin','employee','carrier','customer') NOT NULL,
  `emp_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `role`, `emp_code`, `created_at`, `updated_at`) VALUES
(1, 'Robin', 'robinjo', 'robinjo@gmail.com', NULL, '$2y$10$6PFoTY.knAQoyM/9.hXP6uw9bMRQYf7RN0zKWg6MuOA9lXw6qJ9j6', NULL, 'admin', NULL, '2024-08-01 22:36:35', '2024-10-23 10:52:22'),
(6, 'Kuber', 'kuberja', 'kuberja@gmail.com', NULL, '$2y$10$BNJ26zTyH7/AKzfpib4s4.CfaEH7RrRNoWgfxGJOb7ZJvs9wNihYC', NULL, 'employee', NULL, '2024-10-23 00:27:22', '2024-10-23 10:51:54'),
(7, 'Daniel', 'danielja', 'danielja@gmail.com', NULL, '$2y$10$XHEo/tP7WZiu/tPCn9uTQ.FrpflkwgJ5bPeEhJB76FXrvMSeQ3Wva', NULL, 'employee', '403', '2024-10-23 01:05:53', '2024-10-23 01:05:53'),
(8, 'John Doe', 'john_doe', 'john@example.com', NULL, '$2y$10$TqBzfQyLnN9rXZZiOHhYFO388ncXKcHsKMkHNrqjjK6cPtMxEP5Sy', NULL, 'user', 'EMP001', '2024-12-12 22:34:20', '2024-12-12 22:34:20'),
(9, 'Zain', 'zain', 'zainandhera@gmail.com', NULL, '$2y$10$vJC9qCeridT9njiSOQgYtuTEZLR/05VjZkMeRdPAZRn4f2LVhZtya', NULL, 'carrier', 'CA301', '2024-12-12 22:53:56', '2024-12-12 22:53:56'),
(10, 'Carlton', 'carlton123', 'carlton123@gmail.com', NULL, '$2y$10$io6aDkYVIlyAAmBrfHRn0.NwTibntsDQfbcT.HJmXByyn2a.Hn19W', NULL, 'carrier', 'CA303', '2024-12-12 22:56:34', '2024-12-12 22:56:34'),
(11, 'Trudeau', 'trudeau123', 'trudeau123@gmail.com', NULL, '$2y$10$9oGhYdsIpzRrONZMc1La.OEArF/wc5cbTwzFtSA3an6T40bXBz2CK', NULL, 'carrier', 'CA101', '2024-12-12 23:02:33', '2024-12-12 23:02:33'),
(12, 'Paul', 'paul', 'paulsterling@gmail.com', NULL, '$2y$10$Ksg4AW6HvafqDcV8SmQTzutthLv6kGNM9uWFQsBe7wEGfYs7W94wW', NULL, 'carrier', 'CA798', '2024-12-12 23:04:20', '2024-12-12 23:04:20'),
(13, 'robin', 'robin', 'robinjo1002@rediffmail.com', NULL, '$2y$10$6ViMx8lOyse8RYBnj0FoXOnNSgnkyljkgtfDQRDOX85l101.pDeP2', NULL, 'customer', 'Ro123', '2024-12-19 00:53:56', '2024-12-19 00:53:56');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `legal_name` varchar(255) NOT NULL,
  `remit_name` varchar(255) DEFAULT NULL,
  `vendor_type` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `primary_address` varchar(255) DEFAULT NULL,
  `primary_city` varchar(255) DEFAULT NULL,
  `primary_state` varchar(255) DEFAULT NULL,
  `primary_country` varchar(255) DEFAULT NULL,
  `primary_postal` varchar(255) DEFAULT NULL,
  `primary_email` varchar(255) DEFAULT NULL,
  `primary_phone` varchar(255) DEFAULT NULL,
  `primary_fax` varchar(255) DEFAULT NULL,
  `scac` varchar(255) DEFAULT NULL,
  `docket_number` varchar(255) DEFAULT NULL,
  `vendor_code` varchar(255) DEFAULT NULL,
  `gst_hst_number` varchar(255) DEFAULT NULL,
  `qst_number` varchar(255) DEFAULT NULL,
  `ca_bond_number` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `mailing_address` varchar(255) DEFAULT NULL,
  `mailing_city` varchar(255) DEFAULT NULL,
  `mailing_state` varchar(255) DEFAULT NULL,
  `mailing_country` varchar(255) DEFAULT NULL,
  `mailing_postal` varchar(255) DEFAULT NULL,
  `mailing_email` varchar(255) DEFAULT NULL,
  `mailing_phone` varchar(255) DEFAULT NULL,
  `mailing_fax` varchar(255) DEFAULT NULL,
  `us_tax_id` varchar(255) DEFAULT NULL,
  `payroll_no` varchar(255) DEFAULT NULL,
  `wcb_no` varchar(255) DEFAULT NULL,
  `ar_name` varchar(255) DEFAULT NULL,
  `ar_email` varchar(255) DEFAULT NULL,
  `ar_contact_no` varchar(255) DEFAULT NULL,
  `ar_ext` varchar(255) DEFAULT NULL,
  `ap_name` varchar(255) DEFAULT NULL,
  `ap_email` varchar(255) DEFAULT NULL,
  `ap_contact_no` varchar(255) DEFAULT NULL,
  `ap_ext` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_phone` varchar(255) DEFAULT NULL,
  `bank_email` varchar(255) DEFAULT NULL,
  `bank_us_acc_no` varchar(255) DEFAULT NULL,
  `bank_cdn_acc_no` varchar(255) DEFAULT NULL,
  `bank_address` varchar(255) DEFAULT NULL,
  `cargo_company` varchar(255) DEFAULT NULL,
  `cargo_policy_start` date DEFAULT NULL,
  `cargo_policy_end` date DEFAULT NULL,
  `cargo_ins_amt` decimal(15,2) DEFAULT NULL,
  `liab_company` varchar(255) DEFAULT NULL,
  `liab_policy_start` date DEFAULT NULL,
  `liab_policy_end` date DEFAULT NULL,
  `liab_ins_amt` decimal(15,2) DEFAULT NULL,
  `contacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`contacts`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `type`, `legal_name`, `remit_name`, `vendor_type`, `service`, `primary_address`, `primary_city`, `primary_state`, `primary_country`, `primary_postal`, `primary_email`, `primary_phone`, `primary_fax`, `scac`, `docket_number`, `vendor_code`, `gst_hst_number`, `qst_number`, `ca_bond_number`, `website`, `mailing_address`, `mailing_city`, `mailing_state`, `mailing_country`, `mailing_postal`, `mailing_email`, `mailing_phone`, `mailing_fax`, `us_tax_id`, `payroll_no`, `wcb_no`, `ar_name`, `ar_email`, `ar_contact_no`, `ar_ext`, `ap_name`, `ap_email`, `ap_contact_no`, `ap_ext`, `bank_name`, `bank_phone`, `bank_email`, `bank_us_acc_no`, `bank_cdn_acc_no`, `bank_address`, `cargo_company`, `cargo_policy_start`, `cargo_policy_end`, `cargo_ins_amt`, `liab_company`, `liab_policy_start`, `liab_policy_end`, `liab_ins_amt`, `contacts`, `created_at`, `updated_at`) VALUES
(2, 'Carrier', 'Sealink Transport Solutions Inc.', 'Sealink Transport', 'Carrier', 'Freight', '123 Main St', 'New York', 'NY', 'USA', '10001', 'info@sealink.com', '+1-555-123-4567', '+1-555-765-4321', 'SLNK', 'D123456', 'V001', '123456789RT0001', '987654321TQ0002', 'BND98765', 'https://www.sealink.com', 'PO Box 456', 'Los Angeles', 'CA', 'USA', '90001', 'billing@sealink.com', '+1-555-987-6543', '+1-555-345-6789', '12-3456789', 'PR12345', 'WCB56789', 'Jane Doe', 'ar@sealink.com', '+1-555-111-2222', '101', 'John Smith', 'ap@sealink.com', '+1-555-333-4444', '202', 'Sealink Bank', '+1-555-555-5555', 'banking@sealinkbank.com', 'US123456789', 'CD987654321', '456 Bank Lane, Toronto, ON', 'Cargo Insure Ltd.', '2024-01-01', '2024-12-31', 500000.00, 'Liability Co.', '2024-01-01', '2024-12-31', 1000000.00, '[{\"name\":\"Alice Johnson\",\"email\":\"alice@sealink.com\",\"phone\":\"+1-555-444-5555\",\"designation\":\"Logistics Manager\"}]', '2024-12-30 01:32:20', '2024-12-30 01:37:41'),
(3, 'Warehousing', 'Storage Solutions Inc.', 'Storage Solutions', 'Warehouse Provider', 'Warehousing', '102 Warehouse Rd', 'Atlanta', 'GA', 'USA', '30301', 'info@storagesolutions.com', '+1-404-555-1234', '+1-404-555-5678', 'SSI', 'WS12345', 'V004', '334455667RT0004', '123456789TQ0005', 'BND87654', 'https://www.storagesolutions.com', 'PO Box 789', 'Miami', 'FL', 'USA', '33101', 'billing@storagesolutions.com', '+1-305-555-7890', '+1-305-555-1234', '56-7890123', 'PR78901', 'WCB23456', 'Sophia Green', 'ar@storagesolutions.com', '+1-305-555-3456', '707', 'David White', 'ap@storagesolutions.com', '+1-305-555-4567', '808', 'Storage Bank', '+1-305-555-5678', 'banking@storagebank.com', 'US765432123', 'CD654321987', '123 Bank St, Miami, FL', 'Storage Insure Ltd.', '2024-07-01', '2025-06-30', 250000.00, 'Storage Liability Co.', '2024-07-01', '2025-06-30', 600000.00, '[{\"name\":\"Olivia Williams\",\"email\":\"olivia@storagesolutions.com\",\"phone\":\"+1-404-555-6789\",\"designation\":\"Warehouse Operations Manager\"}]', '2024-12-30 01:33:31', '2024-12-30 01:33:31'),
(4, 'Transportation', 'Quick Trucking Co.', 'Quick Trucking', 'Carrier', 'Domestic Freight', '345 Highway Blvd', 'Dallas', 'TX', 'USA', '75201', 'contact@quicktrucking.com', '+1-214-555-1234', '+1-214-555-5678', 'QTC', 'QT67890', 'V005', '123987654RT0005', '345678901TQ0006', 'BND23456', 'https://www.quicktrucking.com', 'PO Box 1010', 'Austin', 'TX', 'USA', '73301', 'billing@quicktrucking.com', '+1-512-555-2345', '+1-512-555-3456', '23-4567890', 'PR23456', 'WCB34567', 'James Lee', 'ar@quicktrucking.com', '+1-512-555-5678', '909', 'Isabella Moore', 'ap@quicktrucking.com', '+1-512-555-6789', '1010', 'Quick Bank', '+1-512-555-7890', 'support@quickbank.com', 'US456123789', 'CD876543210', '789 Quick St, Austin, TX', 'CargoSecure Insurance', '2024-09-01', '2025-08-31', 500000.00, 'Quick Liability Co.', '2024-09-01', '2025-08-31', 1000000.00, '[{\"name\":\"Ethan Harris\",\"email\":\"ethan@quicktrucking.com\",\"phone\":\"+1-214-555-7890\",\"designation\":\"Fleet Operations Manager\"}]', '2024-12-30 01:33:40', '2024-12-30 01:33:40'),
(5, 'Logistics', 'Transporter Logistics Inc.', 'Transporter Logistics', 'Logistics Provider', 'Supply Chain Management', '200 Logistics Blvd', 'Chicago', 'IL', 'USA', '60601', 'info@transporterlogistics.com', '+1-312-555-5678', '+1-312-555-1234', 'TLI', 'TL20001', 'V006', '111223344RT0006', '987654321TQ0007', 'BND98765', 'https://www.transporterlogistics.com', 'PO Box 1020', 'Houston', 'TX', 'USA', '77001', 'billing@transporterlogistics.com', '+1-713-555-2345', '+1-713-555-6789', '12-34567890', 'PR11111', 'WCB76543', 'John Doe', 'ar@transporterlogistics.com', '+1-713-555-6789', '505', 'Alice Miller', 'ap@transporterlogistics.com', '+1-713-555-2345', '606', 'Transporter Bank', '+1-713-555-5678', 'banking@transporterlogistics.com', 'US1122334455', 'CA9988776655', '400 Transporter Ave, Houston, TX', 'Cargo Protect Inc.', '2024-10-01', '2025-09-30', 400000.00, 'Transporter Liability Co.', '2024-10-01', '2025-09-30', 800000.00, '[{\"name\":\"Ethan Harris\",\"email\":\"ethan@transporterlogistics.com\",\"phone\":\"+1-312-555-6789\",\"designation\":\"Logistics Coordinator\"}]', '2024-12-30 01:35:00', '2024-12-30 01:35:00'),
(6, 'Transport', 'Fleet Transport Co.', 'Fleet Transport', 'Transporter', 'International Shipping', '456 Shipping St', 'Miami', 'FL', 'USA', '33101', 'contact@fleettransport.com', '+1-305-555-9876', '+1-305-555-5432', 'FTC', 'FT10001', 'V007', '223344555RT0007', '876543210TQ0008', 'BND12345', 'https://www.fleettransport.com', 'PO Box 1050', 'San Francisco', 'CA', 'USA', '94105', 'billing@fleettransport.com', '+1-415-555-2345', '+1-415-555-6789', '23-45678901', 'PR22222', 'WCB12345', 'Michael Johnson', 'ar@fleettransport.com', '+1-415-555-6789', '303', 'Jessica Taylor', 'ap@fleettransport.com', '+1-415-555-7890', '404', 'Fleet Bank', '+1-415-555-1234', 'banking@fleetbank.com', 'US2233445566', 'CA6655443322', '123 Fleet Blvd, San Francisco, CA', 'Secure Cargo Insurance', '2024-08-01', '2025-07-31', 600000.00, 'Fleet Liability Co.', '2024-08-01', '2025-07-31', 1200000.00, '[{\"name\":\"Liam Carter\",\"email\":\"liam@fleettransport.com\",\"phone\":\"+1-305-555-6789\",\"designation\":\"Fleet Operations Manager\"}]', '2024-12-30 01:35:09', '2024-12-30 01:35:09'),
(7, 'Green Transport', 'Eco Trans Logistics', 'Eco Trans', 'Green Carrier', 'Sustainable Shipping', '123 Eco Rd', 'Seattle', 'WA', 'USA', '98001', 'contact@ecotranslogistics.com', '+1-206-555-2345', '+1-206-555-6789', 'ETL', 'ET90001', 'V008', '555666777RT0008', '223344556TQ0009', 'BND98765', 'https://www.ecotranslogistics.com', 'PO Box 2000', 'Portland', 'OR', 'USA', '97201', 'billing@ecotranslogistics.com', '+1-503-555-6789', '+1-503-555-1234', '34-5678901', 'PR33333', 'WCB43210', 'Nina Adams', 'ar@ecotranslogistics.com', '+1-503-555-2345', '505', 'Owen Davis', 'ap@ecotranslogistics.com', '+1-503-555-3456', '606', 'Eco Bank', '+1-503-555-4567', 'banking@ecobank.com', 'US1234567890', 'CA5678901234', '555 Eco St, Portland, OR', 'Eco Cargo Insurance', '2024-09-01', '2025-08-31', 350000.00, 'Eco Liability Co.', '2024-09-01', '2025-08-31', 750000.00, '[{\"name\":\"Sophia Green\",\"email\":\"sophia@ecotranslogistics.com\",\"phone\":\"+1-206-555-7890\",\"designation\":\"Environmental Compliance Officer\"}]', '2024-12-30 01:35:17', '2024-12-30 01:35:17'),
(9, 'Vendor', 'John McCain', 'John McCains', 'Shipping', 'Logistics', '48 Calle de San Vicente Ferrer', 'Madrid', 'Comunidad de Madrid', 'Spain', '28004', 'info@shippinglink.com', '+1-455-674-2466', '+1-553-255-5563', 'SHP', 'SP008701', 'V0010', '102938848402', '98373037211893', 'BND796523', 'https://www.shippinglink.com', NULL, NULL, NULL, NULL, NULL, 'sm@shippingtracks.com', '+1-666-464-6478', '+1-566-353-3335', '23-33442224', 'PR484722', 'WCB394942', 'Shaun Williams', 'sm@shippingtracks.com', '+1-544-453-5336', '405', 'Baljeet Singh', 'bj@shipsandme.com', '+1-444-563-3356', '509', 'YD Bank', '+1-666-464-6478', 'banking@sealink.com', 'US98383744', 'CN374640241', '4', 'New Cargo Providers', '2024-12-11', '2025-01-09', 3400000.00, 'Simth  & Co', '2024-12-09', '2025-01-11', 60000000.00, '[{\"name\":\"Erwin Brooks\",\"phone\":\"+1-555-664-7755\",\"email\":\"erwin@gmial.com\",\"ext\":null,\"fax\":\"+1-566-353-3335\",\"designation\":\"Telepromter\"}]', '2024-12-30 09:26:52', '2024-12-30 10:30:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carriers`
--
ALTER TABLE `carriers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_carrier_id_foreign` (`carrier_id`),
  ADD KEY `contacts_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lead_follow_up_lead_no_unique` (`lead_no`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carriers`
--
ALTER TABLE `carriers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=652;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_carrier_id_foreign` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contacts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
