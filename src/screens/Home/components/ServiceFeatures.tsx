import type { FC, JSX } from "react";
import { Truck, CreditCard, RotateCcw } from "lucide-react";

interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceFeatures: ServiceFeature[] = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Quick and reliable shipping",
    icon: <Truck className="text-gray-800 text-2xl" />
  },
  {
    id: 2,
    title: "Secure Payments",
    description: "Safe and easy checkout",
    icon: <CreditCard className="text-gray-800 text-2xl" />
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "Hassle-free 7-day returns",
    icon: <RotateCcw className="text-gray-800 text-2xl" />
  }
];

interface ServiceFeaturesProps {
  title?: string;
  className?: string;
}

const ServiceFeatures: FC<ServiceFeaturesProps> = ({
  title = "Our Services",
  className = "w-full p-5 mt-15 mb-15 flex flex-col items-center"
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-light mb-10 text-center">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {serviceFeatures.map((feature) => (
          <div key={feature.id} className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
