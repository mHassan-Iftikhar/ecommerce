import type { FC } from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  className = "flex items-center gap-2 mb-8"
}) => {
  return (
    <div className={className}>
      <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-black flex justify-center items-center">
        <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-black"></div>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-light">{title}</h1>
    </div>
  );
};

export default SectionHeader;
