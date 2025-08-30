import bannerImage from "@/assets/banner-sf-4pk.png";

interface BannerAdProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const BannerAd = ({ 
  title = "Your Advertisement Here", 
  subtitle = "Contact us to advertise your brand",
  className = ""
}: BannerAdProps) => {
  return (
    <div className={`w-full rounded-lg overflow-hidden ${className}`}>
      <img 
        src={bannerImage} 
        alt="Advertisement Banner" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default BannerAd;