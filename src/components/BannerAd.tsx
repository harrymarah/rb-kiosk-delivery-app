import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/red-bull-products");
  };

  return (
    <div 
      className={`flex justify-center cursor-pointer hover:opacity-95 transition-opacity ${className}`}
      onClick={handleBannerClick}
    >
      <img 
        src={bannerImage} 
        alt="Red Bull Products - Click to view all" 
        className="h-auto max-h-48 object-contain rounded-lg"
      />
    </div>
  );
};

export default BannerAd;