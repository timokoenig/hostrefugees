-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "place_adult_men" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "place_adult_women" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "place_adults" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "place_children" INTEGER NOT NULL DEFAULT 0;
