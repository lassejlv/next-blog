CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`plot` text NOT NULL,
	`date` text NOT NULL,
	`image` text,
	`published` integer DEFAULT true,
	`isFeatured` integer DEFAULT false,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL
);
