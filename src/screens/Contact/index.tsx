import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../components";
import { ContactHeader, ContactForm, ContactInfo } from "./components";

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: string;
}

const ContactScreen = () => {
//   const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }>({ message: '', type: 'success', show: false });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, show: true });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleFormSubmit = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const { firstName, lastName, email, subject, message } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Store contact message in localStorage (in a real app, this would be sent to a server)
    const contactMessage: ContactMessage = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      
      {/* Back Button */}
      <ContactHeader />
      
      {/* Contact Section */}
      <div className="w-full p-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <ContactForm onSubmit={handleFormSubmit} />

            {/* Contact Information */}
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        } ${notification.show ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">
              {notification.type === 'success' ? '✓' : '⚠'}
            </span>
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ContactScreen;
