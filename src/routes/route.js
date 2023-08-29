const express = require('express');
const router = express.Router();
const {
  isEmpty,
  groupBy,
  getPagination,
  getPagingData,
  findFirstObjInArray,
  extractIDs,
  dateNow,
  isToday
} = require('../util'); // Import your utility functions

// Mock data - replace this with your actual data source
const products = [
  { id: 1, name: 'Product A', category: 'Category 1', createdAt: '2023-08-29' },
  { id: 2, name: 'Product B', category: 'Category 2', createdAt: '2023-08-28' },
  // ...
];

// Route to get all products with pagination
router.get('/products', (req, res) => {
  const { page, size, agg_column } = req.query;
  
  const { limit, offset } = getPagination(page, size);
  const paginatedProducts = products.slice(offset, offset + limit);

  const response = getPagingData(
    { count: products.length, rows: paginatedProducts },
    page,
    limit,
    agg_column
  );

  res.json(response);
});

router.get('/products2', (req, res) => {
    const { page, size, agg_column } = req.query;
    
    if (isEmpty(page) || isEmpty(size)) {
      return res.status(400).json({ message: 'Page and size parameters are required.' });
    }
  
    const { limit, offset } = getPagination(page, size);
    const paginatedProducts = products.slice(offset, offset + limit);
  
    const response = getPagingData(
      { count: products.length, rows: paginatedProducts },
      page,
      limit,
      agg_column
    );
  
    res.json(response);
  });

// Route to get product by ID
router.get('/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = findFirstObjInArray(products, 'id', productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Route to get product categories grouped by category
router.get('/product-categories', (req, res) => {
  const productsGroupedByCategory = groupBy(products, 'category');
  res.json(productsGroupedByCategory);
});

// Route to get product IDs
router.get('/product-ids', (req, res) => {
  const productIDs = extractIDs(products, 'id');
  res.json(productIDs);
});

// Route to check if a date is today
router.get('/is-today/:date', (req, res) => {
  const dateParam = req.params.date;
  const result = isToday(dateParam);
  res.json({ isToday: result });
});

// Route to get current date
router.get('/current-date', (req, res) => {
    const currentDate = dateNow();
    res.json({ currentDate });
  });

// ... Other routes can be added based on your requirements

module.exports = router;
