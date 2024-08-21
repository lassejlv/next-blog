CREATE TABLE `admin_sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL
);
