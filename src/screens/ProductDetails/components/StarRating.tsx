import { type FC } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, reviews }) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const stars = Math.round(clampedRating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < stars
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
      </div>
      <span className="text-gray-600">({rating}/5)</span>
      {reviews && (
        <span className="text-gray-500">• {reviews} reviews</span>
      )}
    </div>
  );
};

export default StarRating;
