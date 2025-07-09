// src/pages/dashboard/DashboardHome.jsx
import { FaChartLine, FaBoxes, FaDollarSign, FaUsers } from 'react-icons/fa';

const DashboardHome = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <FaChartLine size={24} />
                            </div>
                            <div className="ml-4">
                                <h2 className="card-title">Total Revenue</h2>
                                <p className="text-2xl font-bold">$24,780</p>
                                <p className="text-sm text-green-600">+12% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <FaBoxes size={24} />
                            </div>
                            <div className="ml-4">
                                <h2 className="card-title">Total Products</h2>
                                <p className="text-2xl font-bold">1,245</p>
                                <p className="text-sm text-green-600">+5% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <FaDollarSign size={24} />
                            </div>
                            <div className="ml-4">
                                <h2 className="card-title">Total Orders</h2>
                                <p className="text-2xl font-bold">356</p>
                                <p className="text-sm text-green-600">+8% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                <FaUsers size={24} />
                            </div>
                            <div className="ml-4">
                                <h2 className="card-title">Total Customers</h2>
                                <p className="text-2xl font-bold">1,892</p>
                                <p className="text-sm text-green-600">+15% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders and Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Sample data - replace with actual data */}
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <tr key={item}>
                                            <td>#ORD-00{item}</td>
                                            <td>Customer {item}</td>
                                            <td>2023-06-{10 + item}</td>
                                            <td>${(item * 45.99).toFixed(2)}</td>
                                            <td>
                                                <span className={`badge ${item % 2 === 0 ? 'badge-success' : 'badge-warning'}`}>
                                                    {item % 2 === 0 ? 'Completed' : 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Sales Overview</h2>
                        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                            <p className="text-gray-500">Chart will be displayed here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;