-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2024 at 09:45 AM
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
  `cust_credit_application` tinyint(4) DEFAULT NULL,
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
(1, 'Robin Joseph', 'Distributor', '54345345345', 'www.fred.com', 'robinjo1776@gmail.com', '5435345345', '33', '535435', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', 'M1M 2G7', NULL, '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', NULL, 'George', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', '44442g', 33, 'robinjo1776@gmail.com', '4379713752', '55', NULL, 'broker2', NULL, NULL, 'Approved', 'Direct Deposit', '2024-09-10', '2024-10-10', '5', '4', 'bdbdgbb', NULL, 'USD', NULL, NULL, NULL, NULL, '2024-09-23 04:17:43', '2024-09-23 04:17:43');

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
(1, 765, '2024-08-01', '2024-08-21', 'Ron Desantis1', 568848874, 'ron@desasntis.com', 'www.rondesantis.com', 'Van', '400 Slater Street', 'Ottawa', 'ON', 'Canada', 'K1R 7S7', 400, 'AB', 'Ronnie', 'Prospect customer', 'Quotations', '[]', '2024-08-02 04:43:22', '2024-08-17 04:53:22', NULL),
(2, 765, '2024-07-30', '2024-08-28', 'Rakesh Sawant', 8887487454, 'rakesh@gmail.com', 'www.rakesh.com', 'Btrain', '50 Laurier Avenue East', 'Ottawa', 'ON', 'Canada', 'K1N 1H7', 50, 'DPD MAGMA', 'Jordan', 'Fob/Have broker', 'Has left without notice', '[]', '2024-08-03 22:56:28', '2024-08-03 22:56:28', NULL),
(3, 543, '2024-09-10', NULL, 'Fred', 645645433, 'fred@gmail.com', 'www.fred.com', 'Triaxle', '50 Rideau Street', 'Ottawa', 'ON', 'Canada', 'K1N 9J7', 50, 'BC', 'Rakesh', 'Quotations', 'In Transit', '[{\"name\":\"Tina\",\"contact_no\":\"9807742422\",\"email\":\"tina@gmail.com\"}]', '2024-09-09 22:33:26', '2024-09-09 22:33:26', NULL),
(4, 334, '2024-10-04', '2024-11-07', 'rgeg', 453534, 'bfgbgf@gmail.com', 'www.ffrg.com', 'Roll tite', '490', 'Ottawa', 'Ontario', 'Canada', 'K1N 1G8', 456, 'DPD MAGMA', 'bgb', 'Fob/Have broker', 'bfgbf', '[]', '2024-09-15 03:18:41', '2024-10-21 06:14:18', NULL),
(5, 33, '2024-09-09', NULL, 'gfdgdf', 234423423423, 'grgrgre@gsfgs.com', 'http://www.rondesantis.com', 'Maxi', '320', 'Ottawa', 'Ontario', 'Canada', 'K1R 7Y5', 33, 'Super Leads', 'gregr', 'E-mail sent to concerned person', 'gregre', '[]', '2024-09-15 04:38:50', '2024-09-15 04:38:50', NULL),
(6, 4242, '2024-09-16', NULL, 'gfdgdf', 234423423423, 'grgrgre@gsfgs.com', 'http://www.rondesantis.com', 'Triaxle', '490', 'Ottawa', 'Ontario', 'Canada', 'K1N 1G8', 33, 'CA', 'gregr', 'Carrier portal registration', 'grrg', '[{\"name\":\"gfdgd\",\"contact_no\":\"423423423423\",\"email\":\"dfbddg@gmail.com\"}]', '2024-09-15 04:57:47', '2024-09-15 04:57:47', NULL),
(16, 544, '2024-09-08', '2024-10-22', 'Walinker', 3653635635, 'gjkk@kol.com', 'www.jiklo.com', 'Reefer', '377', 'Ottawa', 'Ontario', 'Canada', 'K2P 2M2', NULL, 'ON', 'fre', 'Different Department', 'fgdgdf', '[]', '2024-09-15 05:09:03', '2024-10-21 06:15:06', NULL),
(17, 423, '2024-09-19', '2024-09-11', 'Cindy', 46536335635356, 'fred@gmail.com', 'www.fred.com', 'Flatbed', '720 S Michigan Ave, Chicago, IL 60605, USA', 'Chicago', 'Illinois', 'United States', '60605', 3, 'MB', 'Ridney', 'Lanes discussed', 'Humanitarian', '[]', '2024-09-15 05:13:37', '2024-10-18 23:25:53', NULL),
(18, 666, '2024-09-14', NULL, 'Xavier', 8575765333, 'xavier@gmail.com', 'www.xavier.com', 'Maxi', '3rd Street Promenade, Santa Monica, CA 90401, USA', 'Santa Monica', 'California', 'United States', '90401', 3, 'BDS', 'Ivy', 'Prospect customer', 'Tory', '[]', '2024-09-15 05:34:14', '2024-09-15 05:34:14', NULL),
(19, 442, '2024-09-14', NULL, 'Maria', 9055675744, 'maria@gmail.com', 'www.mariam.com', 'Reefer', '34 St - Herald Sq, New York, NY 10001, USA', 'New York', 'New York', 'United States', '10001', 34, 'CA', 'Jane', 'Product/Equipment discussed', 'Janith', '[]', '2024-09-15 05:40:02', '2024-09-15 05:40:02', NULL),
(20, 545, '2024-10-08', '2024-10-29', 'Robin Joseph Kuracheril', 4379713752, 'robinjo1776@gmail.com', 'www.fred.com', 'Btrain', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', 'M1M 2G7', 44, 'BC', 'Gregory Smith', 'No answer/Callback/Voicemail', 'jytjtyj', '[]', '2024-10-18 23:26:32', '2024-10-21 06:13:31', NULL),
(21, 777, '2024-10-15', '2024-10-30', 'Gregory Smith', 9876546544, 'gregsmith@gmail.com', 'http://www.rondesantis.com', 'Maxi', '330 Sparks Street', 'Mumbai', 'ON', 'Canada', 'M1M 2G7', 65, 'CA', 'Gregory Smith', 'Carrier portal registration', 'hty', '[]', '2024-10-19 00:56:50', '2024-10-21 06:13:23', NULL),
(22, 999, '2024-10-02', NULL, 'Ashley', 8877764644, 'hugh@gamil.com', 'www.ffrg.com', 'Roll tite', '425 Park Ave, New York, NY 10022, USA', 'New York', 'New York', 'United States', '10022', 33, 'MB', 'Tim', 'Fob/Have broker', 'nhng', '[]', '2024-10-19 01:08:04', '2024-10-19 01:08:04', NULL),
(23, 35642, '2024-10-19', '2024-10-30', 'Bell', 5345345345, 'bell@gmail.com', 'www.fred.com', 'Maxi', '400 Michigan Ave, Chicago, IL 60605, USA', 'Chicago', 'Illinois', 'United States', '60605', 400, 'TBAB', 'Gregory Smith', 'Fob/Have broker', 'fgfhfh', '[]', '2024-10-19 01:09:09', '2024-10-24 08:46:07', '6'),
(24, 556, '2024-10-19', '2024-10-31', 'Capri', 467743656, 'capri@gmail.com', 'www.rondesantis.com', 'Van', '50 Laurier Avenue East', 'Ottawa', 'ON', 'Canada', 'K1N 1H7', 44, 'DPD MAGMA', 'John', 'Product/Equipment discussed', 'jjtytyj', '[{\"name\":\"Sam\",\"phone\":\"9097755754\",\"email\":\"sam234@gmail.com\"},{\"name\":\"Ruben\",\"phone\":\"64654564644\",\"email\":\"rubel@gmail\"}]', '2024-10-19 01:11:55', '2024-10-24 06:17:53', '7'),
(25, 888, '2024-10-19', '2024-10-29', 'Ashish', 908855433, 'ashish23@gmail.com', 'www.ashish.com', 'Reefer', '770 Broadway, New York, NY 10003, USA', 'New York', 'New York', 'United States', '10003', 770, 'DPD MAGMA', 'Eddy', 'Prospect customer', 'effefe', '[]', '2024-10-19 01:27:54', '2024-10-26 01:08:30', 'Daniel'),
(26, 789, '2024-10-19', '2024-10-23', 'Rajesh', 664335656, 'rajesh@gmail.com', 'www.rajesh.com', 'Triaxle', '2nd Ave, New York, NY, USA', 'New York', 'New York', 'United States', NULL, 2, 'BDS', 'David', 'Different Department', 'ghjgjg', '[{\"name\":\"Abel\",\"phone\":null,\"email\":\"abel@gmial.com\",\"contact_no\":\"9043868768\"}]', '2024-10-19 01:46:04', '2024-10-19 01:46:04', NULL),
(27, 6783, '2024-10-21', '2024-11-01', 'Eglington', 7664674474, 'eglington@gmail.com', 'www.eglington.com', 'Maxi', '2nd Ave, New York, NY, USA', 'New York', 'New York', 'United States', NULL, 2, 'CA', 'Van', 'Different Department', 'gfger', '[]', '2024-10-21 03:00:50', '2024-10-24 08:49:46', '6');

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
(2, 'bgfb', '2024-09-24', NULL, NULL, '543', '2024-09-17', 'Robin Joseph', '4379713752', 'robinjo1776@gmail.com', '50 Hudson Yards, New York, NY 10001, USA', 'New York', 'New York', 'United States', '10001', '33', 'cdsvs', 'Robin Joseph', 'hgfhgfh', NULL, '2024-09-21 20:54:56', '2024-09-21 20:54:56', NULL),
(3, 'Given', '2024-10-01', NULL, NULL, '533', '2024-09-24', 'Ruben', '6635363563', 'rub@gmail.com', '34 St - Herald Sq, New York, NY 10001, USA', 'New York', 'New York', 'United States', '10001', '34', 'Urgent', 'Ben', 'great', NULL, '2024-09-21 23:32:13', '2024-09-21 23:32:13', NULL),
(5, 'completed', '2024-09-15', NULL, NULL, '443', '2024-09-17', 'Shivam', '534534533', 'shiva23@gmail.com', '3rd Street Promenade, Santa Monica, CA 90401, USA', 'Santa Monica', 'California', 'United States', '90401', '3', 'Urgent', 'Wendy', NULL, NULL, '2024-09-23 00:35:03', '2024-09-23 00:35:03', NULL),
(6, 'completed', '2024-10-03', NULL, NULL, '442', '2024-09-17', 'Faisan', '54524222432', 'faizan@gmail.com', '400 Michigan Ave, Chicago, IL 60605, USA', 'Chicago', 'Illinois', 'United States', '60605', NULL, 'Urgent', 'Faizan', 'Urgent', NULL, '2024-09-23 00:41:08', '2024-09-23 00:41:08', NULL),
(7, 'in_progress', '2024-09-28', NULL, NULL, '422', '2024-09-18', 'Denzel', '98787687484', 'denzel@gmail.com', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', 'M1M 2G7', NULL, 'Urgent', 'Faizan', 'Urgent', NULL, '2024-09-23 00:43:13', '2024-09-23 00:43:13', NULL),
(8, 'completed', '2024-10-03', NULL, NULL, '54353', '2024-09-16', 'ffsf', '34324324234', 'dfbdd@vvre.com', '50 Hudson Yards, New York, NY, USA', 'New York', 'New York', 'United States', '10001', '33', 'cdsvs', 'vxcvxcv', 'vxcvcx', NULL, '2024-09-23 01:28:06', '2024-09-23 01:28:06', NULL),
(9, 'completed', '2024-09-18', NULL, NULL, '34232', '2024-09-16', 'Bell', '5345345345', 'bell@gmail.com', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', 'gdfgfd', '4', 'Urgent', 'gfdgdg', 'gdfdfg', NULL, '2024-09-23 01:31:29', '2024-09-23 01:31:29', NULL),
(10, 'new', '2024-10-03', NULL, NULL, '88554', '2024-09-15', 'nhnhg', '67567567567', 'bell@gmail.com', '5 E 98th St, New York, NY 10029, USA', 'New York', 'New York', 'United States', '10029', '4', 'Urgent', 'gfdgdg', 'mgjmgjm', NULL, '2024-09-23 01:32:28', '2024-09-23 01:32:28', NULL),
(11, 'lost', '2024-09-10', 'bgbdbd', 'equipment3', '678474', '2024-09-16', 'fsdfds', '423423423432', 'bell@gmail.com', 'I-405, Los Angeles, CA, USA', 'Los Angeles', 'California', 'United States', 'M1M 2G7', '4', 'Urgent', 'gfdgdg', 'bdgbdg', '[{\"name\":\"gdfgdfg\",\"phone\":\"43543534534\"}]', '2024-09-23 01:37:12', '2024-09-23 01:37:12', '[{\"name\":\"gfdgdf\",\"quantity\":\"4\"}]'),
(12, 'In Progress', '2024-11-29', 'kiku', NULL, '888', '2024-10-19', 'Ashish', '908855433', 'ashish23@gmail.com', '770 Broadway, New York, NY 10003, USA', 'New York', 'New York', 'United States', '10003', '770', 'DPD MAGMA', 'hgjg', 'kiuku', '[]', '2024-11-07 23:11:20', '2024-11-07 23:11:20', '[]');

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
(35, '2024_10_24_112556_add_assigned_to_to_leads_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer` varchar(255) NOT NULL,
  `customer_ref_no` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `booked_by` varchar(255) DEFAULT NULL,
  `account_rep` varchar(255) DEFAULT NULL,
  `sales_rep` varchar(255) DEFAULT NULL,
  `customer_po_no` varchar(255) DEFAULT NULL,
  `shipment` varchar(255) DEFAULT NULL,
  `commodity` varchar(255) DEFAULT NULL,
  `equipment` varchar(255) NOT NULL,
  `load_type` varchar(255) NOT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `origin_street` varchar(255) DEFAULT NULL,
  `origin_city` varchar(255) DEFAULT NULL,
  `origin_state` varchar(255) DEFAULT NULL,
  `origin_country` varchar(255) DEFAULT NULL,
  `pickup_date` date DEFAULT NULL,
  `pickup_time` time DEFAULT NULL,
  `pickup_po` varchar(255) DEFAULT NULL,
  `origin_postal_code` varchar(255) DEFAULT NULL,
  `origin_phone` varchar(255) DEFAULT NULL,
  `shipper_notes` text DEFAULT NULL,
  `origin_packages` int(11) DEFAULT NULL,
  `origin_weight` decimal(10,2) DEFAULT NULL,
  `origin_dimensions` varchar(255) DEFAULT NULL,
  `destination_street` varchar(255) DEFAULT NULL,
  `destination_city` varchar(255) DEFAULT NULL,
  `destination_state` varchar(255) DEFAULT NULL,
  `destination_country` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `delivery_po` varchar(255) DEFAULT NULL,
  `destination_postal_code` varchar(255) DEFAULT NULL,
  `destination_phone` varchar(255) DEFAULT NULL,
  `delivery_notes` text DEFAULT NULL,
  `destination_packages` int(11) DEFAULT NULL,
  `destination_weight` decimal(10,2) DEFAULT NULL,
  `destination_dimensions` varchar(255) DEFAULT NULL,
  `special_instructions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`special_instructions`)),
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

INSERT INTO `orders` (`id`, `customer`, `customer_ref_no`, `branch`, `booked_by`, `account_rep`, `sales_rep`, `customer_po_no`, `shipment`, `commodity`, `equipment`, `load_type`, `temperature`, `origin_street`, `origin_city`, `origin_state`, `origin_country`, `pickup_date`, `pickup_time`, `pickup_po`, `origin_postal_code`, `origin_phone`, `shipper_notes`, `origin_packages`, `origin_weight`, `origin_dimensions`, `destination_street`, `destination_city`, `destination_state`, `destination_country`, `delivery_date`, `delivery_time`, `delivery_po`, `destination_postal_code`, `destination_phone`, `delivery_notes`, `destination_packages`, `destination_weight`, `destination_dimensions`, `special_instructions`, `currency`, `base_price`, `charges`, `discounts`, `gst`, `pst`, `hst`, `qst`, `final_price`, `notes`, `created_at`, `updated_at`) VALUES
(2, 'customer2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'equipment2', 'type2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-27 20:47:44', '2024-09-27 20:47:44'),
(3, 'customer2', '5435435345', 'fvfdv', 'vdfvfd', 'vfdvfd', 'vdfvfd', NULL, 'vfdvfdvfd', 'vvfdvfd', 'equipment2', 'type2', '442', '4', 'gfdg', 'gdfgdf', 'gfdgfd', '2024-09-25', '09:12:00', 'dfdg', 'dfgfd', '4534534543534', NULL, 4, 4.00, '4', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', '2024-09-17', '09:05:00', 'gdf', 'M1M 2G7', '4379713752', NULL, 4, 4.00, '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-27 22:28:36', '2024-09-27 22:28:36'),
(4, 'customer2', '5435435345', 'fvfdv', 'vdfvfd', 'vfdvfd', 'vdfvfd', NULL, 'vfdvfdvfd', 'vvfdvfd', 'equipment2', 'type2', '442', '4', 'gfdg', 'gdfgdf', 'gfdgfd', '2024-09-25', '09:12:00', 'dfdg', 'dfgfd', '4534534543534', 'vdsvds', 4, 4.00, '4', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', '2024-09-17', '09:05:00', 'gdf', 'M1M 2G7', '4379713752', 'vdsvs', 4, 4.00, '4', NULL, NULL, 4.00, NULL, '\"4\"', 4.00, 4.00, 4.00, NULL, 44.00, NULL, '2024-09-27 22:32:56', '2024-09-27 22:32:56'),
(5, 'customer2', '5435435345', 'fvfdv', 'vdfvfd', 'vfdvfd', 'vdfvfd', NULL, 'vfdvfdvfd', 'vvfdvfd', 'equipment2', 'type2', '442', '4', 'gfdg', 'gdfgdf', 'gfdgfd', '2024-09-25', '09:12:00', 'dfdg', 'dfgfd', '4534534543534', 'cdscds', 4, 4.00, '4', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', '2024-09-17', '09:05:00', 'gdf', 'M1M 2G7', '4379713752', 'vdsvs', 4, 4.00, '4', NULL, NULL, 4.00, NULL, '\"4\"', 4.00, 4.00, 4.00, NULL, 44.00, NULL, '2024-09-27 22:34:13', '2024-09-27 22:34:13'),
(6, 'customer2', '5435435345', 'fvfdv', 'vdfvfd', 'vfdvfd', 'vdfvfd', NULL, 'vfdvfdvfd', 'vvfdvfd', 'equipment2', 'type2', '442', '4', 'gfdg', 'gdfgdf', 'gfdgfd', '2024-09-25', '09:12:00', 'dfdg', 'dfgfd', '4534534543534', NULL, 4, 4.00, '4', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', '2024-09-17', '09:05:00', 'gdf', 'M1M 2G7', '4379713752', NULL, 4, 4.00, '4', NULL, 'USD', 607.00, NULL, '\"4\"', 4.00, 4.00, 4.00, NULL, 44.00, NULL, '2024-09-28 01:02:07', '2024-09-28 01:02:07'),
(7, 'customer1', '54345345345', 'fvfdv', 'vdfvfd', NULL, 'vdfvfd', NULL, 'vfdvfdvfd', 'vvfdvfd', 'equipment2', 'type2', '442', '30 Greendowns Dr, Toronto, M1M 2G7, Canada', 'Toronto, Ontario, Canada', 'ON', 'Canada', '2024-09-09', '04:04:00', 'dfdg', 'M1M 2G7', '4379713752', 'dvsdvfs', 4, 4.00, NULL, '330 Sparks Street', 'Mumbai', 'Ontario', 'Canada', '2024-10-11', '04:00:07', 'gdf', 'M2J 3Z7', '9876546544', 'sfsdssd', 4, 4.00, '4', NULL, 'USD', 4453.00, NULL, '\"4\"', 4.00, 4.00, 4.00, NULL, 4.00, 'fgdgdgf', '2024-09-28 01:44:30', '2024-09-29 00:31:46');

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
(505, 'App\\Models\\User', 7, 'API Token', '3e2d840ce54d83266121731d9e7da32121368dfa5a8f943916b01a3f97478269', '[\"*\"]', '2024-11-15 06:09:10', NULL, '2024-11-15 05:50:01', '2024-11-15 06:09:10'),
(506, 'App\\Models\\User', 1, 'API Token', '8466b72892063c9fc049d1720e6bf7e95ef5fddf2f3e1194521ef9e0c06f2cc3', '[\"*\"]', '2024-11-15 22:35:39', NULL, '2024-11-15 20:49:02', '2024-11-15 22:35:39'),
(507, 'App\\Models\\User', 7, 'API Token', '85c9014c9014d47b17c3f95b8bba8eb830cdef1f59a35f7d785416498a65717d', '[\"*\"]', '2024-11-15 23:02:26', NULL, '2024-11-15 23:02:02', '2024-11-15 23:02:26'),
(508, 'App\\Models\\User', 1, 'API Token', '0a488e3a5b9df94f20f1758248ab0af53aac1f7137cd7eea6eb2a33ae0c6ae13', '[\"*\"]', '2024-11-15 23:02:51', NULL, '2024-11-15 23:02:48', '2024-11-15 23:02:51'),
(509, 'App\\Models\\User', 1, 'API Token', '2a1afbfb35b674668ee646f5174684f7c730a82b5cd08ba58a52b2b9b3e4c43a', '[\"*\"]', '2024-11-16 22:29:22', NULL, '2024-11-15 23:08:58', '2024-11-16 22:29:22'),
(510, 'App\\Models\\User', 1, 'API Token', '6393e48951ebdfe476aa2bbdf0ab6450a61125a1aa779b23048d82cc7388397e', '[\"*\"]', '2024-11-16 22:52:17', NULL, '2024-11-16 22:33:41', '2024-11-16 22:52:17'),
(511, 'App\\Models\\User', 7, 'API Token', '80534f64490c385e09464e38a4809b5c70fd0d44d646bdd6b8a2e0505b46e8fb', '[\"*\"]', '2024-11-17 01:14:27', NULL, '2024-11-17 01:14:22', '2024-11-17 01:14:27'),
(512, 'App\\Models\\User', 1, 'API Token', '18c5ff1cbc4311fb14fc22474848eb02391f14de5c201d9c6e810c8cf1068285', '[\"*\"]', '2024-11-17 01:14:46', NULL, '2024-11-17 01:14:32', '2024-11-17 01:14:46');

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
  `role` enum('user','admin','employee') NOT NULL DEFAULT 'user',
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
(7, 'Daniel', 'danielja', 'danielja@gmail.com', NULL, '$2y$10$XHEo/tP7WZiu/tPCn9uTQ.FrpflkwgJ5bPeEhJB76FXrvMSeQ3Wva', NULL, 'employee', '403', '2024-10-23 01:05:53', '2024-10-23 01:05:53');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=513;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
