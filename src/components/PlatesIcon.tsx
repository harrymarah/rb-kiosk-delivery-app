import { SVGProps } from "react";

/**
 * Three place settings, drawn in the lucide-react house style (24x24 box,
 * currentColor stroke) so it sits alongside the Pizza / BrickWall icons used
 * on the other promo banners.
 *
 * Lucide only ships single-plate glyphs (HandPlatter, Utensils), and the
 * "Feed the Family" banner calls for multiple plates.
 */
const PlatesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Back plate */}
    <circle cx="12" cy="8" r="5" />
    <circle cx="12" cy="8" r="1.9" />
    {/* Front left plate */}
    <circle cx="6.5" cy="15.5" r="5" />
    <circle cx="6.5" cy="15.5" r="1.9" />
    {/* Front right plate */}
    <circle cx="17.5" cy="15.5" r="5" />
    <circle cx="17.5" cy="15.5" r="1.9" />
  </svg>
);

export default PlatesIcon;
