/*
  Warnings:

  - You are about to drop the column `paymentMethod_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `expiry` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `payment_number` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `security` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,order_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,user_id]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,name]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentMethod_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_product_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentMethod_id",
DROP COLUMN "product_id",
DROP COLUMN "quantity",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "expiry",
DROP COLUMN "payment_number",
DROP COLUMN "security",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentToken" TEXT[],
ADD COLUMN     "resetPassToken" TEXT,
ADD COLUMN     "resetPassTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "resetPassword" BOOLEAN;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "product_id",
ADD COLUMN     "sharedWith" JSONB;

-- CreateTable
CREATE TABLE "PaymentMethodDetails" (
    "id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_number" INTEGER NOT NULL,
    "expiryMonth" INTEGER,
    "expiryYear" INTEGER,
    "security" TEXT,

    CONSTRAINT "PaymentMethodDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "wishlist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_product_id_wishlist_id_key" ON "WishlistItem"("product_id", "wishlist_id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_user_id_product_id_key" ON "CartItem"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_id_key" ON "Order"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_user_id_order_id_key" ON "Order"("user_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_user_id_key" ON "PaymentMethod"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_user_id_name_key" ON "Wishlist"("user_id", "name");

-- AddForeignKey
ALTER TABLE "PaymentMethodDetails" ADD CONSTRAINT "PaymentMethodDetails_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
