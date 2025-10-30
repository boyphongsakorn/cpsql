# Pagination Query Optimization

## Problem
The `/blog/find/page/:pagenumber` endpoint was experiencing severe performance degradation for page numbers beyond 180, taking over 2 minutes to load and resulting in 524 timeout errors.

## Root Cause
The original implementation used simple OFFSET-based pagination:
```javascript
Blog.findAll({offset: (pagenumber-1)*40, limit:40})
```

This approach has a critical performance issue: MySQL/MariaDB must scan and skip all rows before the offset, even if they're not returned. For page 180, this means scanning through 7,160 rows (179 pages × 40 rows) just to skip them.

## Solution: Deferred Join Optimization

For page numbers greater than 50, the code now uses a "deferred join" technique:

```sql
SELECT b.* FROM co_block b 
INNER JOIN (
  SELECT rowid FROM co_block 
  ORDER BY rowid ASC 
  LIMIT :limit OFFSET :offset
) AS t ON b.rowid = t.rowid 
ORDER BY b.rowid ASC
```

**Note**: In the Sequelize model, `rowid` is the actual database column name, mapped to the field `id` in the model. The raw SQL query uses the database column name `rowid`.

### How It Works
1. **Inner subquery**: Selects only the primary key (`rowid`) with OFFSET
   - This is fast because it's covered by the primary key index
   - Only index data is scanned, not full row data
   
2. **Outer query**: Joins back to get complete row data
   - Uses primary key join which is very fast
   - Only retrieves the exact rows needed

### Performance Benefits
- **Before**: Full table scan with OFFSET (slow for large offsets)
- **After**: Index-only scan with OFFSET + primary key lookup (much faster)
- Expected improvement: 10-100x faster for large page numbers

## Database Index Recommendations

### Required Index
The primary key index on `rowid` is essential for this optimization to work. Verify it exists:
```sql
SHOW INDEX FROM co_block WHERE Key_name = 'PRIMARY';
```

If it doesn't exist (which is unlikely), create it:
```sql
ALTER TABLE co_block ADD PRIMARY KEY (rowid);
```

### Optional Indexes for Other Routes
If the following routes also experience slow performance, consider adding these indexes:

1. **For `/find/user/:userid/:pagenumber`**:
   ```sql
   CREATE INDEX idx_user_rowid ON co_block(user, rowid);
   ```

2. **For `/find/xyz/:x1/:y1/:z1/:x2/:y2/:z2/:pagenumber`**:
   ```sql
   CREATE INDEX idx_xyz ON co_block(x, y, z, rowid);
   ```

3. **For `/find/block/xyz/:x1/:y1/:z1`**:
   ```sql
   CREATE INDEX idx_coordinates ON co_block(x, y, z);
   ```

### Checking Current Indexes
To see what indexes currently exist:
```sql
SHOW INDEX FROM co_block;
```

## API Usage

### Standard Pagination (Pages 1-50)
```
GET /blog/find/page/1
GET /blog/find/page/50
```
These use standard OFFSET-based pagination for simplicity.

### Optimized Pagination (Pages 51+)
```
GET /blog/find/page/180
GET /blog/find/page/500
```
These automatically use the deferred join optimization.

### Response Format
The response format remains unchanged - returns an array of blog objects:
```json
[
  {
    "id": 12345,
    "time": 1234567890,
    "user": 1,
    "worldid": 1,
    "x": 100,
    "y": 64,
    "z": 200,
    "type": 1,
    "data": 0,
    "action": 1,
    "rolledback": 0
  },
  ...
]
```

## Backward Compatibility
✅ **Fully backward compatible** - No changes required in client applications. The optimization is transparent and maintains the same API contract.

## Additional Optimization Opportunities

### For Very Large Datasets
If you have millions of records and even the deferred join becomes slow, consider:

1. **Cursor-based pagination**: Instead of page numbers, use the last `rowid` from the previous page
   ```
   GET /blog/find/page/next?lastRowId=12345
   ```
   
2. **Estimated pagination**: Calculate approximate starting `rowid` based on table statistics
   
3. **Caching**: Cache commonly accessed pages

### Monitoring Query Performance
To analyze query performance:
```sql
EXPLAIN SELECT b.* FROM co_block b 
INNER JOIN (
  SELECT rowid FROM co_block 
  ORDER BY rowid ASC 
  LIMIT 40 OFFSET 7160
) AS t ON b.rowid = t.rowid 
ORDER BY b.rowid ASC;
```

Look for:
- `Using index` in the subquery (good!)
- `PRIMARY` or `const` in the join (good!)
- Avoid `Using filesort` or `Using temporary`

## Related Files
- `/routes/blog.js` - Contains the optimized pagination implementation
- `/model/blog.js` - Blog model definition (maps to `co_block` table)
