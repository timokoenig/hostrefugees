-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "arrival_instructions" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "phone_number" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "phone_number" TEXT;
