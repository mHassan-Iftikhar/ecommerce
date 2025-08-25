import type { FC } from "react";

const Dashboard: FC = () => {
  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem('user') || '[]');
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-green-600' },
    { label: 'Total Products', value: products.length, color: 'text-blue-600' },
    { label: 'Total Orders', value: orders.length, color: 'text-purple-600' },
  ];

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-medium mb-6">Dashboard</h2>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 w-full max-w-xs h-32 flex flex-col justify-center items-center"
          >
            <span className="text-base font-light text-gray-700">{stat.label}</span>
            <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
