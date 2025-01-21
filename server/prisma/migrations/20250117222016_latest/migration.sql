/*
  Warnings:

  - A unique constraint covering the columns `[order_id,product_id]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_order_id_product_id_key" ON "OrderItem"("order_id", "product_id");
