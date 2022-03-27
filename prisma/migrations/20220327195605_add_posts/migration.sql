-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address_street" TEXT NOT NULL,
    "address_house_number" TEXT NOT NULL,
    "address_zip" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_city_lat" TEXT,
    "address_city_lng" TEXT,
    "address_country" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
