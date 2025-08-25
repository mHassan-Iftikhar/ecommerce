import { type FC } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo: FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-gray-600 leading-relaxed">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Address</h3>
            <p className="text-gray-600">
              123 Business Street<br />
              Suite 100<br />
              City, State 12345
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">
              +1 (555) 123-4567<br />
              +1 (555) 987-6543
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">
              info@company.com<br />
              support@company.com
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Follow Us</h3>
        <div className="flex space-x-4">
          <a
            href="#"
            className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            f
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            t
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
          >
            i
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-blue-800 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors"
          >
            in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
