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
    <div className={`w-full bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-dashed border-yellow-400 rounded-lg overflow-hidden ${className}`}>
      {/* Advertisement Label */}
      <div className="bg-yellow-200 text-yellow-800 text-xs font-bold text-center py-1 px-4 border-b border-dashed border-yellow-400">
        🎯 ADVERTISEMENT PLACEHOLDER 🎯
      </div>
      
      <div className="flex items-center justify-center min-h-[120px] md:min-h-[150px] px-6 py-8">
        <div className="text-center">
          <div className="text-4xl mb-4">📢</div>
          <h3 className="text-lg md:text-xl font-bold text-yellow-800 mb-2">
            {title}
          </h3>
          <p className="text-sm text-yellow-700 mb-4">
            {subtitle}
          </p>
          <div className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            REPLACE WITH ACTUAL AD CONTENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;