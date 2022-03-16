-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GUEST', 'HOST');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('PLACE', 'PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "BathroomType" AS ENUM ('YES', 'NO', 'SHARED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'GUEST',
    "languages" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PlaceType" NOT NULL,
    "rooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "bathroom" "BathroomType" NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "address_street" TEXT NOT NULL,
    "address_house_number" TEXT NOT NULL,
    "address_zip" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_city_lat" TEXT,
    "address_city_lng" TEXT,
    "address_country" TEXT NOT NULL,
    "house_rules" TEXT NOT NULL,
    "availability_start" TIMESTAMP(3) NOT NULL,
    "availability_end" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "about" TEXT NOT NULL,
    "status" "RequestStatus",
    "user_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
