import type { FC } from "react";

interface Brand {
  id: number;
  name: string;
  imageSrc: string;
  altText: string;
}

const brands: Brand[] = [
  { id: 1, name: "eBay", imageSrc: "/images/brands logo/ebay.png", altText: "eBay" },
  { id: 2, name: "Nike", imageSrc: "/images/brands logo/nike.png", altText: "Nike" },
  { id: 3, name: "Reebok", imageSrc: "/images/brands logo/reebok.png", altText: "Reebok" },
  { id: 4, name: "ASOS", imageSrc: "/images/brands logo/asos.png", altText: "ASOS" },
  { id: 5, name: "Etsy", imageSrc: "/images/brands logo/etsy.png", altText: "Etsy" },
  { id: 6, name: "Louis Vuitton", imageSrc: "/images/brands logo/louis-vuitton.png", altText: "Louis Vuitton" },
];

interface BrandSupportProps {
  title?: string;
  className?: string;
}

const BrandSupport: FC<BrandSupportProps> = ({
  title = "We Supported By",
  className = "w-full p-5 mt-15 mb-15 flex flex-col items-center"
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-light mb-10 text-center">
        {title}
      </h2>

      {/* Marquee Container */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee">
          {/* First set of brands */}
          {brands.map((brand) => (
            <div key={brand.id} className="h-32 sm:h-40 bg-[#F3F3F3] flex items-center justify-center rounded-xl min-w-[180px] sm:min-w-[220px] mx-4 flex-shrink-0">
              <img 
                src={brand.imageSrc} 
                alt={brand.altText} 
                className="w-16 sm:w-24 h-16 sm:h-24 object-contain" 
              />
            </div>
          ))}
          {/* Duplicate set for seamless scrolling */}
          {brands.map((brand) => (
            <div key={`duplicate-${brand.id}`} className="h-32 sm:h-40 bg-[#F3F3F3] flex items-center justify-center rounded-xl min-w-[180px] sm:min-w-[220px] mx-4 flex-shrink-0">
              <img 
                src={brand.imageSrc} 
                alt={brand.altText} 
                className="w-16 sm:w-24 h-16 sm:h-24 object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSupport;
