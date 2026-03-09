Title:
[Architecture] Hardcoded Category Name in `getCombos`

### Description
In `backend/src/services/product.service.js`, the `getCombos` function searches for the combo category by querying the database for the exact name `'combo'`. If the admin renames this category (e.g., to "Combos" or "Combo Pack"), the query will fail and return an empty array.

### Location
`backend/src/services/product.service.js` (Lines 60-64)

```javascript
export const getCombos = async () => {
  logger.info('Fetching combo products');
  const comboCategory = await categoryRepository.findByName('combo');
  if (!comboCategory) return [];
  return productRepository.findByCategoryId(comboCategory.id);
};
```

### Why This Matters
This logic relies on a magical hardcoded string name, coupling the database content directly to the application's business logic. It makes the system fragile to simple data changes and limits an admin's flexibility when defining or renaming categories in the dashboard.

### Suggested Fix
Use a special boolean flag (e.g., `isComboCategory`) or a specific system tag on the `Category` model to identify "combos", rather than matching by the category's name.

### Priority
Low

### Labels
refactor, architecture