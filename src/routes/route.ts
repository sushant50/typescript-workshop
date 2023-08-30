import express, { Request, Response, Router } from 'express';
import {
  isEmpty,
  groupBy,
  getPagination,
  getPagingData,
  findFirstObjInArray,
  extractIDs,
  dateNow,
  isToday,
} from '../util'; // Import your utility functions

const router: Router = express.Router();
import { Product } from '../interfaces/product'
import QueryString from 'qs';


const products: Product[] = [
  { id: 1, name: 'Product A', category: 'Category 1', createdAt: '2023-08-29' },
  { id: 2, name: 'Product B', category: 'Category 2', createdAt: '2023-08-28' },
  // ...
];

// function parseQueryParam(param: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): number {
//   return Array.isArray(param) ? parseInt(param[0] as string, 10) : parseInt(param as string, 10);
// }

// function parseQueryParamAsString(param: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): string {
//   return Array.isArray(param) ? param[0].toString() : param.toString();
// }
function parseQueryParam<T>(param: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[], parseFunction: (value: string) => T): T {
  if (Array.isArray(param)) {
    return parseFunction(param[0].toString());
  } else {
    return parseFunction(param.toString());
  }
}


router.get('/products', (req: Request, res: Response) => {
  
  const { page, size, agg_column } = req.query;

  const pageData = parseQueryParam(page, parseInt);
  const sizeData = parseQueryParam(size, parseInt);
  const aggData = parseQueryParam(agg_column, (value) => value);

  const { limit, offset } = getPagination(pageData, sizeData);
  const paginatedProducts = products.slice(offset, offset + limit);

  const response = getPagingData(
    { count: products.length, rows: paginatedProducts },
    pageData,
    limit,
    aggData
  );

  res.json(response);
});

router.get('/products2', (req: Request, res: Response) => {
  const { page, size, agg_column } = req.query;

  if (isEmpty(page) || isEmpty(size)) {
    return res.status(400).json({ message: 'Page and size parameters are required.' });
  }

  const pageData = parseQueryParam(page, parseInt);
  const sizeData = parseQueryParam(size, parseInt);
  const aggData = parseQueryParam(agg_column, (value) => value);

  const { limit, offset } = getPagination(pageData, sizeData);
  const paginatedProducts = products.slice(offset, offset + limit);
  console.log(aggData)
  const response = getPagingData(
    { count: products.length, rows: paginatedProducts },
    pageData,
    limit,
    aggData
  );

  res.json(response);
});

router.get('/products/:productId', (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  const product = findFirstObjInArray(products, 'id', productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.get('/product-categories', (req: Request, res: Response) => {
  const productsGroupedByCategory = groupBy(products, 'category');
  res.json(productsGroupedByCategory);
});

router.get('/product-ids', (req: Request, res: Response) => {
  const productIDs = extractIDs(products, 'id');
  res.json(productIDs);
});

router.get('/is-today/:date', (req: Request, res: Response) => {
  const dateParam = req.params.date;
  const result = isToday(dateParam);
  res.json({ isToday: result });
});

router.get('/current-date', (req: Request, res: Response) => {
  const currentDate = dateNow();
  res.json({ currentDate });
});

export default router;
