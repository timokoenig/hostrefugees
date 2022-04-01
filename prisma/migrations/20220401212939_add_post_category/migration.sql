-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('SPORT', 'EDUCATION', 'KIDS', 'OUTDOOR', 'HELP', 'OTHER');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory"[];
