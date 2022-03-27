-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_reset_at" TIMESTAMP(3),
ADD COLUMN     "password_reset_hash" TEXT;
