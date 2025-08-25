import { type FC } from "react";

const CategoriesHeader: FC = () => {
  return (
    <div className="w-full mb-6 px-10 pt-20">
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-black flex justify-center items-center">
          <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-black"></div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light">Categories</h1>
      </div>
      <p className="text-gray-600">Browse products by category</p>
    </div>
  );
};

export default CategoriesHeader;
