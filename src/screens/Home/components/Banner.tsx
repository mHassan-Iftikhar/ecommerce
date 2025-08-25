import type { FC } from "react";

interface BannerProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
}

const Banner: FC<BannerProps> = ({
  imageSrc = "/images/Adobe Express - file.jpg",
  altText = "Banner",
  className = "w-full mt-5 px-2"
}) => {
  return (
    <div className={className}>
      <img 
        className="w-full h-[200px] sm:h-[300px] md:h-[800px] rounded-xl object-cover"
        src={imageSrc} 
        alt={altText} 
      />
    </div>
  );
};

export default Banner;
