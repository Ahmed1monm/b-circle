CREATE TABLE IF NOT EXISTS "blogs_to_circles" (
	"blog_id" uuid NOT NULL,
	"circle_id" uuid NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blogs_to_circle_blog_index" ON "blogs_to_circles" ("blog_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blogs_to_circle_circle_index" ON "blogs_to_circles" ("blog_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs_to_circles" ADD CONSTRAINT "blogs_to_circles_blog_id_articles_id_fk" FOREIGN KEY ("blog_id") REFERENCES "articles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs_to_circles" ADD CONSTRAINT "blogs_to_circles_circle_id_circles_id_fk" FOREIGN KEY ("circle_id") REFERENCES "circles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
