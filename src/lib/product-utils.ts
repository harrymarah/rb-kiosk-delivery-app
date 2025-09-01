// List of shop new product IDs
const SHOP_NEW_PRODUCT_IDS = [
  'new1', 'new2', 'new3', 'new4', 'new5', 
  'new7', 'new8', 'new9', 'new10', 'new12'
];

/**
 * Checks if a product is from the "shop new" category
 */
export const isShopNewProduct = (productId: string): boolean => {
  return SHOP_NEW_PRODUCT_IDS.includes(productId);
};