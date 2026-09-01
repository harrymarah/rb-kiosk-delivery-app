import { ReactNode } from "react";
import { BrickWall, Pizza } from "lucide-react";
import PlatesIcon from "./PlatesIcon";
import PromoBanner from "./PromoBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/** Shared sizing so the three banner icons read as one set. */
const ICON_CLASS = "h-12 w-12";

const banners: {
  id: string;
  title: string;
  subtitle: string;
  className: string;
  icon?: ReactNode;
}[] = [
  {
    id: "delivery-fee",
    title: "£5 off and 10 days £0 Delivery Fee",
    subtitle: "On your first order this week",
    className: "bg-gradient-to-r from-blue-500 to-indigo-600",
    icon: <Pizza className={ICON_CLASS} strokeWidth={1.5} />,
  },
  {
    id: "bricks-membership",
    title: "Free Deliveries and Offers when you link your Bricks Membership",
    subtitle: "Link your card in seconds",
    className: "bg-gradient-to-r from-indigo-500 to-purple-600",
    icon: <BrickWall className={ICON_CLASS} strokeWidth={1.5} />,
  },
  {
    id: "feed-the-family",
    title: "Feed the Family from £5 per Person",
    subtitle: "Sharing meals from local kitchens",
    className: "bg-gradient-to-r from-orange-400 to-rose-500",
    icon: <PlatesIcon className={ICON_CLASS} strokeWidth={1.25} />,
  },
  {
    // No icon requested for this one.
    id: "book-a-table",
    title: "Book your Table now!",
    subtitle: "Reserve at restaurants near you",
    className: "bg-gradient-to-r from-emerald-500 to-green-600",
  },
];

interface BannerCarouselProps {
  className?: string;
}

const BannerCarousel = ({ className }: BannerCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className={className}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {banners.map((banner) => (
          <CarouselItem key={banner.id} className="pl-2 md:pl-4 basis-full">
            <PromoBanner
              title={banner.title}
              subtitle={banner.subtitle}
              icon={banner.icon}
              className={`${banner.className} max-w-none max-h-none h-48 flex items-center p-6`}
              contentClassName="px-7"
              titleClassName="text-xl leading-tight mb-2"
              subtitleClassName="text-sm"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 h-7 w-7 bg-white/85 border-none" />
      <CarouselNext className="right-3 h-7 w-7 bg-white/85 border-none" />
    </Carousel>
  );
};

export default BannerCarousel;
