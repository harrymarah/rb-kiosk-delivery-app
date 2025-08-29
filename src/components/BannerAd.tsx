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
    <div className={`w-full bg-gradient-to-r from-muted to-muted/50 border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-center min-h-[120px] md:min-h-[150px] px-6 py-8">
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-semibold text-muted-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground/80">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;