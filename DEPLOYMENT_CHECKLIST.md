# 🚀 Deployment Checklist

## Pre-Deployment

- [ ] Review changes in `IMPLEMENTATION_SUMMARY.md`
- [ ] Backup your database
- [ ] Commit all changes to git

## Deployment Steps

### Step 1: Apply Database Migration
```bash
cd backend
npx prisma migrate dev
```

**Expected Output:**
```
✔ Applying migration `20260304031250_add_category_relation`
✔ Generated Prisma Client
```

### Step 2: Verify Migration
```bash
npx prisma studio
```
- [ ] Check Category table has 4 entries (health, pickle, combo, spices)
- [ ] Check Product table has `categoryId` column
- [ ] Check existing products have valid `categoryId` values

### Step 3: Restart Backend
```bash
npm run dev
```
- [ ] Backend starts without errors
- [ ] Check logs for any Prisma errors

### Step 4: Test Backend API

**Test 1: Get Categories**
```bash
curl http://localhost:5000/api/categories
```
- [ ] Returns array of categories with id and name

**Test 2: Get Products**
```bash
curl http://localhost:5000/api/products
```
- [ ] Returns products with category relation included
- [ ] Each product has `categoryId` and `category` object

### Step 5: Start Frontend
```bash
cd frontend
npm run dev
```
- [ ] Frontend compiles without TypeScript errors
- [ ] No console errors in browser

### Step 6: Test Admin UI

**Test 1: View Products**
- [ ] Navigate to Admin → Products
- [ ] Products display with category names
- [ ] Category filter dropdown shows all categories

**Test 2: Create Category**
- [ ] Click "Add Product"
- [ ] Click "+" next to Category dropdown
- [ ] Enter: "Test Category"
- [ ] Click Create
- [ ] Success toast appears
- [ ] New category appears in dropdown

**Test 3: Create Product**
- [ ] Fill in product details
- [ ] Select "Test Category" from dropdown
- [ ] Upload image
- [ ] Click Save
- [ ] Product appears in list with correct category

**Test 4: Edit Product**
- [ ] Click edit on a product
- [ ] Change category to different one
- [ ] Click Save
- [ ] Category updates correctly

**Test 5: Filter Products**
- [ ] Select category from filter dropdown
- [ ] Only products from that category show
- [ ] Select "All Categories"
- [ ] All products show again

### Step 7: Test Customer-Facing Pages

**Test 1: Home Page**
- [ ] Featured products display correctly
- [ ] Category names show properly

**Test 2: Products Page**
- [ ] All products display
- [ ] Category badges show correct names

**Test 3: Product Detail**
- [ ] Individual product page loads
- [ ] Category displays correctly

## Post-Deployment Verification

### Database Integrity
```bash
# Check for orphaned products (should return 0)
SELECT COUNT(*) FROM "Product" p 
LEFT JOIN "Category" c ON p."categoryId" = c.id 
WHERE c.id IS NULL;
```
- [ ] No orphaned products

### API Response Format
```json
// GET /api/products should return:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Chilly Powder",
      "categoryId": "clx123...",
      "category": {
        "id": "clx123...",
        "name": "Everyday essentials powders (spices)"
      },
      "price": 120
    }
  ]
}
```
- [ ] Response includes category relation

### Error Handling
**Test 1: Invalid Category ID**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","categoryId":"invalid","price":100}'
```
- [ ] Returns 404 "Category not found" error

**Test 2: Duplicate Category Name**
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"health"}'
```
- [ ] Returns 409 "Category already exists" error

## Rollback Plan (If Needed)

If something goes wrong:

```bash
# 1. Restore database backup
# 2. Revert git changes
git revert HEAD

# 3. Restore old schema
git checkout HEAD~1 backend/prisma/schema.prisma

# 4. Generate Prisma client
cd backend
npx prisma generate

# 5. Restart services
npm run dev
```

## Success Criteria

✅ All tests pass
✅ No console errors
✅ Products display correctly
✅ Can create categories dynamically
✅ Can create products with new categories
✅ Category filtering works
✅ No data loss from migration

## Performance Check

- [ ] Product list loads in < 2 seconds
- [ ] Category dropdown populates instantly
- [ ] No N+1 query issues (check backend logs)

## Documentation

- [ ] Update API documentation with new endpoints
- [ ] Update team on new category system
- [ ] Archive old enum-based code for reference

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Status**: ⬜ Pending | ⬜ In Progress | ⬜ Complete | ⬜ Rolled Back

## Notes

_Add any issues or observations here_
