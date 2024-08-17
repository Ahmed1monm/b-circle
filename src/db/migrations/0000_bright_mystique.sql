CREATE TABLE IF NOT EXISTS "articles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles_to_tags" (
	"blog_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "circles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"blog_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"content" varchar(1000) NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"created_at" date DEFAULT 'now()',
	"updated_at" date DEFAULT 'now()',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_circles" (
	"user_id" uuid NOT NULL,
	"circle_id" uuid NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags_to_circles" (
	"tag_id" uuid NOT NULL,
	"circle_id" uuid NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_index" ON "articles_to_tags" ("blog_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_index" ON "articles_to_tags" ("tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blogs_index" ON "comments" ("blog_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_index" ON "comments" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_name_idx" ON "tags" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_to_circle_user_idx" ON "users_to_circles" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_to_circle_circle_idx" ON "users_to_circles" ("circle_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_to_circles_tag_index" ON "tags_to_circles" ("tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_to_circles_circle_index" ON "tags_to_circles" ("circle_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles_to_tags" ADD CONSTRAINT "articles_to_tags_blog_id_articles_id_fk" FOREIGN KEY ("blog_id") REFERENCES "articles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles_to_tags" ADD CONSTRAINT "articles_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_id_articles_id_fk" FOREIGN KEY ("blog_id") REFERENCES "articles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_circles" ADD CONSTRAINT "users_to_circles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_circles" ADD CONSTRAINT "users_to_circles_circle_id_circles_id_fk" FOREIGN KEY ("circle_id") REFERENCES "circles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_circles" ADD CONSTRAINT "tags_to_circles_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_circles" ADD CONSTRAINT "tags_to_circles_circle_id_circles_id_fk" FOREIGN KEY ("circle_id") REFERENCES "circles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
