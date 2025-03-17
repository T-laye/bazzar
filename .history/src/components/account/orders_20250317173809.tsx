// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useGetUserOrders } from '@/hooks/useOrder';
import { toast } from 'sonner';
import { IOrder } from '@/types';
import {v4 as uuidV4} from 'uuid'

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Completed');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: orders, isLoading, error } = useGetUserOrders();

  if (isLoading) return <p>Loading orders...</p>;

  if (error) {
    console.error("Error fetching orders:", error.message);
    toast.error(error.response?.data?.error || "Failed to fetch orders.");
    return <p>Error: {error.message}</p>;
  }

  // Filter orders based on active tab
  const completedOrders = orders?.filter((order) => order.status === 'completed') || [];
  const pendingOrders = orders?.filter((order) => order.status === 'pending') || [];
  const cancelledOrders = orders?.filter((order) => order.status === 'cancelled') || [];

  // Determine which orders to display based on active tab
  let activeOrders = [];
  switch (activeTab) {
    case 'Completed':
      activeOrders = completedOrders;
      break;
    case 'Pending':
      activeOrders = pendingOrders;
      break;
    case 'Cancelled':
      activeOrders = cancelledOrders;
      break;
    default:
      activeOrders = pendingOrders;
  }

  // Pagination logic
  const totalPages = Math.ceil(activeOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = activeOrders.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const tabs = ['Completed', 'Pending', 'Cancelled'];

  // Format date function (adjust as needed based on your date format)
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Head>
        <title>Orders</title>
        <meta name="description" content="Order management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Tabs with count badges */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`px-6 py-2 md:text-[15px] text-xs truncate cursor-pointer relative ${activeTab === tab ? 'text-red-700 font-medium' : 'text-gray-400'}`}

              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // Reset to first page when changing tabs
              }}
            >
              {tab} 
              <span className="ml-1 text-xs">
                ({tab === 'Completed' ? completedOrders.length : 
                  tab === 'Pending' ? pendingOrders.length : 
                  cancelledOrders.length})
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-700"></div>
              )}
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div key={order.orderId + uuidV4()} className="flex  items-center border rounded-md shadow-sm">
                {/* Image placeholder or product image */}
                <div className="bg-gray-200 w-16 h-16 flex-shrink-0">
                  {order.picture && (
                    <img 
                      src={order.picture} 
                      alt={order.orderId} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Order info */}
                <div className="flex-grow p-4">
                  <h3 className="font-medium md:text-sm text-xs">{ "Order #" + order.orderId}</h3>
                  <p className="md:text-sm text-xs text-gray-600">{"Customer"}</p>
                  <div className="flex md:flex-row flex-col md:items-center mt-1">
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${
                       order.status === 'pending'
                            ? 'bg-blue-500 text-white'
                            : order.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <span className="text-xs ml-2 text-gray-500">
                      {formatDate(order.date)}
                    </span>
                  </div>
                </div>
                
                {/* See Details button */}
                <Link 
                  href={`?tab=order&&orderId=${order.orderId}`}
                  className="bg-red-100 text-red-700 text-sm py-1 px-3 mr-4 rounded hover:bg-red-200 transition"
                >
                  See Details
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No {activeTab.toLowerCase()} orders found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Prev
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}