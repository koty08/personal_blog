/*
  Warnings:

  - Changed the type of `uuid` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL,
ALTER COLUMN "register_date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Post_uuid_key" ON "public"."Post"("uuid");
