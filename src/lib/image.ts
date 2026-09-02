const SUPABASE_PUBLIC_BASE =
  'https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public';
const BUCKET = 'Food Delivery Assets';

/**
 * Build the public URL for a product image from the bucket-root-relative path
 * stored in products.json, e.g.
 *   "qcom/products/Usuals/9. Andrex Complete Clean Toilet Tissue ....jpeg"
 *
 * Paths carry their own root because the 2026 Q-Comm catalogue draws on two
 * libraries: the qcom/products shots, plus a handful from 2026_images for
 * lines the qcom folder has no photograph of.
 *
 * Every segment is encoded individually so spaces, "&" and apostrophes in the
 * folder and file names survive.
 */
export const getProductImageUrl = (imagePath?: string): string => {
  if (!imagePath) return `${import.meta.env.BASE_URL}placeholder.svg`;

  // Already a full URL or a local asset - leave it alone.
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;

  const segments = [BUCKET, ...imagePath.split('/')];
  return `${SUPABASE_PUBLIC_BASE}/${segments.map(encodeURIComponent).join('/')}`;
};

export const getProxiedImageUrl = (src: string): string => {
  if (!src) return `${import.meta.env.BASE_URL}placeholder.svg`;

  // Keep local/public assets as-is
  if (!src.startsWith('http')) {
    return src;
  }

  // For external URLs, try original first without proxy to avoid overprocessing
  return src;
};
