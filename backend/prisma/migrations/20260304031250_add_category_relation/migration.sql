/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add categoryId column (nullable first)
ALTER TABLE "Product" ADD COLUMN "categoryId" TEXT;

-- Step 2: Drop old index and column
DROP INDEX IF EXISTS "Product_category_idx";
ALTER TABLE "Product" DROP COLUMN "category";

-- Step 3: Create new index
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- Step 4: Add foreign key constraint
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;
