CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" varchar NOT NULL,
	"bio" text NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
