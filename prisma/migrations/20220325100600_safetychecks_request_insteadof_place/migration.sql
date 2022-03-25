/*
  Warnings:

  - You are about to drop the column `place_id` on the `SafetyCheck` table. All the data in the column will be lost.
  - Added the required column `request_id` to the `SafetyCheck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SafetyCheck" DROP CONSTRAINT "SafetyCheck_place_id_fkey";

-- AlterTable
ALTER TABLE "SafetyCheck" DROP COLUMN "place_id",
ADD COLUMN     "request_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SafetyCheck" ADD CONSTRAINT "SafetyCheck_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
