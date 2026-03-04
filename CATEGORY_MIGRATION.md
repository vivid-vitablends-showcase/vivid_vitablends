# Category System Migration Guide

## Overview
This migration converts the product category system from hardcoded enum values to a scalable database-driven approach using a separate Category table.

## Changes Made

### Backend Changes

1. **Prisma Schema** (`backend/prisma/schema.prisma`)
   - Added `products` relation to Category model
   - Changed Product.category from String to relation with Category
   - Added categoryId field with foreign key constraint

2. **Product Service** (`backend/src/services/product.service.js`)
   - Removed VALID_CATEGORIES enum
   - Updated validation to check categoryId instead of category string
   - Added category existence validation using categoryRepository

3. **Product Repository** (`backend/src/repositories/product.repository.js`)
   - Updated all queries to include category relation
   - Changed findByCategory to findByCategoryId
   - Updated filter from category to categoryId

4. **Category Repository** (`backend/src/repositories/category.repository.js`)
   - Added findById method

5. **Product Controller** (`backend/src/controllers/product.controller.js`)
   - Updated filter parameter from category to categoryId

### Frontend Changes

1. **Product Type** (`frontend/src/types/Product.ts`)
   - Changed category from enum to categoryId string
   - Added optional category relation object

2. **ProductForm** (`frontend/src/components/admin/ProductForm.tsx`)
   - Updated schema to use categoryId instead of category enum
   - Changed categories prop to accept array of objects with id and name
   - Updated Select to use category.id as value

3. **useAdminProducts Hook** (`frontend/src/hooks/useAdminProducts.ts`)
   - Changed categories state to array of objects
   - Updated stats calculation to use categoryId

4. **ProductsManagement** (`frontend/src/components/admin/ProductsManagement.tsx`)
   - Updated category filter to use categoryId
   - Updated category display to show name from relation

## Migration Steps

### 1. Update Database Schema

```bash
cd backend
npm run prisma:generate
```

### 2. Run Migration SQL

Execute the migration SQL to add the relation and migrate existing data:

```bash
# Option A: Using Prisma Migrate (Recommended)
npx prisma migrate dev --name add_category_relation

# Option B: Manual SQL execution
# Run the SQL in: backend/prisma/migrations/add_category_relation.sql
```

### 3. Seed Categories

```bash
node prisma/seed.js
```

This will create default categories:
- health
- pickle
- combo
- Everyday essentials powders (spices)

### 4. Restart Backend

```bash
npm run dev
```

### 5. Update Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

## API Changes

### Before (Old API)
```json
POST /api/products
{
  "name": "Chilly Powder",
  "category": "health",
  "price": 120
}
```

### After (New API)
```json
POST /api/products
{
  "name": "Chilly Powder",
  "categoryId": "clx123abc...",
  "price": 120
}
```

### Get Categories
```
GET /api/categories
Response: [
  { "id": "clx123abc...", "name": "health", "createdAt": "..." },
  { "id": "clx456def...", "name": "pickle", "createdAt": "..." }
]
```

### Create Category
```
POST /api/categories
{ "name": "Everyday essentials powders (spices)" }
```

## Benefits

✅ **No enum restriction** - Add categories dynamically without code changes
✅ **No typo duplicates** - Database enforces unique category names
✅ **Easy to add categories** - Simple API call to create new categories
✅ **Industry standard** - Follows e-commerce best practices (Amazon/Flipkart style)
✅ **Scalable** - Can add category metadata (description, image, etc.) later

## Rollback (If Needed)

If you need to rollback:

1. Restore the old schema.prisma
2. Run: `npx prisma migrate dev --name rollback_category_relation`
3. Restore old service/repository files from git

## Testing

1. Create a new category via admin panel
2. Create a product with the new category
3. Filter products by category
4. Verify category appears in product list
5. Edit product and change category
6. Delete a product (category should remain)

## Notes

- Existing products will be automatically migrated to use category IDs
- Category deletion is restricted if products reference it (ON DELETE RESTRICT)
- All product queries now include the category relation for display
