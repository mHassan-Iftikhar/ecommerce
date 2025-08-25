import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-5">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
