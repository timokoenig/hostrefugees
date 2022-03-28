-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "address_street" DROP NOT NULL,
ALTER COLUMN "address_house_number" DROP NOT NULL,
ALTER COLUMN "address_zip" DROP NOT NULL,
ALTER COLUMN "address_city" DROP NOT NULL,
ALTER COLUMN "address_country" DROP NOT NULL;
