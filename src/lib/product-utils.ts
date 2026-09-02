/**
 * "New Arrival" is carried on the product itself in the 2026 catalogue (the
 * "Offer" column of the client's Catalogue information tab), so it no longer
 * needs a hardcoded id list — the previous SHOP_NEW_PRODUCT_IDS list referred
 * to the superseded catalogue and matched nothing once it was replaced.
 */
export const isNewArrival = (product?: { offer?: string } | null): boolean =>
  product?.offer === 'New Arrival';
