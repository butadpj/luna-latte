-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('TO_CONFIRM', 'WAITING_FOR_PAYMENT', 'PREPARING', 'TO_DELIVER', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Sizes" AS ENUM ('ML_300', 'ML_400');

-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('DARK', 'LIGHT', 'BEIGE', 'SWEET', 'DARK_BROWN', 'LIGHT_BROWN', 'ORANGE', 'GREEN', 'CARAMEL');

-- CreateEnum
CREATE TYPE "ClaimMethods" AS ENUM ('DELIVERY');

-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('GCASH', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "mobile_number" TEXT,
    "image_url" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "street" TEXT,
    "barangay" TEXT,
    "city" TEXT,
    "province" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Colors",

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milk" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Colors" NOT NULL,
    "additional_price" DOUBLE PRECISION,

    CONSTRAINT "Milk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" "Sizes" NOT NULL DEFAULT 'ML_300',
    "additional_price" DOUBLE PRECISION,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "status" "Statuses" NOT NULL DEFAULT 'TO_CONFIRM',
    "total_price" DOUBLE PRECISION NOT NULL,
    "total_items" INTEGER NOT NULL,
    "customer_name" TEXT,
    "delivery_address" TEXT NOT NULL,
    "landmark" TEXT,
    "claim_method" "ClaimMethods" NOT NULL DEFAULT 'DELIVERY',
    "payment_method" "PaymentMethods" NOT NULL DEFAULT 'GCASH',
    "user_id" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size_name" TEXT NOT NULL,
    "size_additional_price" DOUBLE PRECISION,
    "milk_name" TEXT,
    "milk_additional_price" DOUBLE PRECISION,
    "custom_request" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE INDEX "Order_user_id_idx" ON "Order"("user_id");

-- CreateIndex
CREATE INDEX "OrderItem_order_id_idx" ON "OrderItem"("order_id");

