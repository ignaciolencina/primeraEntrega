import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export const productsPath = path.join(__dirname, 'data', 'products.json');
export const cartsPath = path.join(__dirname, 'data', 'carts.json');
