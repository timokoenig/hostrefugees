-- CreateEnum
CREATE TYPE "HostType" AS ENUM ('PEOPLE', 'PETS');

-- CreateEnum
CREATE TYPE "Feature" AS ENUM ('PET_CAT', 'PET_DOG');

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "features" "Feature"[],
ADD COLUMN     "hostType" "HostType" NOT NULL DEFAULT E'PEOPLE',
ADD COLUMN     "pets_number" INTEGER,
ALTER COLUMN "rooms" SET DEFAULT 0,
ALTER COLUMN "beds" SET DEFAULT 0,
ALTER COLUMN "bathroom" SET DEFAULT E'SHARED',
ALTER COLUMN "adults" SET DEFAULT 0,
ALTER COLUMN "children" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "pets_number" INTEGER,
ALTER COLUMN "adults" SET DEFAULT 0,
ALTER COLUMN "children" SET DEFAULT 0;
