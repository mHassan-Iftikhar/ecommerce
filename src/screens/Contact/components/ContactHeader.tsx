import { type FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactHeader: FC = () => {
  return (
    <div className="w-full px-5 mt-5">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Store
      </Link>
      
      {/* Page Title */}
      <div className="flex items-center gap-2 mb-8 mt-6">
        <div className="rounded-full w-6 sm:w-8 h-6 sm:h-8 border border-black flex justify-center items-center">
          <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-black"></div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light">Contact Us</h1>
      </div>
    </div>
  );
};

export default ContactHeader;
