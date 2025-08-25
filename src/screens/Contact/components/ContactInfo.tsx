import { type FC } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo: FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="text-gray-800 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
              <p className="text-gray-600">
                123 Commerce Street<br />
                Business District, BD 12345<br />
                United States
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="text-gray-800 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567<br />
                +1 (555) 987-6543
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="text-gray-800 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
              <p className="text-gray-600">
                info@ecommercestore.com<br />
                support@ecommercestore.com
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="text-gray-800 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
