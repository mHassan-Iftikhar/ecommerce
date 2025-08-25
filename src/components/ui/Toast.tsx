import { useEffect, type FC } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

// Toast component
const Toast: FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-amber-500`} />;
      case 'info':
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <Info className={`${iconClass} text-gray-500`} />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`rounded-lg border p-4 shadow-lg ${getToastStyles()}`}>
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 ml-2 p-1 rounded-md hover:bg-opacity-20 hover:bg-gray-600 transition-colors ${
              type === 'success' ? 'text-green-600 hover:text-green-800' :
              type === 'error' ? 'text-red-600 hover:text-red-800' :
              type === 'warning' ? 'text-amber-600 hover:text-amber-800' :
              'text-blue-600 hover:text-blue-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast context and provider
let toastCallback: ((message: string, type: 'success' | 'error' | 'warning' | 'info') => void) | null = null;

export const setToastCallback = (callback: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void) => {
  toastCallback = callback;
};

// Global toast function
export const toast = {
  success: (message: string) => {
    if (toastCallback) toastCallback(message, 'success');
  },
  error: (message: string) => {
    if (toastCallback) toastCallback(message, 'error');
  },
  warning: (message: string) => {
    if (toastCallback) toastCallback(message, 'warning');
  },
  info: (message: string) => {
    if (toastCallback) toastCallback(message, 'info');
  }
};

export default Toast;
