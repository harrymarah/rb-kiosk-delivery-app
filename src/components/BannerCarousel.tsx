import PromoBanner from "./PromoBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
  {
    id: "delivery-fee",
    title: "£5 off and 10 days £0 Delivery Fee",
    subtitle: "On your first order this week",
    className: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },
  {
    id: "bricks-membership",
    title: "Free Deliveries and Offers when you link your Bricks Membership",
    subtitle: "Link your card in seconds",
    className: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
  {
    id: "feed-the-family",
    title: "Feed the Family from £5 per Person",
    subtitle: "Sharing meals from local kitchens",
    className: "bg-gradient-to-r from-orange-400 to-rose-500",
  },
  {
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
              className={`${banner.className} max-w-none max-h-none h-36 flex items-center p-5`}
              contentClassName="px-8"
              titleClassName="text-lg leading-snug mb-1"
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
