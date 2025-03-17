// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { useGetUserOrders } from '@/hooks/useOrder';
import { toast } from 'sonner';
import { IOrder } from '@/types';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Pending');

  const { data: orders, isLoading, error } = useGetUserOrders();

  if (isLoading) return <p>Loading orders...</p>;

  if (error) {
    console.error("Error fetching orders:", error.message);
    toast.error(error.response?.data?.error || "Failed to fetch orders.");
    return <p>Error: {error.message}</p>;
  }

  console.log(orders)
  const completedOrders = orders?.filter((order,i)=> order.status === 'completed')
  const tabs = ['Completed', 'Pending', 'Cancelled'];
  
  const tasks = [
    {
      id: 1,
      title: 'Power Engine Drill',
      crew: 'Crew B Phillips',
      status: 'CRITICAL',
      date: '26-09-2023'
    },
    {
      id: 2,
      title: 'Power Engine Drill',
      crew: 'Crew B Phillips',
      status: 'PENDING',
      date: '26-09-2023'
    },
    {
      id: 3,
      title: 'Power Engine Drill',
      crew: 'Crew B Phillips',
      status: 'CRITICAL',
      date: '26-09-2023'
    }
  ];

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Head>
        <title>Task Management</title>
        <meta name="description" content="Task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`px-6 py-2 cursor-pointer relative ${
                activeTab === tab ? 'text-red-700 font-medium' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-700"></div>
              )}
            </div>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center border rounded-md shadow-sm">
              {/* Image placeholder */}
              <div className="bg-gray-200 w-16 h-16 flex-shrink-0"></div>
              
              {/* Task info */}
              <div className="flex-grow p-4">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.crew}</p>
                <div className="flex items-center mt-1">
                  <span 
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      task.status === 'CRITICAL' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {task.status}
                  </span>
                  <span className="text-xs ml-2 text-gray-500">{task.date}</span>
                </div>
              </div>
              
              {/* See Details button */}
              <button className="bg-red-100 text-red-700 text-sm py-1 px-3 mr-4 rounded hover:bg-red-200 transition">
                See Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}